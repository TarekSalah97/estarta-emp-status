import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export function logging(req: Request, _res: Response, next: NextFunction) {
  logger.info({ method: req.method, url: req.url }, "incoming request");
  next();
}