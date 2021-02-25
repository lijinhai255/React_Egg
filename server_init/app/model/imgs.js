module.exports = app=>{
    const {STRING,INTEGER,DATE} = app.Sequelize;
    const Imgs =  app.model.define('imgs',{
        id:{
            type: INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        url:STRING,
        houseId:INTEGER,
        createTime:DATE
    })
    return Imgs
}