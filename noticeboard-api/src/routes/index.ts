import express from "express";
import userRouter from "./userRoute";
const routesSetup = (app: express.Application) => {
  app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Welcome to the noticeboard");
  });
  app.use("/user", userRouter);
};

export default routesSetup;
