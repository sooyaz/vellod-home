import type { RGBAColor } from "../utils/color";
import { colorDistance } from "../utils/color";

export interface FloodFillOptions {
  imageData: ImageData;

  x: number;

  y: number;

  fillColor: RGBAColor;

  tolerance: number;
}

function getPixelIndex(
  x: number,
  y: number,
  width: number
) {
  return (y * width + x) * 4;
}

function getPixelColor(
  data: Uint8ClampedArray,
  index: number
) {
  return {
    r: data[index],
    g: data[index + 1],
    b: data[index + 2],
    a: data[index + 3],
  };
}

function isSameColor(
  a: RGBAColor,
  b: RGBAColor,
  tolerance: number
) {
  if (
    Math.abs(a.a - b.a) > tolerance
  ) {
    return false;
  }

  return (
    colorDistance(a, b) <= tolerance
  );
}

function setPixelColor(
  data: Uint8ClampedArray,
  index: number,
  color: RGBAColor
) {
  data[index] = color.r;
  data[index + 1] = color.g;
  data[index + 2] = color.b;
  data[index + 3] = color.a;
}

export function floodFill(
  options: FloodFillOptions
) {
  const {
      imageData,
      x,
      y,
      fillColor,
      tolerance
    } = options;

    const { width, height } = imageData;

    const data = imageData.data;

    const startIndex =
      getPixelIndex(
        x,
        y,
        width
      );

    const targetColor =
      getPixelColor(
        data,
        startIndex
      );

    if ( isSameColor( targetColor, fillColor, tolerance ) ) { return; }

    const queue = [ {x, y} ];

    let head = 0;

    const visited = new Uint8Array( width * height );

    while ( head < queue.length ) {
      const current = queue[head++];

      if (
        current.x < 0 ||
        current.x >= width ||
        current.y < 0 ||
        current.y >= height
      ) {
        continue;
      }

      const visitedIndex = current.y * width + current.x;

      if (visited[visitedIndex]) {
        continue;
      }

      visited[visitedIndex] = 1;

      const index = getPixelIndex(
          current.x,
          current.y,
          width
        );

      const color = getPixelColor(
          data,
          index
        );

      if ( !isSameColor( color,targetColor, tolerance ) ) {
        continue;
      }

      setPixelColor(
        data,
        index,
        fillColor
      );

      queue.push(
        { x: current.x + 1, y: current.y },
        { x: current.x - 1, y: current.y },
        { x: current.x, y: current.y + 1 },
        { x: current.x, y: current.y - 1 }
      );
    }
}