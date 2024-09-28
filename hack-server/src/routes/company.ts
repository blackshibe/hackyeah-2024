import { Router } from "express";
import CompanyController from "../controllers/Company";
const companyRouter = Router();

companyRouter.post("/register", CompanyController.register);
companyRouter.get("/", CompanyController.get);
export default companyRouter;