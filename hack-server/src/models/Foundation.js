import { DataTypes, Sequelize } from "sequelize";
import Rating from "./Rating.js";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const Foundation = sequelize.define(
  "Foundation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    projects: {
      type: DataTypes.STRING,
    },
    target: {
      type: DataTypes.STRING,
    },
    tags: {
      type: DataTypes.JSON,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {}
);
Foundation.hasMany(Rating);
Rating.belongsTo(Foundation);
sequelize.sync();
export default Foundation;
