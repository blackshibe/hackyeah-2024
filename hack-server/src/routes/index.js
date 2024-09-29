import { Router } from "express";
import CompanyAndFoundationController from "../controllers/CompanyAndFoundation.js";

const indexRouter = Router();

indexRouter.get("/", CompanyAndFoundationController.get);
indexRouter.post("/description", CompanyAndFoundationController.getDesc);
export default indexRouter;
