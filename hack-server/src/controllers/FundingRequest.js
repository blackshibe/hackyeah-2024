import ai from "../models/ChatGPT.js";
import FundingRequest from "../models/FundingRequest.js";
import Company from "../models/Company.js";
const FundingRequestController = {
	async get(req, res) {
		console.log("Request on get funding request was made");
		const fundingRequests = await FundingRequest.findAll();
		console.log("request found successfully");
		res.send(fundingRequests);
	},
	async add(req, res) {
		console.log("Request on add funding request was made");
		const { title, target, description, FoundationId } = req.body;
		await FundingRequest.create({ title, target, description, FoundationId });
		console.log("Funding request added successfully");
		res.send();
	},
};
export default FundingRequestController;
