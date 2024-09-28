import { DataTypes, Sequelize } from "sequelize";
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
});
sequelize.sync();
export default Rating;
