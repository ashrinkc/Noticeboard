import express from "express";
import cors from "cors";
import routesSetup from "./routes";

const configureApplication = () => {
  const app: express.Application = express();
  app.use(cors());
  app.use(express.json());

  app.listen(8080, () => {
    console.log("The application is running");
  });

  routesSetup(app);
  return app;
};

configureApplication();
