import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({ apiKey: process.env.API_KEY });
const ai = {
  async description(name, target) {
    const descriptionCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
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
  async tags(name, target) {
    const tagsCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: `Write tags for company ${name} based on this info: ${target}. Please respond in json`,
        },
      ],
    });
    const { tags } = JSON.parse(
      tagsCompletion.choices[0].message.content.substring(
        8,
        tagsCompletion.choices[0].message.content.length - 4
      )
    );
    return tags;
  },
};
export default ai;
