"use client";

import useColoring from "@/hooks/useColoring";

import type { ColoringTemplate } from "@/data/coloring/types";

interface Props {
  template: ColoringTemplate;
  tool: "brush" | "fill";
  color: string;
}

export default function ColoringCanvas({
  template, tool, color
}: Props) {

const { canvasRef, onPointerDown, onPointerMove, onPointerUp } = useColoring( template, tool, color );

  return (
    <canvas
      ref={canvasRef}
      width={900}
      height={900}
      className="h-full w-full"
      style={{
        border: "1px solid #ddd",
        display: "block",
        touchAction: "none"
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    />
  );
}