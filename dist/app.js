"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const logging_1 = require("./middleware/logging");
const error_1 = require("./middleware/error");
const auth_1 = require("./middleware/auth");
const getEmpStatus_1 = require("./routes/getEmpStatus");
const docs_1 = require("./routes/docs");
function createApp() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(logging_1.logging);
    app.use("/docs", docs_1.docsRouter);
    app.use("/api/GetEmpStatus", auth_1.apiTokenAuth, getEmpStatus_1.getEmpStatusRouter);
    app.use(error_1.errorHandler);
    return app;
}
exports.createApp = createApp;
