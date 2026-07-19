"use client";

import PaintToolbar from "./PaintToolbar";
import PaintCanvas from "./PaintCanvas";

import usePaint from "@/hooks/usePaint";

export default function Paint() {
  const paint = usePaint();

  return (
    <div className="flex h-full flex-col">

      <PaintToolbar
        paint={paint}
      />

      <div className="flex-1 overflow-hidden rounded-xl border border-slate-200 bg-white">

        <PaintCanvas
          paint={paint}
        />

      </div>

      <div className="mt-4 flex justify-between rounded-lg border bg-slate-50 px-4 py-3 text-sm">

        <span>{paint.tool}</span>

        <span>{paint.color}</span>

        <span>{paint.brushSize}px</span>

      </div>

    </div>
  );
}