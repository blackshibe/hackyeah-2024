import { Router } from "express";
import FundingRequestController from "../controllers/fundingRequest.js";
const fundingRequestRouter = Router();
fundingRequestRouter.get("/match", FundingRequestController.getMatched);
fundingRequestRouter.get("/:id", FundingRequestController.get);
fundingRequestRouter.get("/", FundingRequestController.get);
fundingRequestRouter.post("/", FundingRequestController.add);
export default fundingRequestRouter;
