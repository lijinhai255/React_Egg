'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5');
class UserController extends Controller {
  encode(str = '') {
    return new Buffer(str).toString("base64");
  }
  decode(str = '') {
    return new Buffer(str, "base64").toString();
  }
  async index() {
    const { ctx } = this;

    // 获取session
    const session = ctx.session.user;
    const zhSession = ctx.session.zh;
    console.log(session)
    console.log(zhSession)

    ctx.cookies.set("zh", "测试", {
      encrypt: true
    });
    const zh = ctx.cookies.get("zh", {
      encrypt: true
    });
    // console.log(zh)

    ctx.cookies.set("base64", this.encode("中文base64"));
    const base64 = this.decode(ctx.cookies.get("base64"));

    // ctx.body = 'user index';
    const user = ctx.cookies.get("user");
    await ctx.render('user.html', {
      id: 100,
      name: 'admin',
      lists: [
        'java',
        "php",
        "ts"
      ],
      user: user ? JSON.parse(user) : null,
      zh,
      base64
    }, {
      delimiter: '%'
    });
  }

  async login() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.cookies.set("user", JSON.stringify(body), {
      maxAge: 1000 * 60 * 10,
      httpOnly: false,
    });

    // 保存session
    ctx.session.user = body;
    ctx.session.zh = "中文测试";
    ctx.session.test = "test";

    ctx.body = {
      status: 200,
      data: body
    };
  }

  async logout() {
    const { ctx } = this;
    ctx.cookies.set("user", null);

    //清除session
    ctx.session.user = null;

    ctx.body = {
      status: 200
    };
  }

  async lists() {
    const { ctx, app } = this;
    // await new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 1500);
    // });
    console.log(ctx.service, "ctx.service")
    // const res = await ctx.service.user.lists();
    // console.log(res,"res-res")
    const res = await ctx.model.User.findAll({
      // where:{
      //   id:1
      // },
      // limit: 1,
      // offset: 1
    });
    // {
    //   // where: {
    //   //   id: 2

    //   // limit: 1,
    //   // offset: 1
    // }
    // console.log(res,"res-res")

    ctx.body = res;
  }

  async detail() {
    const { ctx } = this;
    // console.log(ctx.query);
    // const res = await ctx.service.user.detail(10);
    // console.log(res);
    const res = await ctx.model.User.findByPk(ctx.query.id);
    ctx.body = res;
  }

  async detail2() {
    const { ctx } = this;
    console.log(ctx.params);
    const res = await ctx.service.user.detail2(ctx.params.id);
    ctx.body = res;
  }

  async add() {
    const { ctx } = this;

    // const rule = {
    //   name: { type: 'string' },
    //   age: { type: 'number' },
    // };
    // ctx.validate(rule);

    // const res = await ctx.service.user.add(ctx.request.body);
    const res = await ctx.model.User.create(ctx.request.body);
    ctx.body = {
      status: 200,
      data: res,
    };
  }

  async edit() {
    const { ctx } = this;
    console.log(ctx.request.body, "ctx.request.body-ctx.request.body")
    // const res = await ctx.service.user.edit(ctx.request.body);
    const user = await ctx.model.User.findByPk(ctx.request.body.id);
    if (!user) {
      ctx.body = {
        status: 404,
        errMsg: 'id不存在'
      };
      return;
    }
    const res = user.update(ctx.request.body);
    ctx.body = {
      status: 200,
      data: res,
    };
  }
  async del() {
    const { ctx } = this;
    // const res = await ctx.service.user.delete(ctx.request.body.id);
    const user = await ctx.model.User.findByPk(ctx.request.body.id);
    if (!user) {
      ctx.body = {
        status: 404,
        errMsg: 'id不存在'
      };
      return;
    }
    const res = user.destroy(ctx.request.body.id);
    ctx.body = {
      status: 200,
      data: res,
    };
  }
  // 新增 方法
  async jwtSign() {
    const { ctx, app } = this;
    const username = ctx.request.body.username;
    const token = app.jwt.sign({
      username
    }, app.config.jwt.secret)
    return token
  }
  async register() {
    const { ctx, app } = this;
    const params = ctx.request.body;
    // console.log(params,"params-params-params")
    const user = await ctx.service.user.getUser(params.username);
    if (user) {
      ctx.body = {
        status: 500,
        errMsg: '用户已经存在'
      }
      return;
    }
    // console.log(ctx.helper,"ctx.helper-ctx.helperctx.helper")
    const result = await ctx.service.user.addUser({
      ...params,
      password: md5(params.password + app.config.salt),
      createTime: ctx.helper.time()
    });
    // console.log(result,"result-result")
    if (result) {
      const token = await this.jwtSign()
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(result.dataValues, ['password']),
          createTime: ctx.helper.timestamp(result.createTime),
          token
        }
      }
    } else {
      ctx.body = {
        status: 500,
        errMsg: "用户注册失败"
      }
    }
  }
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    const user = await ctx.service.user.getUser(username, password)
    if (user) {
      console.log(app.jwt, "app.jwt")
      const token = await this.jwtSign()
      ctx.session[username] = 1;
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(user.dataValues, ['password']),
          createTime: ctx.helper.timestamp(user.creareTime),
          token
        }
      }
    } else {
      ctx.body = {
        status: 500,
        errMsg: "密码错误"
      }
    }
  }
  async detail() {
    const { ctx } = this;
    console.log(ctx.username, "ctx-ctx")

    const user = await ctx.service.user.getUser(ctx.username)
    console.log(user, "user-user-user-user")
    if (user) {
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(user.dataValues, ['password']),
          createTime: ctx.helper.timestamp(user.createTime)
        }
      }
    } else {
      ctx.body = {
        status: 500,
        errMsg: "该用户不存在"

      }
    }


  }
  async logout(){
    const { ctx,app } = this;
    try{
      ctx.session[ctx.username] = null;
      ctx.body = {
        status:200,
        data:"ok"
      }
      // await app.redis.del(ctx.username);
      // this.success('ok');
      
    }catch(error){
      // this.error('退出登录失败');
      ctx.body = {
        status:500,
        errMsg:"退出登录失败"
      }
    }

  }
    
}


module.exports = UserController;
