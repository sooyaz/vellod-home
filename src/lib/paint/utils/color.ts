export interface RGBAColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export function hexToRGBA(
  hex: string
): RGBAColor {

  const value =
    hex.replace("#", "");

  const r = parseInt(
    value.substring(0, 2),
    16
  );

  const g = parseInt(
    value.substring(2, 4),
    16
  );

  const b = parseInt(
    value.substring(4, 6),
    16
  );

  return {
    r,
    g,
    b,
    a: 255,
  };
}

export function rgbaToHex(
  color: RGBAColor
) {
  const toHex = (
    value: number
  ) =>
    value
      .toString(16)
      .padStart(2, "0");

  return (
    "#" +
    toHex(color.r) +
    toHex(color.g) +
    toHex(color.b)
  );
}

export function colorDistance(
  a: RGBAColor,
  b: RGBAColor
) {
  return Math.sqrt(

    (a.r-b.r) ** 2 +

    (a.g-b.g) ** 2 +

    (a.b-b.b) ** 2

  );
}