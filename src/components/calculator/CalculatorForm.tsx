"use client";

import { CalculatorValues } from "@/types/calculator";
import Input from "@/components/ui/Input";

interface Props {
  values: CalculatorValues;
  onChange: (
    key: keyof CalculatorValues,
    value: number
  ) => void;
  onCalculate: () => void;
}

const fields: {
  key: keyof CalculatorValues;
  label: string;
}[] = [
  { key: "cost", label: "원가" },
  { key: "shipping", label: "배송비" },
  { key: "advertising", label: "광고비" },
  { key: "fee", label: "수수료 (%)" },
  { key: "margin", label: "마진율 (%)" },
];

export default function CalculatorForm({
  values,
  onChange,
  onCalculate,
}: Props) {
  return (
    <div className="space-y-5">
      {fields.map((field) => (
        <div key={field.key}>
          <label className="mb-2 block text-sm">
            {field.label}
          </label>

          <Input
            label={field.label}
            value={values[field.key]}
            placeholder="0"
            suffix={
              field.key === "fee" || field.key === "margin"
                ? "%"
                : "원"
            }
            onChange={(value) =>
              onChange(field.key, value)
            }
          />
        </div>
      ))}

      <button
        onClick={onCalculate}
        className="w-full rounded-xl bg-blue-600 py-4 font-semibold hover:bg-blue-500"
      >
        계산하기
      </button>
    </div>
  );
}