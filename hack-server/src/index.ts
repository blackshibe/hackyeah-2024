import express, { Router, Express } from "express";
import session from "express-session";
import dotenv from "dotenv";
import companyRouter from "./routes/company";
import foundationRouter from "./routes/foundation";
import indexRouter from "./routes";

dotenv.config();
const app = express();


// app.use(session({
// 	secret: uuid(),
// 	cookie: {},
// 	resave: false,
// 	saveUninitialized: true,
// }));
app.use(express.json());
app.use("/", indexRouter);
app.use("/company", companyRouter);
app.use("/foundation", foundationRouter);
app.listen(process.env.PORT, async ()=>{
	console.log("Server listening on port: " + process.env.PORT);
	console.log("All database models has been synced");
});
