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
exports.dataAccess = void 0;
const pg_1 = require("pg");
const env_1 = require("../config/env");
const retry_1 = require("../db/retry");
class DataAccess {
    constructor() {
        this.pool = new pg_1.Pool({ connectionString: env_1.config.dbUrl });
    }
    exec(sql, params) {
        return (0, retry_1.withRetry)(() => __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                return yield client.query(sql, params);
            }
            finally {
                client.release();
            }
        }));
    }
    getUserByNational(national) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield this.exec(`SELECT id, username, nationalnumber, email, phone, isactive
       FROM users WHERE nationalnumber = $1 LIMIT 1`, [national]);
            return rows[0];
        });
    }
    getSalariesByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield this.exec(`SELECT id, year, month, salary FROM salaries WHERE userid = $1 ORDER BY year, month`, [userId]);
            return rows;
        });
    }
}
exports.dataAccess = new DataAccess();
