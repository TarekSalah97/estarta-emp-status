import { Router, Request, Response, NextFunction } from "express";
import { Validator } from "../core/Validator";
import { dataAccess } from "../core/DataAccess";
import { cache } from "../utils/cache";
import { ProcessStatus } from "../core/ProcessStatus";

export const getEmpStatusRouter = Router();

getEmpStatusRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { NationalNumber } = Validator.validateInput(req.body);
      const userCacheKey = `user:${NationalNumber}`;

      let user = cache.get<any>(userCacheKey);
      if (!user) {
        user = await dataAccess.getUserByNational(NationalNumber);
        if (user) cache.set(userCacheKey, user, 60);
      }

      if (!user) {
        return res.status(404).json({ error: "Invalid National Number" });
      }
      if (!user.isactive) {
        return res.status(406).json({ error: "User is not Active" });
      }

      const salariesKey = `salaries:${user.id}`;
      let salaries = cache.get<any[]>(salariesKey);
      if (!salaries) {
        salaries = await dataAccess.getSalariesByUserId(user.id);
        cache.set(salariesKey, salaries, 60);
      }

      if (!salaries || salaries.length < 3) {
        return res.status(422).json({ error: "INSUFFICIENT_DATA" });
      }

      const output = ProcessStatus.compute(
        {
          id: user.id,
          username: user.username,
          nationalNumber: user.nationalnumber,
          email: user.email,
          phone: user.phone,
          isActive: user.isactive,
        },
        salaries.map((s) => ({
          id: s.id,
          year: s.year,
          month: s.month,
          salary: Number(s.salary),
        }))
      );

      return res.status(200).json(output);
    } catch (e) {
      next(e);
    }
  }
);
