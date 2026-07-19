import type { PaintContext, PaintTool } from "../tool";


import { Point } from "@/types/paint";
import type {  BrushSettings } from "../../settings/settings";

export default abstract class BaseBrushTool
  implements PaintTool
{
  protected drawing = false;
  protected points: Point[] = [];

  onMouseDown(
    point: Point,
    context: PaintContext
  ) {
    if (this.usePreview()) {
      context.canvas.beginPreview();
    }

    const ctx = context.canvas.getActiveContext();

    ctx.save();

    const brush = this.getBrushSettings(context);

    ctx.strokeStyle = brush.color;
    ctx.lineWidth = brush.size;
    ctx.globalAlpha = brush.opacity;

    this.configureContext(ctx);

    this.beforeDraw(
      context,
      ctx
    );

    this.points = [point];
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);

    // 클릭만 해도 점이 찍히도록
    ctx.lineTo(
      point.x + 0.01,
      point.y + 0.01
    );

    ctx.stroke();

    this.drawing = true;
  }

  onMouseMove(
    point: Point,
    context: PaintContext
  ) {
    if (!this.drawing) return;

    const ctx =
      context.canvas.getActiveContext();

    this.points.push(point);

    this.redraw(
      context,
      ctx
    );
  }

  onMouseUp(
    point: Point,
    context: PaintContext
  ) {
    if (!this.drawing) return;

    const ctx =
      context.canvas.getActiveContext();

    ctx.lineTo(
      point.x,
      point.y
    );

    ctx.stroke();

    ctx.closePath();

    this.afterDraw(
      context,
      ctx
    );

    ctx.restore();

    if (this.usePreview()) {
      context.canvas.commitPreview();
    }

    this.drawing = false;
    this.points = [];
  }

  protected abstract getBrushSettings(
    context: PaintContext
  ): BrushSettings;

  protected configureContext(
    ctx: CanvasRenderingContext2D
  ) {
    ctx.globalCompositeOperation =
      "source-over";
  }

  /**
   * 그리기 시작 전 호출
   */
  protected beforeDraw(
    _context: PaintContext,
    _ctx: CanvasRenderingContext2D
  ) {}
  /**
   * 그리기 종료 후 호출
   */
  protected afterDraw(
    _context: PaintContext,
    _ctx: CanvasRenderingContext2D
  ) {}
  protected redraw(
    _context: PaintContext,
    ctx: CanvasRenderingContext2D
  ) {
    const point =
      this.points[
        this.points.length - 1
      ];

    if (!point) return;

    ctx.lineTo(
      point.x,
      point.y
    );

    ctx.stroke();
  }

  protected usePreview() {
    return false;
  }
}