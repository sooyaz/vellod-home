"use client";

import PaintToolbar from "./PaintToolbar";
import PaintCanvas from "./PaintCanvas";

import usePaint from "@/hooks/usePaint";

export default function Paint() {
  const paint = usePaint();

  return (
    <div
      className="flex h-full min-h-0 flex-col p-2 md:p-4">

      <PaintToolbar
        paint={paint}
      />

        <div
          className="
            relative
            flex-1
            min-h-0
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-white
          "
        >

        <PaintCanvas
          paint={paint}
        />

      </div>

      <div
        className="
          mt-2
          flex
          flex-wrap
          justify-between
          gap-2
          rounded-lg
          border
          bg-slate-50
          px-3
          py-2
          text-xs
          md:px-4
          md:py-3
          md:text-sm
        "
      >

        <span>{paint.tool}</span>

        <span>{paint.color}</span>

        <span>{paint.brushSize}px</span>

      </div>

    </div>
  );
}