import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({ apiKey: process.env.API_KEY });
const ai = {
	async description(name, target) {
		const descriptionCompletion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [
				{
					role: "user",
					content: `Write a description for company ${name} based on this info: ${target}`,
				},
			],
		});
		const description = descriptionCompletion.choices[0].message.content;
		return description;
	},
};
export default ai;
