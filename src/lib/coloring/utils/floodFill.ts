import ColoringCanvasEngine from "../engine/ColoringCanvasEngine";
import isLinePixel from "./isLinePixel";

export interface FillPoint {
  x: number;
  y: number;
}

export default function floodFill(
  engine: ColoringCanvasEngine,
  startX: number,
  startY: number
): Set<number> {

  const startPixel = engine.getPixel(
    startX,
    startY
  );

  if (!startPixel) {
    return new Set<number>();
  }

  // 선 위를 클릭하면 종료
  if (isLinePixel(startPixel)) {
    return new Set<number>();
  }

  const result = new Set<number>();
  const visited = new Set<number>();

  const queue: FillPoint[] = [
    {
      x: Math.floor(startX),
      y: Math.floor(startY),
    },
  ];

  let head = 0;

  while (head < queue.length) {

    const point = queue[head++];

    // 캔버스 밖
    if (
      point.x < 0 ||
      point.y < 0 ||
      point.x >= engine.width ||
      point.y >= engine.height
    ) {
      continue;
    }

    const index =
      point.y * engine.width +
      point.x;

    // 이미 방문
    if (visited.has(index)) {
      continue;
    }

    visited.add(index);

    const pixel =
      engine.getPixel(
        point.x,
        point.y
      );

    if (!pixel) {
      continue;
    }

    // 선이면 종료
    if (isLinePixel(pixel)) {
      continue;
    }

    result.add(index);

    queue.push(
      { x: point.x + 1, y: point.y },
      { x: point.x - 1, y: point.y },
      { x: point.x, y: point.y + 1 },
      { x: point.x, y: point.y - 1 }
    );
  }

  return result;
}