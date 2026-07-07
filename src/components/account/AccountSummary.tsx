interface Props {
  balance: number;
  income: number;
  expense: number;
}

export default function AccountSummary({
  balance,
  income,
  expense,
}: Props) {
  const items = [
    {
      title: "현재 잔액",
      value: balance,
    },
    {
      title: "총 입금",
      value: income,
    },
    {
      title: "총 사용",
      value: expense,
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-white/10 bg-slate-900 p-6"
        >
          <p className="text-sm text-slate-400">
            {item.title}
          </p>

          <h2 className="mt-4 text-3xl font-bold">
            {item.value.toLocaleString()}원
          </h2>
        </div>
      ))}
    </section>
  );
}