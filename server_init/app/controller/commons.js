const Controller = require('egg').Controller;
const BaseController = require('./base');

class CommonsController extends BaseController {
  async city() {
    const { ctx, app } = this;
    try {
      const result = await app.httpclient.request('https://apis.imooc.com/?icode=06AECF0A42B1CA6A', {
        dataType: 'json'
      });
    //   console.log(result.data.citys)
      if (result.status === 200) {
        this.success(result.data.citys);
      } else {
        this.error('获取城市数据失败');
      }
    } catch (error) {
      this.error('获取城市数据失败');
    }
  }
}

module.exports = CommonsController;