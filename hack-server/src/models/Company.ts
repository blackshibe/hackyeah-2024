import { DataTypes, Model, Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite"
});

class Company extends Model {};

Company.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
    },
    country: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: "Company"
});