import BaseShapeTool from "../base/baseShapeTool";
import type { PaintContext } from "../tool";
import type { ShapeBounds } from "@/types/shape";

export default class RectangleTool
  extends BaseShapeTool
{
  protected drawShape(
    ctx: CanvasRenderingContext2D,
    context: PaintContext
  ) {
    if (
      !this.startPoint ||
      !this.currentPoint
    ) {
      return;
    }

    const bounds =
      this.getBounds(context);

    if (!bounds) return;

    ctx.save();

    this.configureContext(
      ctx,
      context
    );

    ctx.strokeRect(
      bounds.x,
      bounds.y,
      bounds.width,
      bounds.height
    );

    ctx.restore();
  }
}