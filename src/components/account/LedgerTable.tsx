import { LedgerData } from "@/types/account";

interface Props {
  data: LedgerData[];
}

export default function LedgerTable({ data }: Props) {
  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-slate-900">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="bg-slate-800">

              <th className="px-6 py-4 text-left">날짜</th>
              <th className="px-6 py-4 text-left">내용</th>
              <th className="px-6 py-4 text-right">입금</th>
              <th className="px-6 py-4 text-right">출금</th>
              <th className="px-6 py-4 text-right">잔액</th>

            </tr>

          </thead>

          <tbody>

            {data.map((item, index) => (

              <tr
                key={index}
                className="border-b border-white/5 hover:bg-slate-800/40"
              >

                <td className="px-6 py-4">{item.date}</td>

                <td className="px-6 py-4">{item.content}</td>

                <td className="px-6 py-4 text-right">
                  {item.income === 0 ? "-" : item.income.toLocaleString()}
                </td>

                <td className="px-6 py-4 text-right">
                  {item.expense === 0 ? "-" : item.expense.toLocaleString()}
                </td>

                <td className="px-6 py-4 text-right font-semibold">
                  {item.balance.toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}