export type ToolType =
  | "pen"
  | "highlighter"
  | "eraser"
  | "rectangle"
  | "circle"
  | "line"
  | "bucket";

export interface Point {
  x: number;
  y: number;
}

export interface Brush {
  color: string;
  size: number;
}

export interface HistoryState {
  imageData: ImageData;
}

export interface PaintState {
  tool: ToolType;
  brush: Brush;
}