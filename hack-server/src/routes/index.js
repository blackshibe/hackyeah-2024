import { Router } from "express";
import CompanyAndFoundationController from "../controllers/CompanyAndFoundation.js";

const indexRouter = Router();

indexRouter.get("/", CompanyAndFoundationController.get);
export default indexRouter;
