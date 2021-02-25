module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
    const House = app.model.define("house", {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: STRING(50),
        info: STRING(50),
        addres: STRING(50),
        price: INTEGER,
        publishTime: DATE,
        cityCode: STRING,
        showCount: INTEGER,
        startTime: DATE,
        endTime: DATE
    })
    // 一个房子 对应多个图片
    House.associate = ()=>{
        app.model.House.hasMany(app.model.Imgs,{
            foreignKey:"houseId"
        })
    }
    return House;
}