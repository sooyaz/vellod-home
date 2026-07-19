import PaintCanvasEngine from "../canvas/paintCanvas";
import PaintHistory from "../canvas/paintHistory";

import type { PaintSettings } from "../settings/settings";

import { Point } from "@/types/paint";

export interface PaintContext {
  canvas: PaintCanvasEngine;

  history: PaintHistory;

  settings: PaintSettings;
}

export interface PaintTool {
  onSelect?(
    context: PaintContext
  ): void;

  onUnselect?(
    context: PaintContext
  ): void;

  onMouseDown(
    point: Point,
    context: PaintContext
  ): void;

  onMouseMove(
    point: Point,
    context: PaintContext
  ): void;

  onMouseUp(
    point: Point,
    context: PaintContext
  ): void;

  isInstant?(): boolean;
}