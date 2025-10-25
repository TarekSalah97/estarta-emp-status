"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const logger_1 = require("../utils/logger");
const logger_2 = require("../utils/logger");
function errorHandler(err, _req, res, _next) {
    var _a;
    if (err instanceof zod_1.ZodError) {
        const payload = { error: "Invalid input", details: err.issues };
        logger_1.logger.warn(payload);
        return res.status(400).json(payload);
    }
    logger_1.logger.error({ err }, "unhandled error");
    (0, logger_2.logToDb)("error", (_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : "error", { stack: err === null || err === void 0 ? void 0 : err.stack }).catch(() => { });
    return res.status(500).json({ error: "Internal Server Error" });
}
exports.errorHandler = errorHandler;
