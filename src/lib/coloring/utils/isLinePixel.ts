export interface PixelColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export default function isLinePixel(
  pixel: PixelColor | null
) {

  if (!pixel) {
    return false;
  }

  if (pixel.a === 0) {
    return false;
  }

  const line = {
    r: 82,
    g: 81,
    b: 80,
  };

  const distance = Math.sqrt(
    (pixel.r - line.r) ** 2 +
    (pixel.g - line.g) ** 2 +
    (pixel.b - line.b) ** 2
  );

  return distance < 45;
}