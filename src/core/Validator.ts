import { z } from "zod";
import type { GetEmpStatusInput } from "./types";

const inputSchema = z.object({
  NationalNumber: z.string().trim().min(1).max(50),
});

export class Validator {
  static validateInput(payload: unknown): GetEmpStatusInput {
    return inputSchema.parse(payload);
  }
}
