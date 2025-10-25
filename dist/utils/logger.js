"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.logToDb = exports.logger = void 0;
const pino_1 = __importDefault(require("pino"));
const DataAccess_1 = require("../core/DataAccess");
exports.logger = (0, pino_1.default)({
    transport: { target: "pino-pretty", options: { colorize: true } },
    level: (_a = process.env.LOG_LEVEL) !== null && _a !== void 0 ? _a : "info",
});
function logToDb(level, message, context) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield DataAccess_1.dataAccess.exec(`INSERT INTO logs (level, message, context) VALUES ($1,$2,$3)`, [level, message, context ? JSON.stringify(context) : null]);
        }
        catch (_a) { }
    });
}
exports.logToDb = logToDb;
