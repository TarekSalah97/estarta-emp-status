import type {
  EmpInfo,
  SalaryRow,
  GetEmpStatusOutput,
  StatusColor,
} from "./types";

function adjustSalary(row: SalaryRow): number {
  let s = row.salary;
  if (row.month === 12) s = s * 1.1;
  if ([6, 7, 8].includes(row.month)) s = s * 0.95;
  return Number(s.toFixed(2));
}

function computeStatus(average: number): StatusColor {
  if (average > 2000) return "GREEN";
  if (average === 2000) return "ORANGE";
  return "RED";
}

export class ProcessStatus {
  static compute(emp: EmpInfo, salaries: SalaryRow[]): GetEmpStatusOutput {
    const adjusted = salaries.map(adjustSalary);

    let sum = adjusted.reduce((a, b) => a + b, 0);

    let appliedTax = false;
    if (sum > 10000) {
      sum = sum * 0.93;
      appliedTax = true;
    }

    const count = adjusted.length;
    const average = Number((sum / count).toFixed(2));
    const highest = Math.max(...adjusted);

    return {
      employee: {
        id: emp.id,
        username: emp.username,
        nationalNumber: emp.nationalNumber,
        email: emp.email,
        phone: emp.phone,
      },
      stats: {
        count,
        sum: Number(sum.toFixed(2)),
        average,
        highest: Number(highest.toFixed(2)),
        appliedTax,
      },
      status: computeStatus(average),
      lastUpdatedUtc: new Date().toISOString(),
    };
  }
}
