import { Router } from "express";
import CompanyAndFoundationController from "../controllers/CompanyAndFoundation";

const indexRouter = Router();

indexRouter.get("/", CompanyAndFoundationController.get);
export default indexRouter;