"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logging = void 0;
const logger_1 = require("../utils/logger");
function logging(req, _res, next) {
    logger_1.logger.info({ method: req.method, url: req.url }, "incoming request");
    next();
}
exports.logging = logging;
