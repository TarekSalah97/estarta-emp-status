import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import YAML from "yaml";

const spec = YAML.parse(
  fs.readFileSync(path.join(__dirname, "../openapi/specs.yaml"), "utf8")
);

export const docsRouter = Router();
docsRouter.use("/", swaggerUi.serve, swaggerUi.setup(spec));
