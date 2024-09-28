import { Router } from "express";
import FoundationController from "../controllers/Foundation";
const foundationRouter = Router();
foundationRouter.post("/register", FoundationController.register);
foundationRouter.get("/", FoundationController.get);
export default foundationRouter;