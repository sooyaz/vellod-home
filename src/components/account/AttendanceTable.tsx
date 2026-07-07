import { AttendanceData } from "@/types/account";

interface Props {
  data: AttendanceData;
}

export default function AttendanceTable({ data }: Props) {
  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-slate-900">

      <div className="overflow-x-auto">

        <table className="min-w-full border-collapse">

          <thead>

            <tr className="bg-slate-800">

              {data.headers.map((header) => (
                <th
                  key={header}
                  className="whitespace-nowrap border-b border-white/10 px-6 py-4 text-center font-semibold"
                >
                  {header}
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {data.rows.map((row, rowIndex) => (

              <tr
                key={rowIndex}
                className="hover:bg-slate-800/40"
              >

                {row.map((cell, cellIndex) => (

                  <td
                    key={cellIndex}
                    className="border-b border-white/5 px-6 py-4 text-center"
                  >
                    {cell}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}