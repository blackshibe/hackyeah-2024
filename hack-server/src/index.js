import express from "express";
import dotenv from "dotenv";
import companyRouter from "./routes/company.js";
import foundationRouter from "./routes/foundation.js";
import indexRouter from "./routes/index.js";
import ratingRouter from "./routes/rating.js";
import fundingRequestRouter from "./routes/fundingRequest.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/", indexRouter);
app.use("/company", companyRouter);
app.use("/foundation", foundationRouter);
app.use("/rating", ratingRouter);
app.use("/fundingRequest", fundingRequestRouter);
app.listen(process.env.PORT, () => {
  console.log("SERVER LISTENING! PORT: " + process.env.PORT);
});
