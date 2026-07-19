export default class PaintCanvasEngine {
  private ctx: CanvasRenderingContext2D;
  private overlayCanvas: HTMLCanvasElement;
  private overlayCtx: CanvasRenderingContext2D;
  private preview = false;

  constructor(
    private canvas: HTMLCanvasElement,
    overlayCanvas: HTMLCanvasElement
  ) {
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error(
        "Canvas Context를 생성할 수 없습니다."
      );
    }

    const overlayCtx =
      overlayCanvas.getContext("2d");

    if (!overlayCtx) {
      throw new Error(
        "Overlay Context를 생성할 수 없습니다."
      );
    }

    this.ctx = ctx;

    this.overlayCanvas =
      overlayCanvas;

    this.overlayCtx =
      overlayCtx;
  }

  /**
   * Canvas 초기화
   */
  initialize() {
    const parent = this.canvas.parentElement;

    if (!parent) return;

    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight;

    this.overlayCanvas.width = parent.clientWidth;
    this.overlayCanvas.height = parent.clientHeight;

    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    this.overlayCtx.lineCap = "round";
    this.overlayCtx.lineJoin = "round";
  }

  /**
   * Canvas 크기 변경
   */
  resize() {
    const snapshot = this.getSnapshot();

    const parent = this.canvas.parentElement;

    if (!parent) return;

    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight;

    this.overlayCanvas.width = parent.clientWidth;

    this.overlayCanvas.height = parent.clientHeight;

    this.restore(snapshot);
  }

  /**
   * 전체 삭제
   */
  clear() {
    this.ctx.fillStyle = "#ffffff";

    this.ctx.fillRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  /**
   * 현재 Canvas 저장
   */
  getSnapshot() {
    return this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  /**
   * Canvas 복원
   */
  restore(
    image: ImageData
  ) {
    this.ctx.putImageData(
      image,
      0,
      0
    );
  }

  /**
   * 마우스 좌표
   */
  getPoint(
    event:
      | MouseEvent
      | PointerEvent
      | React.MouseEvent<HTMLCanvasElement>
  ) {
    const rect =
      this.canvas.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  /**
   * 왼쪽 버튼 여부
   */
  isPrimaryButton(
    event:
      | MouseEvent
      | PointerEvent
      | React.MouseEvent<HTMLCanvasElement>
  ) {
    return event.button === 0;
  }

  /**
   * resize 대응
   */
  getSize() {
    return {
      width: this.canvas.width,
      height: this.canvas.height,
    };
  }

  /**
   * Context 반환
   */
  getActiveContext() {
    return this.preview
      ? this.overlayCtx
      : this.ctx;
  }

  getMainContext() {
    return this.ctx;
  }

  getOverlayContext() {
    return this.overlayCtx;
  }

  /**
   * Canvas 반환
   */
  getCanvas() {
    return this.canvas;
  }
  clearPreview() {
    this.overlayCtx.clearRect(
      0,
      0,
      this.overlayCanvas.width,
      this.overlayCanvas.height
    );
  }

  commitPreview() {
    if (!this.preview) {
      return;
    }

    this.ctx.drawImage(
      this.overlayCanvas,
      0,
      0
    );

    this.clearPreview();

    this.preview = false;
  }
  cancelPreview() {
    this.clearPreview();

    this.preview = false;
  }


  beginPreview() {
    this.preview = true;

    this.clearPreview();
  }

  drawBrushCursor(
    x: number,
    y: number,
    brushSize: number
  ) {
    if (this.preview) {
      return;
    }

    const radius =
      Math.max(brushSize / 2, 2);

    this.overlayCtx.save();

    this.overlayCtx.beginPath();

    this.overlayCtx.arc(
      x,
      y,
      radius,
      0,
      Math.PI * 2
    );

    // 바깥 흰색
    this.overlayCtx.strokeStyle = "#ffffff";
    this.overlayCtx.lineWidth = 3;
    this.overlayCtx.stroke();

    // 안쪽 검은색
    this.overlayCtx.strokeStyle = "#111111";
    this.overlayCtx.lineWidth = 1;
    this.overlayCtx.stroke();

    this.overlayCtx.restore();
  }

  clearBrushCursor() {
    this.overlayCtx.clearRect(
      0,
      0,
      this.overlayCanvas.width,
      this.overlayCanvas.height
    );
  }
}