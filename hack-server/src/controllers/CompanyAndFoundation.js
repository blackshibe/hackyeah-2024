import ai from "../models/ChatGPT.js";
import Company from "../models/Company.js";
import Foundation from "../models/Foundation.js";

const CompanyAndFoundationController = {
  async get(req, res) {
    res.send([await Foundation.findAll(), await Company.findAll()]);
  },
  async getDesc(req, res) {
    const { name, target } = req.body;
    res.send(await ai.description(name, target));
  },
};
export default CompanyAndFoundationController;
