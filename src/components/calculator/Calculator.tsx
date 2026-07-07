"use client";

import { useState } from "react";

import CalculatorForm from "./CalculatorForm";
import ResultCard from "./ResultCard";

import { CalculatorValues } from "@/types/calculator";
import { CalculatorResult } from "@/types/calculator";
import { calculateSellingPrice } from "@/utils/calculator";

export default function Calculator() {
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const [values, setValues] =
    useState<CalculatorValues>({
      cost: 0,
      shipping: 0,
      advertising: 0,
      fee: 0,
      margin: 0,
    });

  const handleChange = (
    key: keyof CalculatorValues,
    value: number
  ) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

const handleCalculate = () => {
  const calculated =
    calculateSellingPrice(values);

  setResult(calculated);
};

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-10 text-4xl font-bold">
          판매가 계산기
        </h1>

        <div className="grid gap-10 lg:grid-cols-2">

          <CalculatorForm
            values={values}
            onChange={handleChange}
            onCalculate={handleCalculate}
          />

          <div className="space-y-5">

            <ResultCard
              title="판매가"
              value={
                result
                  ? `${result.sellingPrice.toLocaleString()}원`
                  : "-"
              }
            />

            <ResultCard
              title="예상 수익"
              value={
                result
                  ? `${result.expectedProfit.toLocaleString()}원`
                  : "-"
              }
            />

            <ResultCard
              title="순이익"
              value={
                result
                  ? `${result.netProfit.toLocaleString()}원`
                  : "-"
              }
            />

          </div>

        </div>

      </div>
    </main>
  );
}