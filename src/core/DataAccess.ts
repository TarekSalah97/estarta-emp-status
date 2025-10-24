import { Pool } from "pg";
import { config } from "../config/env";
import { withRetry } from "../db/retry";

class DataAccess {
  private pool = new Pool({ connectionString: config.dbUrl });

  exec<T = any>(sql: string, params?: any[]): Promise<{ rows: T[] }> {
    return withRetry(async () => {
      const client = await this.pool.connect();
      try {
        return await client.query<T>(sql, params);
      } finally {
        client.release();
      }
    });
  }

  async getUserByNational(national: string) {
    const { rows } = await this.exec(
      `SELECT id, username, nationalnumber, email, phone, isactive
       FROM users WHERE nationalnumber = $1 LIMIT 1`,
      [national]
    );
    return rows[0];
  }

  async getSalariesByUserId(userId: number) {
    const { rows } = await this.exec(
      `SELECT id, year, month, salary FROM salaries WHERE userid = $1 ORDER BY year, month`,
      [userId]
    );
    return rows;
  }
}

export const dataAccess = new DataAccess();
