import { Router } from "express";
import CompanyController from "../controllers/Company.js";
const companyRouter = Router();

companyRouter.post("/register", CompanyController.register);
companyRouter.get("/:id", CompanyController.get);
companyRouter.get("/", CompanyController.get);
export default companyRouter;
