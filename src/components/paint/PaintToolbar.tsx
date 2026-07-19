"use client";

import usePaint from "@/hooks/usePaint";

interface Props {
  paint: ReturnType<typeof usePaint>;
}

export default function PaintToolbar({
  paint,
}: Props) {
  const toolButton = (
    active: boolean
  ) =>
    `
      rounded-lg
      border
      px-4
      py-2
      text-sm
      font-medium
      transition
      ${
        active
          ? "border-blue-500 bg-blue-500 text-white"
          : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
      }
    `;

  return (
    <div className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

      <div className="flex flex-wrap items-center gap-3">

        <button
          className={toolButton(
            paint.tool === "pen"
          )}
          onClick={() =>
            paint.setTool("pen")
          }
        >
          ✏️ Pen
        </button>

        <button
          className={toolButton(
            paint.tool ===
              "highlighter"
          )}
          onClick={() =>
            paint.setTool(
              "highlighter"
            )
          }
        >
          🖍 Highlighter
        </button>
        
        {/* Eraser Tool */}
        <button
          className={toolButton(
            paint.tool === "eraser"
          )}
          onClick={() =>
            paint.setTool("eraser")
          }
        >
          🩹 Eraser
        </button>

        {/* Fill Tool */}
        <button
          className={toolButton(
            paint.tool === "bucket"
          )}
          onClick={() =>
            paint.setTool("bucket")
          }
        >
          🪣 Fill
        </button>

        {/* Rectangle Tool */}
        <button
          className={toolButton(
            paint.tool === "rectangle"
          )}
          onClick={() =>
            paint.setTool("rectangle")
          }
        >
          ▭ Rectangle
        </button>

        {/* Circle Tool */}
        <button
          className={toolButton(
            paint.tool === "circle"
          )}
          onClick={() =>
            paint.setTool("circle")
          }
        >
          ⭕ Circle
        </button>

        {/* Line Tool */}
        <button
          className={toolButton(
            paint.tool === "line"
          )}
          onClick={() =>
            paint.setTool("line")
          }
        >
          ／ Line
        </button>

        <div className="mx-2 h-8 w-px bg-slate-300" />

        <button
          onClick={paint.undo}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
        >
          ↶ Undo
        </button>

        <button
          onClick={paint.redo}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
        >
          ↷ Redo
        </button>

        <button
          onClick={paint.clear}
          className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700 transition hover:bg-red-100"
        >
          🗑 Clear
        </button>

        <div className="mx-2 h-8 w-px bg-slate-300" />

        <input
          type="color"
          value={paint.color}
          onChange={(e) =>
            paint.setColor(
              e.target.value
            )
          }
          className="h-10 w-14 cursor-pointer rounded border"
        />

        <input
          type="range"
          min={1}
          max={50}
          value={paint.brushSize}
          onChange={(e) =>
            paint.setBrushSize(
              Number(e.target.value)
            )
          }
        />

        <span className="text-sm text-slate-600">
          {paint.brushSize}px
        </span>

      </div>

    </div>
  );
}