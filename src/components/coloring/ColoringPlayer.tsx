"use client";

import { useState } from "react";

import type { ColoringTemplate } from "@/data/coloring/types";

import ColoringToolbar from "./ColoringToolbar";
import ColorPalette from "./ColorPalette";
import ColoringCanvas from "./ColoringCanvas";

interface Props {
  template: ColoringTemplate;
}

export default function ColoringPlayer({
  template,
}: Props) {

  const [tool, setTool] = useState<"brush" | "fill">("brush");

  const [color, setColor] = useState("#F44336");

  return (
    <main
      style={{
        padding: 40,
      }}
    >

      <h1>
        {template.title}
      </h1>

      <ColoringToolbar
        tool={tool}
        onChangeTool={setTool}
      />

      <div
        style={{
          marginTop: 16,
          marginBottom: 24,
        }}
      >
        <ColorPalette
          color={color}
          onChangeColor={setColor}
        />
      </div>

      <ColoringCanvas
        template={template}
        tool={tool}
        color={color}
      />

    </main>
  );
}