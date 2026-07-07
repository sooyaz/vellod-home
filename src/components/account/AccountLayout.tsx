interface Props {
  title: string;
  children: React.ReactNode;
}

export default function AccountLayout({
  title,
  children,
}: Props) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-12">
          <h1 className="text-4xl font-bold">
            {title}
          </h1>

          <p className="mt-3 text-slate-400">
            Google Spreadsheet 기반 회비 관리
          </p>
        </div>

        {children}

      </div>
    </main>
  );
}