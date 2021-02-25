const BaseService = require('./base');
class HouseService extends BaseService {
    commonArr(app) {
        return {
            order: [
                ['showCount', 'DESC']
            ],
            attributes: {
                exclude: ['startTime', 'endTime', 'publishTime'],
            },
            include: [
                {
                    model: app.model.Imgs,
                    limit: 1,
                    attributes: ['url']
                }
            ]
        }
    }
    async hot() {
        const { app } = this;
        return this.run(async (ctx, app) => {
            const resulut = await ctx.model.House.findAll({
                ...this.commonArr(app),
                limit: 4,

            })
            return resulut;
        })
    }
    async search(params) {
        const { app } = this;
        return this.run(async (ctx, app) => {
            const { lte, gte, like } = app.Sequelize.Op;
            const where = {
              cityCode: Array.isArray(params.code) ? params.code[0] : params.code,
              startTime: {
                [lte]: params.startTime
              },
              endTime: {
                [gte]: params.endTime
              },
              name: {
                [like]: '%' + params.houseName + '%'
              }
            };
            if(!params.houseName){
                delete where.name;
              }
            const resulut = await ctx.model.House.findAll({
                ...this.commonArr(app),
                limit: 8,
                offset: (params.pageNum - 1) * params.pageSize,
                // where,
            })
            console.log(resulut,"resulut-resulut-resulut")
            return resulut;
        })


    }
    async detail(id){
        return this.run(async (ctx, app) => {
          const result = await ctx.model.House.findOne({
            where: { 
              id
            },
            include: [
              {
                model: app.model.Imgs,
                attributes: ['url']
              }
            ]
          });
    
          await ctx.model.House.update({
            showCount: result.showCount + 1
          }, {
            where: {
              id
            }
          });
          return result;
        });
      }
}

module.exports = HouseService;