"use client";

import { useEffect } from "react";

import usePaint from "@/hooks/usePaint";

interface Props {
  paint: ReturnType<typeof usePaint>;
}

export default function PaintCanvas({
  paint,
}: Props) {
  useEffect(() => {
    paint.initialize();
  }, []);

  return (
    <div className="relative h-full w-full">

      <canvas
        ref={paint.canvasRef}
        className="absolute inset-0 h-full w-full bg-white"

        onPointerDown={paint.onPointerDown}
        onPointerMove={paint.onPointerMove}
        onPointerUp={paint.onPointerUp}
        onPointerLeave={paint.onPointerLeave}
      />

      <canvas
        ref={paint.overlayCanvasRef}
        className="absolute inset-0 pointer-events-none h-full w-full"
      />

    </div>
  );
}