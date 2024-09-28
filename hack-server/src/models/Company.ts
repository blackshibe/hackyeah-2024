import { DataTypes, Sequelize } from "sequelize";


const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite"
})

const Company = sequelize.define("Company", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING
        },
        target: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        tags: {
            type: DataTypes.JSON,
        },
        whoWeWant: {
            type: DataTypes.STRING,
            allowNull: true
        }

    }, {});
sequelize.sync();
export default Company;