"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiTokenAuth = void 0;
const env_1 = require("../config/env");
function apiTokenAuth(req, res, next) {
    const token = req.header("x-api-token");
    if (!token || token !== env_1.config.apiToken) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
}
exports.apiTokenAuth = apiTokenAuth;
