const MAX_HISTORY = 50;

export default class PaintHistory {
  private history: ImageData[] = [];

  private index = -1;

  /**
   * 새로운 Action 시작
   * 현재 Canvas 상태(ImageData)를 저장
   */
  beginAction() {
    // Undo 이후 새 작업이면
    // Redo 제거
    this.history = this.history.slice(
      0,
      this.index + 1
    );
  }
  
  /**
   * Action 종료
   * 현재 Canvas 상태 저장
   */
  commitAction(
    image: ImageData
  ) {
    const snapshot = this.clone(image);

    this.history.push(snapshot);

    if (
      this.history.length >
      MAX_HISTORY
    ) {
      this.history.shift();
    }

    this.index =
      this.history.length - 1;
  }

  /**
   * Undo
   */
  undo(): ImageData | null {
    if (!this.canUndo()) {
      return null;
    }

    this.index--;

    return this.clone(this.history[this.index]);
  }

  /**
   * Redo
   */
  redo(): ImageData | null {
    if (!this.canRedo()) {
      return null;
    }

    this.index++;

    return this.clone(this.history[this.index]);
  }

  /**
   * History 초기화
   */
  clear() {
    this.history = [];
    this.index = -1;
  }

  /**
   * Undo 가능 여부
   */
  canUndo() {
    return this.index > 0;
  }

  /**
   * Redo 가능 여부
   */
  canRedo() {
    return (
      this.index <
      this.history.length - 1
    );
  }

  /**
   * History 개수
   */
  getLength() {
    return this.history.length;
  }

  /**
   * 현재 History 위치
   */
  getIndex() {
    return this.index;
  }

  /**
   * ImageData 복사
   */
  private clone(
    image: ImageData
  ): ImageData {
    return new ImageData(
      new Uint8ClampedArray(image.data),
      image.width,
      image.height
    );
  }
}