interface ResultCardProps {
  title: string;
  value: string;
}

export default function ResultCard({
  title,
  value,
}: ResultCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
      <p className="text-sm text-slate-400">{title}</p>

      <h3 className="mt-3 text-3xl font-bold">{value}</h3>
    </div>
  );
}