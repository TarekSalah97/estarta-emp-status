import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: Number(process.env.PORT ?? 3000),
  dbUrl: process.env.DATABASE_URL!,
  apiToken: process.env.API_TOKEN!,
  isProd: process.env.NODE_ENV === "production",
};
