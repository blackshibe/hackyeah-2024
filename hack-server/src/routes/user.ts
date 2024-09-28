import { Router } from "express";

const userRouter = Router();

userRouter.get("/register", (req, res)=>{
    console.log("request on register endpoint");
    res.send();
})
export default userRouter;