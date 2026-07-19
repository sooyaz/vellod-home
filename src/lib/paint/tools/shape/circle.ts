import BaseShapeTool from "../base/baseShapeTool";
import type { ShapeBounds } from "@/types/shape";

import type { PaintContext } from "../tool";

export default class CircleTool
  extends BaseShapeTool
{
  protected drawShape(
    ctx: CanvasRenderingContext2D,
    context: PaintContext
  ) {
    const bounds =
      this.getBounds(context);

    if (!bounds) {
      return;
    }

    ctx.save();

    this.configureContext(
      ctx,
      context
    );

    this.drawPath(ctx, bounds);

    ctx.stroke();

    ctx.restore();
  }

  private drawPath(
    ctx: CanvasRenderingContext2D,
    bounds: ShapeBounds
  ) {
    ctx.beginPath();

    ctx.ellipse(
      bounds.centerX,
      bounds.centerY,
      bounds.width / 2,
      bounds.height / 2,
      0,
      0,
      Math.PI * 2
    );
  }
}