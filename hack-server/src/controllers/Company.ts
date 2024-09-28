import Company from "../models/Company";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({ apiKey: process.env.API_KEY });

const CompanyController = {
    async register(req, res){
        console.log("Request on register company made");
        const {name, email, country, city, target} = req.body;
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "user", content: `Write a description for company ${name} based on this info: ${target}` },
            ],
	    });

        const description = completion.choices[0].message.content;
        await Company.create({
            name: "Microsoft", 
            email: "example@example.com",
            country: "Poland",
            target: "Making money",
            description: description,
        });
        console.log("User created successfully");
        res.send();
    },
    async get(req, res){
        const companies = await Company.findAll();
        console.log("Request on find companies made");
        res.send(companies);
    }
}
export default CompanyController