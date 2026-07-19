export interface BrushPixel {
  x: number;
  y: number;
}

export default function getBrushPixels(
  centerX: number,
  centerY: number,
  brushSize: number
): BrushPixel[] {

  const pixels: BrushPixel[] = [];
  const radius = brushSize / 2;

  for (
    let offsetY = -radius;
    offsetY <= radius;
    offsetY++
  ) {

    for (
      let offsetX = -radius;
      offsetX <= radius;
      offsetX++
    ) {

      if (
        offsetX * offsetX +
        offsetY * offsetY >
        radius * radius
      ) {
        continue;
      }

      pixels.push({
        x: Math.round(centerX + offsetX),
        y: Math.round(centerY + offsetY),
      });
    }
  }

  return pixels;
}