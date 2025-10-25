"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRetry = void 0;
const p_retry_1 = __importDefault(require("p-retry"));
function withRetry(fn) {
    return (0, p_retry_1.default)(fn, {
        retries: 3,
        minTimeout: 150,
        maxTimeout: 800,
        factor: 2,
    });
}
exports.withRetry = withRetry;
