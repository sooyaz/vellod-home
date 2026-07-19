import getBrushPixels from "../utils/getBrushPixels";

export default class ColoringCanvasEngine {

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private templateImageData: ImageData | null = null;
  private canvasImageData: ImageData | null = null;

  constructor(
    canvas: HTMLCanvasElement
  ) {

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Canvas Context를 생성할 수 없습니다.");
    }

    this.canvas = canvas;
    this.context = context;
    
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  clear() {
    this.context.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

  }

  drawImage(
    image: HTMLImageElement
  ) {
    this.context.drawImage(
      image,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  drawLine(
    fromX: number,
    fromY: number,
    toX: number,
    toY: number,
    color: string,
    size: number
  ) {

    this.context.strokeStyle = color;
    this.context.lineWidth = size;
    this.context.lineCap = "round";
    this.context.lineJoin = "round";

    this.context.beginPath();

    this.context.moveTo(
      fromX,
      fromY
    );

    this.context.lineTo(
      toX,
      toY
    );

    this.context.stroke();
  }

  drawDot(
    x: number,
    y: number,
    color: string,
    size: number
  ) {

    this.context.fillStyle = color;

    this.context.beginPath();

    this.context.arc(
      x,
      y,
      size / 2,
      0,
      Math.PI * 2
    );
    
    this.context.fill();
  }

  setPixel(
    x: number,
    y: number,
    color: string
  ) {

    this.context.fillStyle = color;
    this.context.fillRect(
      x,
      y,
      1,
      1
    );
  }

  drawBrush(
    x: number,
    y: number,
    color: string,
    size: number
  ) {

    const pixels =
      getBrushPixels(
        x,
        y,
        size
      );

    for (const pixel of pixels) {
        this.setPixel(
            pixel.x,
            pixel.y,
            color
        );
    }
  }

  getImageData(): ImageData {
    if (!this.canvasImageData) {
        throw new Error(
            "CanvasImageData가 없습니다."
        );
    }

    return new ImageData(
        new Uint8ClampedArray(
            this.canvasImageData.data
        ),
        this.canvasImageData.width,
        this.canvasImageData.height
    );
  }

  putImageData(
    imageData: ImageData
  ) {
    this.canvasImageData =
      new ImageData(
        new Uint8ClampedArray(
          imageData.data
        ),
        imageData.width,
        imageData.height
      );

    this.context.putImageData(
      imageData,
      0,
      0
    );
  }

  setImageDataPixel(
    imageData: ImageData,
    x: number,
    y: number,
    color: string
  ) {

    const hex =
      color.replace("#", "");

    const r =
      parseInt(hex.slice(0, 2), 16);

    const g =
      parseInt(hex.slice(2, 4), 16);

    const b =
      parseInt(hex.slice(4, 6), 16);

    const index =
      (y * imageData.width + x) * 4;

    imageData.data[index] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = 255;
  }

  getPoint(
    clientX: number,
    clientY: number
  ) {
    const rect = this.canvas.getBoundingClientRect();

    return {
      x:
        (clientX - rect.left) *
        (this.canvas.width / rect.width),
      y:
        (clientY - rect.top) *
        (this.canvas.height / rect.height),
    };
  }



  async loadImage(
    src: string
  ) {

    const image = new Image();

    image.src = src;

    await new Promise<void>(
      (resolve) => {
        image.onload = () => {
          resolve();
        };
      }
    );
    this.drawImage(image);

    const imageData =
      this.context.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );

    this.templateImageData =
      new ImageData(
        new Uint8ClampedArray(
          imageData.data
        ),
        imageData.width,
        imageData.height
      );

    this.canvasImageData =
      new ImageData(
        new Uint8ClampedArray(
          imageData.data
        ),
        imageData.width,
        imageData.height
      );
  }

  getPixel(
    x: number,
    y: number
  ) {

    if (!this.templateImageData) {
      return null;
    }

    const px = Math.floor(x);

    const py = Math.floor(y);

    if (
      px < 0 ||
      py < 0 ||
      px >= this.canvas.width ||
      py >= this.canvas.height
    ) {
      return null;
    }

    const index = (py * this.canvas.width + px) * 4;

    const data = this.templateImageData.data;

    return {
      r: data[index],
      g: data[index + 1],
      b: data[index + 2],
      a: data[index + 3],
    };
  }

  getPixelRGBA(
    x: number,
    y: number
  ): number | null {

    if (!this.templateImageData) {
      return null;
    }

    const px = Math.floor(x);
    const py = Math.floor(y);

    if (
      px < 0 ||
      py < 0 ||
      px >= this.canvas.width ||
      py >= this.canvas.height
    ) {
      return null;
    }

    const index = (py * this.canvas.width + px) * 4;

    const data = this.templateImageData.data;

    return (
      (data[index] << 24) |
      (data[index + 1] << 16) |
      (data[index + 2] << 8) |
      data[index + 3]
    );
  }
}