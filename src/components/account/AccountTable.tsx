interface Props {
  title: string;
}

export default function AccountTable({
  title,
}: Props) {
  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-slate-900 p-6">

      <h2 className="mb-6 text-xl font-bold">
        {title}
      </h2>

      <table className="w-full">

        <thead className="border-b border-white/10">

          <tr>

            <th className="py-3 text-left">
              날짜
            </th>

            <th className="py-3 text-left">
              내용
            </th>

            <th className="py-3 text-right">
              금액
            </th>

          </tr>

        </thead>

        <tbody>

          <tr>

            <td className="py-5 text-slate-400">
              데이터 준비중
            </td>

            <td />

            <td />

          </tr>

        </tbody>

      </table>

    </section>
  );
}