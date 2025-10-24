import { Request, Response, NextFunction } from "express";
import { config } from "../config/env";

export function apiTokenAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.header("x-api-token");
  if (!token || token !== config.apiToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
