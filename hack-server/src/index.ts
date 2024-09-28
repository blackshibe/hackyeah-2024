// import { Database } from "./namespace/Database";
// import OpenAI from "openai";
// import { SECRETS } from "./namespace/Secrets";
import express, { Router, Express } from "express";
import session from "express-session";
import dotenv from "dotenv";
import companyRouter from "./routes/company";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite"
});
dotenv.config();
const app = express();
const api_router = Router();

api_router.use("/login", (req, res) => {
	res.send("OK");
});

app.use(
	session({
		secret: "keyboard cat 2",
	})
);

app.use(express.json());
app.use("/company", companyRouter);
app.listen(process.env.PORT, async ()=>{
	console.log("Server listening on port: " + process.env.PORT);
	await sequelize.sync();
	console.log("All database models has been synced");
});
