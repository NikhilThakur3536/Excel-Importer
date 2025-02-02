// backend/utils/fileProcessor.ts
import { Workbook } from 'exceljs';
import { validationRules } from '../config/validation';

interface ValidationError {
  row: number;
  error: string;
 
}

interface ParsedData {
  errors: ValidationError[];
  records: any[];
  sheets: string[];
}

export async function parseAndValidateExcel(filePath: string): Promise<ParsedData> {
  const workbook = new Workbook();
  await workbook.xlsx.readFile(filePath);
  const sheets = workbook.worksheets.map(sheet => sheet.name);
  const errors= [];
  const records= [];

  workbook.worksheets.forEach(sheet => {
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row

      const name = row.getCell(1).value as string;
      const amount = row.getCell(2).value as number;
      const date = row.getCell(3).value as Date;
      const verified = row.getCell(4).value as 'Yes' | 'No';

      if (!name || !amount || !date) {
        errors.push({ row: rowNumber, error: 'Missing required fields' });
      }

      if (typeof amount !== 'number' || amount < validationRules.amount.min) {
        errors.push({ row: rowNumber, error: 'Invalid amount' });
      }

      if (!validationRules.dateValidation(new Date(date))) {
        errors.push({ row: rowNumber, error: 'Invalid or out-of-range date' });
      }

      if (errors.length === 0) {
        records.push({ name, amount, date: new Date(date), verified });
      } 
    });
  });

  return { errors, records, sheets };
}   