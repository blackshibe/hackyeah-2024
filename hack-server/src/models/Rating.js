import { DataTypes, ENUM, Sequelize } from "sequelize";
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const Rating = sequelize.define("Rating", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  rate: {
    type: DataTypes.SMALLINT,
  },
  message: {
    type: DataTypes.STRING,
  },
  author: {
    type: ENUM("company", "foundation"),
  },
});
sequelize.sync();
export default Rating;
