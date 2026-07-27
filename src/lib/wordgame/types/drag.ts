import { WordCard } from "./card";

export interface DragState {
  card: WordCard | null;
  x: number;
  y: number;
  originX: number;
  originY: number;
  dragging: boolean;
  returning: boolean;
}