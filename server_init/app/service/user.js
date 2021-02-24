'use strict';

const Service = require('egg').Service;
const md5 = require('md5');
class UserService extends Service {
  async lists() {
    try {
      const { app } = this;
      console.log(app, "app-app")
      const res = await app.mysql.select('user');// 查询整张表
      console.log(res, "res")
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async detail(id) {
    return {
      id,
      name: 'john',
      age: 18,
    };
  }

  async detail2(id) {
    try {
      const { app } = this;
      const res = await app.mysql.get('user', { id });
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async add(params) {
    try {
      const { app } = this;
      const res = await app.mysql.insert('user', params);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async edit(params) {
    try {
      const { app } = this;
      console.log(params, "params-params-params")
      const res = await app.mysql.update('user', params);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(id) {
    try {
      const { app } = this;
      const res = await app.mysql.delete('user', { id });
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 新增 方法 ------
  // 查找用户
  async getUser(username,password) {
    try{
      const { ctx, app } = this;
      const _where = password ? { username, password: md5(password + app.config.salt) } : { username };
      const result = await ctx.model.User.findOne({
        where: _where
      });
      return result
    }catch(error) {
      console.log(error);
      return null;
    }

  }
  // 新增方法
  async addUser(params) {
    // console.log(params,"jll")
    try{
      const {ctx} = this;
      const result = await ctx.model.User.create(params)
      // console.log(result,"result-result");
      return result
    }catch(error){
      console.log(error);
      return null;

    }

  }
}

module.exports = UserService;
