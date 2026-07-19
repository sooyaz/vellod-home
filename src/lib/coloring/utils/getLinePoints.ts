import type { BrushPoint } from "../tools/brush";

export default function getLinePoints(
  from: BrushPoint,
  to: BrushPoint,
  brushSize: number
): BrushPoint[] {

  const points: BrushPoint[] = [];

  const dx = to.x - from.x;
  const dy = to.y - from.y;

  const distance = Math.sqrt(
    dx * dx + dy * dy
  );

  if (distance === 0) {
    return [from];
  }

  const radius = brushSize / 2;

  // 브러시 반지름의 절반 간격
  const spacing = Math.max(
    1,
    radius * 0.5
  );

  const steps = Math.ceil(
    distance / spacing
  );

  for (let i = 0; i <= steps; i++) {

    const t = i / steps;

    points.push({
      x: from.x + dx * t,
      y: from.y + dy * t,

    });

  }

  return points;
}