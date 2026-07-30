'use client';

import { useState } from "react";

export default function Operators() {
  const [countV, setCountV] = useState("1");
  const [resultV, setResultV] = useState("0");
  
  const operator = (type:string) => {
    switch (type) {
      case "postfix increment":
        setCountV("2")
        setResultV("1")
        break;
      case "prefix increment":
        setCountV("2")
        setResultV("2")        
        break;
      case "postfix decrement":
        setCountV("0")
        setResultV("1")        
        break;
      case "prefix decrement":
        setCountV("0")
        setResultV("0")        
        break;
      default:
        setCountV("1")
        setResultV("0")
        break;
    }
  }
  return (
    <div className="min-h-screen bg-[#0B1120] px-4 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 rounded-3xl border border-slate-700 bg-slate-900/70 p-6 shadow-2xl backdrop-blur">

        {/* 제목 */}
        <div>
          <h1 className="text-3xl font-bold text-white">
            연산자 계산기
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            증감 연산자의 동작을 직접 확인해보세요.<br/>
            버튼의 결과는 연속되지 않고 초기 값 기준으로만 변경됩니다.
          </p>
        </div>

        {/* 계산기 영역 */}
        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
          <div className="space-y-3 font-mono text-lg">
            <p className="text-cyan-400">
              let count = 1;
            </p>

            <p className="text-cyan-400">
              let result = 0;
            </p>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">

          <button
            onClick={()=>operator("postfix increment")}
            className="
              rounded-xl
              bg-blue-600
              px-4
              py-4
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-blue-500
              active:scale-95
            "
          >
            result = count++;
          </button>

          <button
            onClick={()=>operator("prefix increment")}
            className="
              rounded-xl
              bg-blue-600
              px-4
              py-4
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-blue-500
              active:scale-95
            "
          >
            result = count--;
          </button>

          <button
            onClick={()=>operator("postfix decrement")}
            className="
              rounded-xl
              bg-blue-600
              px-4
              py-4
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-blue-500
              active:scale-95
            "
          >
            result = ++count;
          </button>

          <button
            onClick={()=>operator("prefix decrement")}
            className="
              rounded-xl
              bg-blue-600
              px-4
              py-4
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-blue-500
              active:scale-95
            "
          >
            result = --count;
          </button>

          <button
            onClick={()=>operator("reset")}
            className="
              rounded-xl
              bg-blue-600
              px-4
              py-4
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-blue-500
              active:scale-95
            "
          >
            초기화
          </button>

        </div>

        {/* 결과 영역 */}
        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">

          <h2 className="mb-4 text-xl font-bold text-white">
            결과
          </h2>

          <div className="space-y-2 font-mono text-lg">

            <div className="flex justify-between">
              <span className="text-slate-400">
                count
              </span>

              <span className="font-bold text-green-400">
                {countV}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">
                result
              </span>

              <span className="font-bold text-blue-400">
                {resultV}
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}