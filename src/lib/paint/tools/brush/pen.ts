import BaseBrushTool from "../base/baseBrushTool";

import type { PaintContext } from "../tool";

import type { BrushSettings } from "../../settings/settings";

export default class PenTool
  extends BaseBrushTool
{
  protected getBrushSettings(
    context: PaintContext
  ): BrushSettings {
    return context.settings.brush;
  }
}