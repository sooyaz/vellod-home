import isLinePixel from "./isLinePixel";
import ColoringCanvasEngine from "../engine/ColoringCanvasEngine";
import getBrushPixels from "./getBrushPixels";

export default function canDraw(
    engine: ColoringCanvasEngine,
    x: number,
    y: number,
    brushSize: number
){
  const pixels =
    getBrushPixels(
      x,
      y,
      brushSize
    );

  for (const point of pixels) {
    const pixel =
      engine.getPixel(
        point.x,
        point.y
      );

    if (isLinePixel(pixel)) {
      return false;
    }
  }

  return true;
}