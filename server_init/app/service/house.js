const BaseService = require('./base');
class HouseService extends BaseService {
 async hot(){
     const {app} = this;
     return this.run(async (ctx,app) => {
        const resulut =   await ctx.model.House.findAll({
             limit:4,
             order: [
                ['showCount', 'DESC']
              ],
             attributes:{
                exclude: ['startTime', 'endTime', 'publishTime'],
             },
             include:[
                 {
                     model:app.model.Imgs,
                     limit:1,
                     attributes:['url']
                 }
            ]
         })
         return resulut;
     })

 }
}

module.exports = HouseService;