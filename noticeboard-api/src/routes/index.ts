import express from "express";
import userRouter from "./userRoute";
import classRouter from "./classRoute";
import noticeRouter from "./noticeRoute";
const routesSetup = (app: express.Application) => {
  app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Welcome to the noticeboard");
  });
  app.use("/user", userRouter);
  app.use("/class", classRouter);
  app.use("/notice", noticeRouter);
};

export default routesSetup;
