import { Router } from "express";
import FundingRequestController from "../controllers/FundingRequest.js";
const fundingRequestRouter = Router();
fundingRequestRouter.get("/", FundingRequestController.get);
fundingRequestRouter.get("/:id", FundingRequestController.get);

fundingRequestRouter.post("/", FundingRequestController.add);
fundingRequestRouter.get("/match", FundingRequestController.getMatched);
export default fundingRequestRouter;
