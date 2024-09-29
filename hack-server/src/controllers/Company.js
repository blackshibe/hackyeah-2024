import ai from "../models/ChatGPT.js";
import Company from "../models/Company.js";
import dotenv from "dotenv";
dotenv.config();
const CompanyController = {
  async register(req, res) {
    console.log("Request on register company made");
    let { name, email, country, city, target, tags, description, whoWeWant } =
      req.body;
    try {
      if (await Company.findOne({ where: { name: name } })) {
        res.status(400).send();
      }
      if (!description) description = await ai.description(name, target);
      const newAcc = await Company.create({
        name: name,
        email: email,
        country: country,
        city: city,
        target: target,
        description: description,
        whoWeWant: whoWeWant,
        averageRating: 0,
      });

      console.log("User created successfully");
      res.send({ id: newAcc.id });
    } catch (err) {
      console.log(err);
    }
  },
  async get(req, res) {
    const { id } = req.params;
    if (id) {
      const companies = await Company.findByPk(id);
      res.send(companies);
    } else {
      const companies = await Company.findAll();
      res.send(companies);
    }
    console.log("Request on find companies made");
  },
};
export default CompanyController;
