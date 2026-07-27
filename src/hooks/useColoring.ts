"use client";

import { useEffect, useRef } from "react";

import type { ColoringTemplate } from "@/data/coloring/types";
import ColoringCanvasEngine from "@/lib/coloring/engine/ColoringCanvasEngine";
import Brush from "@/lib/coloring/tools/brush";
import Fill from "@/lib/coloring/tools/fill";

export default function useColoring(
  template: ColoringTemplate,
  tool: "brush" | "fill",
  color: string
) {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ColoringCanvasEngine | null>(null);
  const brushRef =  useRef<Brush | null>(null);
  const fillRef = useRef<Fill | null>(null);

  const isDrawing = useRef(false);
  const lastPoint = useRef<{x: number; y: number;} | null>(null);

  const onPointerDown = (
    event: React.PointerEvent<HTMLCanvasElement>
  ) => {
    event.preventDefault();

    if (!engineRef.current) {
      return;
    }

    const point =
      engineRef.current.getPoint(
        event.clientX,
        event.clientY
      );

    const activeTool =
      tool === "brush"
        ? brushRef.current
        : fillRef.current;

    activeTool?.start(point);

    if (tool === "brush") {
      isDrawing.current = true;
      lastPoint.current = point;
    }
  };

  const onPointerMove = (
    event: React.PointerEvent<HTMLCanvasElement>
  ) => {
    event.preventDefault();

    if (tool !== "brush") {
      return;
    }

    if (!engineRef.current) {
      return;
    }

    if (!isDrawing.current) {
      return;
    }

    if (!lastPoint.current) {
      return;
    }

    const point =
      engineRef.current.getPoint(
        event.clientX,
        event.clientY
      );

    brushRef.current?.move(
      lastPoint.current,
      point
    );

    lastPoint.current = point;
  };

  const onPointerUp = (
    event: React.PointerEvent<HTMLCanvasElement>
  ) => {
    event.preventDefault();
    
    isDrawing.current = false;
    brushRef.current?.end();
    fillRef.current?.end();
    lastPoint.current = null;
  };

  useEffect(() => {

    const canvas = canvasRef.current;

    if (!canvas) { return; }

    if (!engineRef.current) {
      engineRef.current = new ColoringCanvasEngine(canvas);

      brushRef.current =
        new Brush(
          engineRef.current,
          {
            color,
            size: 20,
          }
        );

      fillRef.current =
        new Fill(
          engineRef.current,
          {
            color,
          }
        );
    }

    engineRef.current?.clear();

    engineRef.current
      ?.loadImage(
        template.image
      );

  }, [template]);

  useEffect(() => {
    brushRef.current?.setColor(color);
    fillRef.current?.setColor(color);
  }, [color]);

  return {
    canvasRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}