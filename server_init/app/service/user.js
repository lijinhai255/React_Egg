'use strict';

const Service = require('egg').Service;

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
}

module.exports = UserService;
