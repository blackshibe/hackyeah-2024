// import { Database } from "./namespace/Database";
import OpenAI from "openai";
// import { SECRETS } from "./namespace/Secrets";
import express, { Router, Express } from "express";
import session from "express-session";
import dotenv from "dotenv";
import userRouter from "./routes/user";

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

app.use("/user", userRouter);

async function lmao() {
	const openai = new OpenAI({ apiKey: "SECRETS.OPENAI_KEY" });
	const completion = await openai.chat.completions.create({
		model: "gpt-4o",
		messages: [{ role: "user", content: "write a haiku about ai" }],
	});

	console.log(completion.choices[0].message.content);
}

app.listen(process.env.PORT, ()=>{
	console.log("Server listening on port: " + process.env.PORT);
	
});
// Database.save_db();
