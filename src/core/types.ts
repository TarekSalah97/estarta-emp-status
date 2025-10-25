export enum StatusColor {
  GREEN = "GREEN",
  ORANGE = "ORANGE",
  RED = "RED",
}

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
  EmployeeName: string;
  NationalNumber: string;
  HighestSalary: number;
  AverageSalary: number;
  Status: StatusColor;
  IsActive: boolean;
  LastUpdated: string;
}
