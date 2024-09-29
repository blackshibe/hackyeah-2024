import { DataTypes, Sequelize } from "sequelize";
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const FundingRequest = sequelize.define(
  "fundingRequest",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    target: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {}
);
export default FundingRequest;
