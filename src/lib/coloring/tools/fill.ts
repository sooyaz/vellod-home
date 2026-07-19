import ColoringCanvasEngine from "../engine/ColoringCanvasEngine";
import floodFill from "../utils/floodFill";

export interface FillPoint {
  x: number;
  y: number;
}

export interface FillOptions {
  color: string;
}

export default class Fill {

  constructor(
    private engine: ColoringCanvasEngine,
    private options: FillOptions
  ) {}

  setColor(
    color: string
  ) {
    this.options.color = color;
  }

  start(
    point: FillPoint
  ) {
    const pixels = floodFill(
      this.engine,
      point.x,
      point.y
    );

    const imageData = this.engine.getImageData();

    const hex =
      this.options.color.replace(
        "#",
        ""
      );

    const r =
      parseInt(
        hex.slice(0, 2),
        16
      );

    const g =
      parseInt(
        hex.slice(2, 4),
        16
      );

    const b =
      parseInt(
        hex.slice(4, 6),
        16
      );

    for (const index of pixels) {
      const pixelIndex = index * 4;

      imageData.data[pixelIndex] = r;
      imageData.data[pixelIndex + 1] = g;
      imageData.data[pixelIndex + 2] = b;
      imageData.data[pixelIndex + 3] = 255;
    }

    this.engine.putImageData(
      imageData
    );
  }

  move() {}

  end() {}
}