import FundingRequest from "../models/FundingRequest";

const FundingRequestController = {
  async get(req, res) {
    console.log("Request on get funding request was made");
    const fundingRequests = await FundingRequest.findAll();
    console.log("request found successfully");
    res.send(fundingRequests);
  },
  async add(req, res) {
    console.log("Request on add funding request was made");
  },
};
