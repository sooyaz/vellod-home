import { AttendanceData, LedgerData } from "@/types/account";

export const attendanceData: AttendanceData = {
  headers: [
    "월",
    "철수",
    "영희",
    "민수",
    "동훈",
    "상민",
  ],

  rows: [
    ["1월", "2/3", "2/5", "-", "2/4", "2/8"],
    ["2월", "2/3", "-", "2/8", "2/5", "2/10"],
    ["3월", "3/3", "3/2", "-", "3/5", "3/8"],
    ["4월", "4/1", "4/3", "-", "4/2", "-"],
  ],
};

export const ledgerData: LedgerData[] = [
  {
    date: "2026-02-03",
    content: "모임통장 개설",
    income: 0,
    expense: 0,
    balance: 0,
  },
  {
    date: "2026-02-03",
    content: "회비 입금",
    income: 240000,
    expense: 0,
    balance: 240000,
  },
  {
    date: "2026-02-10",
    content: "회식",
    income: 0,
    expense: 82000,
    balance: 158000,
  },
];