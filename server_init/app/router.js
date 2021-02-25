'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/newApplication', controller.home.newApplication);
  router.post('/newContext', controller.home.newContext);
  router.get('/newRequest', controller.home.newRequest);
  router.get('/newResponse', controller.home.newResponse);
  router.get('/user', controller.user.index);
  router.get('/user/lists', controller.user.lists);
  router.get('/user/detail', controller.user.detail);
  router.get('/user/detail2/:id', controller.user.detail2);
  router.post('/user/add', controller.user.add);
  router.put('/user/edit', controller.user.edit);
  router.del('/user/del', controller.user.del);
  router.post('/login', controller.user.login);
  router.post('/logout', controller.user.logout);
  router.get('/curl/get', controller.curl.curlGet);
  router.post('/curl/post', controller.curl.curlPost);
  // 新增
  const userExist = app.middleware.userExist();

  router.post("/api/user/register", controller.user.register);// 注册接口
  router.post("/api/user/login", controller.user.login); // 登录接口
  router.post("/api/user/detail",userExist, controller.user.detail);//用户详情接口
  router.post("/api/user/logout", controller.user.logout);//用户详情接口
  router.post("/api/user/edit", controller.user.userEdit);//编辑用户详情接口
  router.post("/api/commons/citys", controller.commons.city);//获取城市接口
  router.post("/api/house/hot", controller.house.hot);//获取城市接口
  router.post("/api/house/search", controller.house.search);//获取城市接口
  router.post("/api/house/detail", controller.house.detail);//获取城市接口
};
