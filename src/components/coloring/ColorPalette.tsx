"use client";

import { COLORS } from "@/lib/coloring/constants";

interface ColorPaletteProps {
  color: string;
  onChangeColor: (color: string) => void;
}

export default function ColorPalette({
  color,
  onChangeColor,
}: ColorPaletteProps) {
  return (
    <div className="flex flex-wrap gap-3">

      {COLORS.map((item) => (

        <button
          key={item}
          onClick={() => onChangeColor(item)}
          className={`
            w-10
            h-10
            rounded-full
            transition
            border-2

            ${
              color === item
                ? "border-blue-500 scale-110"
                : "border-gray-300"
            }
          `}
          style={{
            backgroundColor: item,
          }}
        />

      ))}

    </div>
  );
}