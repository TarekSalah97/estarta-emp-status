import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { logger } from "../utils/logger";
import { logToDb } from "../utils/logger";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ZodError) {
    const payload = { error: "Invalid input", details: err.issues };
    logger.warn(payload);
    return res.status(400).json(payload);
  }
  logger.error({ err }, "unhandled error");
  logToDb("error", err?.message ?? "error", { stack: err?.stack }).catch(
    () => {}
  );
  return res.status(500).json({ error: "Internal Server Error" });
}
