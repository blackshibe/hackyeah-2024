import { Router } from "express";
import RatingController from "../controllers/Rating.js";
const ratingRouter = Router();
ratingRouter.post("/add", RatingController.add);
ratingRouter.get("/company/:CompanyId", RatingController.get);
ratingRouter.get("/foundation/:FoundationId", RatingController.get);
export default ratingRouter;
