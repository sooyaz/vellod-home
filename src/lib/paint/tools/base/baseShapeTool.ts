import type { PaintContext, PaintTool } from "../tool";

import type { Point } from "@/types/paint";
import type { ShapeBounds } from "@/types/shape";

export default abstract class BaseShapeTool
  implements PaintTool
{
  protected drawing = false;

  protected startPoint: Point | null =
    null;

  protected currentPoint: Point | null =
    null;

  onMouseDown(
    point: Point,
    context: PaintContext
  ) {
    this.drawing = true;

    this.startPoint = point;
    this.currentPoint = point;

    context.canvas.beginPreview();
  }

  onMouseMove(
    point: Point,
    context: PaintContext
  ) {
    if (!this.drawing) return;

    this.currentPoint = point;

    context.canvas.clearPreview();

    this.drawPreview(context);
  }

  onMouseUp(
    point: Point,
    context: PaintContext
  ) {
    if (!this.drawing) return;

    this.currentPoint = point;

    context.canvas.cancelPreview();

    this.draw(context);

    this.drawing = false;

    this.startPoint = null;
    this.currentPoint = null;
  }

  protected configureContext(
    ctx: CanvasRenderingContext2D,
    context: PaintContext
  ) {
    ctx.strokeStyle =
      context.settings.brush.color;

    ctx.lineWidth =
      context.settings.brush.size;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }

  protected getBounds(
    context: PaintContext
  ): ShapeBounds | null {

    if (
      !this.startPoint ||
      !this.currentPoint
    ) {
      return null;
    }

    const startX = this.startPoint.x;
    const startY = this.startPoint.y;

    let endX = this.currentPoint.x;
    let endY = this.currentPoint.y;

    //----------------------------------
    // Shift
    //----------------------------------
    const shift =
      this.applyShift(
        context,
        startX,
        startY,
        endX,
        endY
      );

    endX = shift.endX;
    endY = shift.endY;

    const {
      width,
      height,
    } = this.getSize(
      startX,
      startY,
      endX,
      endY
    );

    const x = Math.min(startX, endX);
    const y = Math.min(startY, endY);

    return {
      x,
      y,

      width,
      height,

      startX,
      startY,

      endX,
      endY,

      centerX:
        x + width / 2,

      centerY:
        y + height / 2,
    };
  }

  protected getSize(
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) {
    return {
      width: Math.abs(endX - startX),
      height: Math.abs(endY - startY),
    };
  }

  protected applyShift(
    context: PaintContext,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) {
    if (
      !this.isShiftPressed(context)
    ) {
      return {
        endX,
        endY,
      };
    }

    const width =
      Math.abs(endX - startX);

    const height =
      Math.abs(endY - startY);

    const size =
      Math.min(width, height);

    return {
      endX:
        startX +
        Math.sign(endX - startX) *
        size,

      endY:
        startY +
        Math.sign(endY - startY) *
        size,
    };
  }

  protected isShiftPressed(
    context: PaintContext
  ) {
    return context.settings.keyboard.shift;
  }

  protected renderShape(
    ctx: CanvasRenderingContext2D,
    context: PaintContext
  ) {
    ctx.save();

    this.configureContext(
      ctx,
      context
    );

    this.drawShape(
      ctx,
      context
    );

    ctx.restore();
  }

  protected drawPreview(
    context: PaintContext
  ) {
    const ctx =
      context.canvas.getOverlayContext();

    this.renderShape(
      ctx,
      context
    );
  }

  protected draw(
    context: PaintContext
  ) {
    const ctx =
      context.canvas.getMainContext();

    this.renderShape(
      ctx,
      context
    );
  }

  protected abstract drawShape(
    ctx: CanvasRenderingContext2D,
    context: PaintContext
  ): void;
}