"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: Number((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000),
    dbUrl: process.env.DATABASE_URL,
    apiToken: process.env.API_TOKEN,
    isProd: process.env.NODE_ENV === "production",
};
