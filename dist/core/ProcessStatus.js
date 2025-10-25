"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessStatus = void 0;
const types_1 = require("./types");
function adjustSalary(row) {
    let s = row.salary;
    if (row.month === 12)
        s = s * 1.1;
    if ([6, 7, 8].includes(row.month))
        s = s * 0.95;
    return Number(s.toFixed(2));
}
function computeStatus(average) {
    if (average > 2000)
        return types_1.StatusColor.GREEN;
    if (average === 2000)
        return types_1.StatusColor.ORANGE;
    return types_1.StatusColor.RED;
}
class ProcessStatus {
    static compute(emp, salaries) {
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
            EmployeeName: emp.username,
            NationalNumber: emp.nationalNumber,
            HighestSalary: Number(highest.toFixed(2)),
            AverageSalary: average,
            Status: computeStatus(average),
            IsActive: emp.isActive,
            LastUpdated: new Date().toISOString(),
        };
    }
}
exports.ProcessStatus = ProcessStatus;
