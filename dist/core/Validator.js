"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const zod_1 = require("zod");
const inputSchema = zod_1.z.object({
    NationalNumber: zod_1.z.string().trim().min(1).max(50),
});
class Validator {
    static validateInput(payload) {
        return inputSchema.parse(payload);
    }
}
exports.Validator = Validator;
