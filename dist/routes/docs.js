"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.docsRouter = void 0;
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const yaml_1 = __importDefault(require("yaml"));
const spec = yaml_1.default.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "../openapi/specs.yaml"), "utf8"));
exports.docsRouter = (0, express_1.Router)();
exports.docsRouter.use("/", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(spec));
