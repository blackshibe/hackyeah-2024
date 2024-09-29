import ai from "../models/ChatGPT.js";
import FundingRequest from "../models/FundingRequest.js";
import Company from "../models/Company.js";
const FundingRequestController = {
  async get(req, res) {
    const { id } = req.params;
    console.log("Request on get funding request was made");
    if (id) {
      const fundingRequests = await FundingRequest.findAll({
        where: { FoundationId: id },
      });
      console.log("request found successfully");
      res.send(fundingRequests);
    } else {
      const fundingRequests = await FundingRequest.findAll();
      console.log("request found successfully");
      res.send(fundingRequests);
    }
  },
  async add(req, res) {
    console.log("Request on add funding request was made");
    const { title, target, description, FoundationId } = req.body;
    await FundingRequest.create({ title, target, description, FoundationId });
    console.log("Funding request added successfully");
    res.send();
  },
  async getMatched(req, res) {
    const { id } = req.query;
    console.log("Request on get matched funding requests was made");
    const fundingRequests = await FundingRequest.findAll();
    const company = (await Company.findByPk(id)).dataValues;
    const result = await ai.matchToData(fundingRequests, company);
    console.log("request made successfully");
    res.send(JSON.parse(result));
  },
};
export default FundingRequestController;
