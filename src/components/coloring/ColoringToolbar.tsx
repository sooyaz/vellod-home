"use client";

interface ColoringToolbarProps {
  tool: "brush" | "fill";
  onChangeTool: (
    tool: "brush" | "fill"
  ) => void;
}

export default function ColoringToolbar({
  tool,
  onChangeTool,
}: ColoringToolbarProps) {
  return (
    <div className="flex gap-2">

      <button
        onClick={() => onChangeTool("brush")}
        className={`
          px-4
          py-2
          rounded-lg
          border
          transition

          ${
            tool === "brush"
              ? "bg-blue-500 text-white"
              : "bg-white"
          }
        `}
      >
        브러시
      </button>

      <button
        onClick={() => onChangeTool("fill")}
        className={`
          px-4
          py-2
          rounded-lg
          border
          transition

          ${
            tool === "fill"
              ? "bg-blue-500 text-white"
              : "bg-white"
          }
        `}
      >
        채우기
      </button>

    </div>
  );
}