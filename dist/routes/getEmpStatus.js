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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmpStatusRouter = void 0;
const express_1 = require("express");
const Validator_1 = require("../core/Validator");
const DataAccess_1 = require("../core/DataAccess");
const cache_1 = require("../utils/cache");
const ProcessStatus_1 = require("../core/ProcessStatus");
exports.getEmpStatusRouter = (0, express_1.Router)();
exports.getEmpStatusRouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { NationalNumber } = Validator_1.Validator.validateInput(req.body);
        const userCacheKey = `user:${NationalNumber}`;
        let user = cache_1.cache.get(userCacheKey);
        if (!user) {
            user = yield DataAccess_1.dataAccess.getUserByNational(NationalNumber);
            if (user)
                cache_1.cache.set(userCacheKey, user, 60);
        }
        if (!user) {
            return res.status(404).json({ error: "Invalid National Number" });
        }
        if (!user.isactive) {
            return res.status(406).json({ error: "User is not Active" });
        }
        const salariesKey = `salaries:${user.id}`;
        let salaries = cache_1.cache.get(salariesKey);
        if (!salaries) {
            salaries = yield DataAccess_1.dataAccess.getSalariesByUserId(user.id);
            cache_1.cache.set(salariesKey, salaries, 60);
        }
        if (!salaries || salaries.length < 3) {
            return res.status(422).json({ error: "INSUFFICIENT_DATA" });
        }
        const output = ProcessStatus_1.ProcessStatus.compute({
            id: user.id,
            username: user.username,
            nationalNumber: user.nationalnumber,
            email: user.email,
            phone: user.phone,
            isActive: user.isactive,
        }, salaries.map((s) => ({
            id: s.id,
            year: s.year,
            month: s.month,
            salary: Number(s.salary),
        })));
        return res.status(200).json(output);
    }
    catch (e) {
        next(e);
    }
}));
