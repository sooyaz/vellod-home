"use client";

interface Props {
  current: "deposit" | "expense";
  onChange: (tab: "deposit" | "expense") => void;
}

export default function AccountTabs({
  current,
  onChange,
}: Props) {
  return (
    <div className="mt-10 flex gap-3">

      <button
        onClick={() => onChange("deposit")}
        className={`rounded-xl px-6 py-3 transition ${
          current === "deposit"
            ? "bg-blue-600"
            : "bg-slate-800"
        }`}
      >
        입금내역
      </button>

      <button
        onClick={() => onChange("expense")}
        className={`rounded-xl px-6 py-3 transition ${
          current === "expense"
            ? "bg-blue-600"
            : "bg-slate-800"
        }`}
      >
        사용내역
      </button>

    </div>
  );
}