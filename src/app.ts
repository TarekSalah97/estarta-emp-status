import express from "express";
import { logging } from "./middleware/logging";
import { errorHandler } from "./middleware/error";
import { apiTokenAuth } from "./middleware/auth";
import { getEmpStatusRouter } from "./routes/getEmpStatus";
import { docsRouter } from "./routes/docs";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(logging);

  app.use("/docs", docsRouter);
  app.use("/api/GetEmpStatus", apiTokenAuth, getEmpStatusRouter);
  app.use(errorHandler);
  return app;
}
