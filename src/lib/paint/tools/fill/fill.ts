import type { PaintContext, PaintTool } from "../tool";
import type { Point } from "@/types/paint";
import { floodFill } from "../../algorithms/floodFill";
import { hexToRGBA } from "../../utils/color";

export default class FillTool
  implements PaintTool
{

  isInstant() {
    return true;
  }
  
  onMouseDown(
    point: Point,
    context: PaintContext
  ) {
    const ctx = context.canvas.getMainContext();
    const { width, height } = context.canvas.getSize();

    const imageData = ctx.getImageData(0, 0, width, height);
    const fillColor = hexToRGBA( context.settings.brush.color );
    const tolerance = context.settings.fill.tolerance;

    floodFill({
      imageData: imageData,
      x: Math.floor(point.x),
      y: Math.floor(point.y),
      fillColor,
      tolerance: tolerance,
    });

    ctx.putImageData( imageData, 0, 0 );
  }

  onMouseMove() {}

  onMouseUp() {}
}