import pino from "pino";
import { dataAccess } from "../core/DataAccess";

export const logger = pino({
  transport: { target: "pino-pretty", options: { colorize: true } },
  level: process.env.LOG_LEVEL ?? "info",
});

export async function logToDb(level: string, message: string, context?: any) {
  try {
    await dataAccess.exec(
      `INSERT INTO logs (level, message, context) VALUES ($1,$2,$3)`,
      [level, message, context ? JSON.stringify(context) : null]
    );
  } catch {}
}
