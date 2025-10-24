export type StatusColor = "GREEN" | "ORANGE" | "RED";

export interface EmpInfo {
  id: number;
  username: string;
  nationalNumber: string;
  email: string;
  phone: string;
  isActive: boolean;
}

export interface SalaryRow {
  id: number;
  year: number;
  month: number;
  salary: number;
}

export interface GetEmpStatusInput {
  NationalNumber: string;
}

export interface GetEmpStatusOutput {
  employee: Omit<EmpInfo, "isActive">;
  stats: {
    count: number;
    sum: number;
    average: number;
    highest: number;
    appliedTax: boolean;
  };
  status: StatusColor;
  lastUpdatedUtc: string;
}
