"use client";

import { useEffect, useState } from "react";

import AccountLayout from "@/components/account/AccountLayout";
import AccountSummary from "@/components/account/AccountSummary";
import AccountTabs from "@/components/account/AccountTabs";
import AttendanceTable from "@/components/account/AttendanceTable";
import LedgerTable from "@/components/account/LedgerTable";

import {
  AttendanceData,
  LedgerData,
} from "@/types/account";

export default function Page() {
  const [tab, setTab] = useState<"deposit" | "expense">("deposit");

  const [attendanceData, setAttendanceData] =
    useState<AttendanceData>({
      headers: [],
      rows: [],
    });

  const [ledgerData, setLedgerData] =
    useState<LedgerData[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/account/cjfriend");

        const result = await response.json();

        const attendance = result.attendance ?? [];

        setAttendanceData({
          headers: attendance[0] ?? [],
          rows: attendance.slice(1),
        });

        const ledger = result.ledger ?? [];

        const ledgerRows = ledger
          .slice(1)
          .map((row: string[]) => ({
            date: row[0] ?? "",
            content: row[1] ?? "",
            income: Number(
              (row[2] ?? "0").replace(/[₩,]/g, "")
            ),
            expense: Number(
              (row[3] ?? "0").replace(/[₩,]/g, "")
            ),
            balance: Number(
              (row[4] ?? "0").replace(/[₩,]/g, "")
            ),
          }));

        setLedgerData(ledgerRows);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const income = ledgerData.reduce(
    (sum, item) => sum + item.income,
    0
  );

  const expense = ledgerData.reduce(
    (sum, item) => sum + item.expense,
    0
  );

  const balance =
    ledgerData.length > 0
      ? ledgerData[ledgerData.length - 1].balance
      : 0;

  return (
    <AccountLayout title="CJ Friends 회비">
      <AccountSummary
        balance={balance}
        income={income}
        expense={expense}
      />

      <AccountTabs
        current={tab}
        onChange={setTab}
      />

      {loading ? (
        <div className="py-20 text-center">
          Loading...
        </div>
      ) : tab === "deposit" ? (
        <AttendanceTable
          data={attendanceData}
        />
      ) : (
        <LedgerTable
          data={ledgerData}
        />
      )}
    </AccountLayout>
  );
}