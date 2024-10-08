import ai from "../models/ChatGPT.js";
import Foundation from "../models/Foundation.js";

const FoundationController = {
  async register(req, res) {
    console.log("Request on foundation register was made");
    let { id, name, email, city, country, projects, target, description } =
      req.body;
    if (await Foundation.findOne({ where: { name: name } })) {
      res.status(400).send();
    }
    if (!description) description = await ai.description(name, target);
    const newAcc = await Foundation.create({
      id,
      name,
      email,
      city,
      country,
      projects,
      target,
      description,
    });
    console.log("Foundation created successfully");
    res.send({ id: newAcc.id });
  },
  async get(req, res) {
    const { id } = req.params;
    console.log("Request on get foundation was made");
    if (id) {
      const foundation = await Foundation.findByPk(id);
      res.send(foundation);
    } else {
      const foundations = await Foundation.findAll();
      res.send(foundations);
    }
  },
};
export default FoundationController;
