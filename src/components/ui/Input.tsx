"use client";

interface InputProps {
  label: string;
  value: number;
  placeholder?: string;
  suffix?: string;
  onChange: (value: number) => void;
}

export default function Input({
  label,
  value,
  placeholder,
  suffix,
  onChange,
}: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>

      <div className="relative">
        <input
          type="number"
          value={value === 0 ? "" : value}
          placeholder={placeholder}
          onChange={(e) => onChange(Number(e.target.value))}
          className="
            w-full
            rounded-xl
            border
            border-white/10
            bg-slate-900
            px-4
            py-3
            pr-14
            text-white
            outline-none
            transition
            focus:border-blue-500
          "
        />

        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}