export interface AttendanceData {
  headers: string[];
  rows: string[][];
}

export interface LedgerData {
  date: string;
  content: string;
  income: number;
  expense: number;
  balance: number;
}