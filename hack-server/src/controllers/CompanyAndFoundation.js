import Company from "../models/Company.js";
import Foundation from "../models/Foundation.js";

const CompanyAndFoundationController = {
  async get(req, res) {
    res.send([await Foundation.findAll(), await Company.findAll()]);
  },
};
export default CompanyAndFoundationController;
