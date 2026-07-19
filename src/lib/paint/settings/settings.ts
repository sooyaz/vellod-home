export interface BrushSettings {
  /**
   * 브러시 색상
   */
  color: string;
  /**
   * 브러시 크기
   */
  size: number;
  /**
   * 투명도
   */
  opacity: number;
}

export interface ShapeSettings {
  /**
   * 내부 채우기
   */
  fill: boolean;
  /**
   * 외곽선 사용
   */
  stroke: boolean;
}

export interface FillSettings {
  /**
   * 색상 허용 오차
   */
  tolerance: number;
}

export interface TextSettings {
  /**
   * 글꼴 크기
   */
  fontSize: number;
  /**
   * 글꼴
   */
  fontFamily: string;
  bold: boolean;
  italic: boolean;
}

export interface KeyboardState {
  shift: boolean;
}

export interface PaintSettings {
  brush: BrushSettings;
  shape: ShapeSettings;
  fill: FillSettings;
  text: TextSettings;
  keyboard: KeyboardState;
}

export const defaultPaintSettings: PaintSettings = {
  brush: {
    color: "#000000",
    size: 5,
    opacity: 1,
  },

  fill: {
    tolerance: 256,
  },

  shape: {
    fill: false,
    stroke: true,
  },

  text: {
    fontSize: 16,
    fontFamily: "sans-serif",
    bold: false,
    italic: false,
  },

  keyboard: {
    shift: false,
  }
};

/**
 * 설정 복사
 */
export function createPaintSettings(): PaintSettings {
  return structuredClone(
    defaultPaintSettings
  );
}