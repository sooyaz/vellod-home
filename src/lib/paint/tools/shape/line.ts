import BaseShapeTool from "../base/baseShapeTool";

import type { PaintContext } from "../tool";

export default class LineTool
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

    ctx.save();

    this.configureContext(
      ctx,
      context
    );

    ctx.beginPath();

    ctx.moveTo(
      this.startPoint.x,
      this.startPoint.y
    );

    ctx.lineTo(
      this.currentPoint.x,
      this.currentPoint.y
    );

    ctx.stroke();

    ctx.restore();
  }
}