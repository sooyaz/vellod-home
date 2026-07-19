import BaseBrushTool from "../base/baseBrushTool";

import type { PaintContext } from "../tool";

import type { BrushSettings } from "../../settings/settings";

export default class HighlighterTool
  extends BaseBrushTool
{
  protected getBrushSettings(
    context: PaintContext
  ): BrushSettings {
    return {
      ...context.settings.brush,

      opacity: 0.1,
    };
  }

  protected redraw(
    context: PaintContext,
    ctx: CanvasRenderingContext2D
  ) {
    context.canvas.clearPreview();

    ctx.beginPath();

    const first = this.points[0];

    if (!first) return;

    ctx.moveTo(
      first.x,
      first.y
    );

    for (const point of this.points) {
      ctx.lineTo(
        point.x,
        point.y
      );
    }

    ctx.stroke();
  }
}