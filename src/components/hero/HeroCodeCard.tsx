export default function HeroCodeCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <div className="flex gap-2">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-400" />
      </div>

      <pre className="mt-8 text-sm leading-8 text-slate-300 overflow-x-auto">
{`const developer = {
  name: "SM",
  frontend: "Next.js",
  backend: "NestJS",
  database: "PostgreSQL",
  status: "Available"
}`}
      </pre>
    </div>
  );
}