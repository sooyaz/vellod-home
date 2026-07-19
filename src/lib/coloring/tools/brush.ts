import ColoringCanvasEngine from "../engine/ColoringCanvasEngine";
import isLinePixel from "../utils/isLinePixel";
import getLinePoints from "../utils/getLinePoints";
import canDraw from "../utils/canDraw";

export interface BrushPoint {
  x: number;
  y: number;
}

export interface BrushOptions {
  color: string;
  size: number;
}

export default class Brush {
  constructor(
    private engine: ColoringCanvasEngine,
    private options: BrushOptions
  ) {}

  setColor(
    color: string
  ) {
    this.options.color = color;
  }

  setSize(
    size: number
  ) {
    this.options.size = size;
  }

  start(
      point: BrushPoint
  ) {
    this.drawPoint(point);
  }

  move(
    from: BrushPoint,
    to: BrushPoint
  ) {

    const points =
      getLinePoints(
        from,
        to,
        this.options.size
      );

    for (const point of points) {
      this.drawPoint(point);
    }
  }

  private drawPoint(
    point: BrushPoint
  ) {

    if (
      !canDraw(
        this.engine,
        point.x,
        point.y,
        this.options.size
      )
    ) {
      return;
    }

    this.engine.drawBrush(
      point.x,
      point.y,
      this.options.color,
      this.options.size
    );

  }

  end() {}

}