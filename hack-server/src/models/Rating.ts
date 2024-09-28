import { DataTypes, Sequelize } from "sequelize";
import Company from "./Company";


const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite"
})

const Rating = sequelize.define("Rating", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    grade:{
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING
    }
})
sequelize.sync();
export default Rating;