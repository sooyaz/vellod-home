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

const { canvasRef, engine, onPointerDown, onPointerMove, onPointerUp } = useColoring( template, tool, color );

  return (
    <canvas
      ref={canvasRef}
      width={900}
      height={900}
      style={{
        border: "1px solid #ddd",
        display: "block",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    />
  );
}