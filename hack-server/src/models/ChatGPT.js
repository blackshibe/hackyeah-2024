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
  async matchToData(data, company) {
    const dataToMatchCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Here you have projects in json: ${JSON.stringify(
            data
          )} Find from this, projects that matches best this company: ${JSON.stringify(
            company
          )}. Send response in JSON`,
        },
      ],
    });
    const matchedObjects = {
      matchingProjects: JSON.parse(
        dataToMatchCompletion.choices[0].message.content
      ),
    };
    return matchedObjects;
  },
};
export default ai;
