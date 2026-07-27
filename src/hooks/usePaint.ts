"use client";

import { useEffect, useRef, useState } from "react";

import PaintCanvasEngine from "@/lib/paint/canvas/paintCanvas";
import PaintHistory from "@/lib/paint/canvas/paintHistory";
import ToolManager from "@/lib/paint/manager/paintToolManager";
import { createPaintSettings, PaintSettings } from "@/lib/paint/settings/settings";

import PenTool from "@/lib/paint/tools/brush/pen";
import HighlighterTool from "@/lib/paint/tools/brush/highlighter";
import EraserTool from "@/lib/paint/tools/brush/eraser";
import RectangleTool from "@/lib/paint/tools/shape/rectangle";
import LineTool from "@/lib/paint/tools/shape/line";
import CircleTool from "@/lib/paint/tools/shape/circle";
import FillTool from "@/lib/paint/tools/fill/fill";

import { Point, ToolType } from "@/types/paint";

export default function usePaint() {
  // ==============================
  // React State
  // ==============================

  const [tool, setToolState] = useState<ToolType>("pen");

  const [, forceRender] = useState(0);

  const repaint = () => { forceRender((v) => v + 1); };

  // ==============================
  // Ref
  // ==============================

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

  const engineRef = useRef<PaintCanvasEngine | null>(null);

  const historyRef = useRef(new PaintHistory());

  const toolManagerRef = useRef(new ToolManager());

  const settingsRef = useRef(createPaintSettings());

  const isDrawingRef = useRef(false);

  const cursorPointRef = useRef<Point | null>(null);
    

  // ==============================
  // Context
  // ==============================

  const createContext = () => {
    if (!engineRef.current) {
      throw new Error(
        "Canvas가 초기화되지 않았습니다."
      );
    }

    return {
      canvas: engineRef.current,
      history: historyRef.current,
      settings: settingsRef.current,
    };
  };

  const updateSettings = (
    updater: (
      settings: PaintSettings
    ) => void
  ) => {
    updater(settingsRef.current);

    repaint();
  };

  const updateBrushSettings = (
    updater: (
      brush: PaintSettings["brush"]
    ) => void
  ) => {
    updateSettings((settings) => {
      updater(settings.brush);
    });
  };

  const isBrushTool = (
    tool: ToolType
  ) => {
    return (
      tool === "pen" ||
      tool === "highlighter" ||
      tool === "eraser"
    );
  };

  // ==============================
  // Initialize
  // ==============================

  const initialize = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    if (!engineRef.current) {
      const overlayCanvas =
        overlayCanvasRef.current;

      if (!overlayCanvas) return;

      engineRef.current =
        new PaintCanvasEngine(
          canvas,
          overlayCanvas
        );

      engineRef.current.initialize();
    }

    if (
      toolManagerRef.current.size() ===
      0
    ) {
      toolManagerRef.current.registerTools({
        pen: new PenTool(),
        highlighter: new HighlighterTool(),
        eraser: new EraserTool(),
        rectangle: new RectangleTool(),
        line: new LineTool(),
        circle: new CircleTool(),
        bucket: new FillTool(),
      });

      toolManagerRef.current.setTool(
        "pen",
        createContext()
      );
    }

    if (
      historyRef.current.getLength() ===
      0
    ) {
      historyRef.current.commitAction(
        engineRef.current.getSnapshot()
      );
    }

    if (canvasRef.current) {
      const cursor =
        isBrushTool("pen")
          ? "none"
          : "default";

      canvasRef.current.style.cursor =
        cursor;

      overlayCanvasRef.current!.style.cursor =
        cursor;
    }
  };

  // ==============================
  // Settings
  // ==============================

  const setTool = (
    value: ToolType
  ) => {
    toolManagerRef.current.setTool(
      value,
      createContext()
    );

    if (canvasRef.current) {
      const cursor =
        isBrushTool(value)
          ? "none"
          : "default";

      canvasRef.current!.style.cursor = cursor;

      overlayCanvasRef.current!.style.cursor = cursor;
    }

    if (!isBrushTool(value)) {
      engineRef.current?.clearBrushCursor();
    }

    setToolState(value);
  };

  const setColor = (
    value: string
  ) => {
    updateBrushSettings((brush) => {
      brush.color = value;
    });
  };

  const setBrushSize = (
    value: number
  ) => {
    updateBrushSettings((brush) => {
      brush.size = value;
    });

    if (
      !engineRef.current ||
      !cursorPointRef.current ||
      !isBrushTool(tool)
    ) {
      return;
    }

    engineRef.current.clearBrushCursor();

    engineRef.current.drawBrushCursor(
      cursorPointRef.current.x,
      cursorPointRef.current.y,
      value
    );
  };

// ==============================
// STEP2
// Pointer Event
// ==============================

  const onPointerDown = (
    event: React.PointerEvent<HTMLCanvasElement>
  ) => {
    event.preventDefault();

    if (!engineRef.current) return;

    event.currentTarget.setPointerCapture(
      event.pointerId
    );

    const point =
      engineRef.current.getPoint(event);

    const tool =
      toolManagerRef.current.getCurrentTool();

    if (tool.isInstant?.()) {

      executeAction(() => {
        tool.onMouseDown(
          point,
          createContext()
        );
      });

      isDrawingRef.current = false;

      return;
    }

    isDrawingRef.current = true;

    // Drag Tool
    startAction();

    tool.onMouseDown(
      point,
      createContext()
    );
  };

  const onPointerMove = (
    event: React.PointerEvent<HTMLCanvasElement>
  ) => {
    event.preventDefault();

    if (!engineRef.current) return;

    const point = engineRef.current.getPoint(event);

    cursorPointRef.current = point;

    // ======================
    // Cursor는 항상 이동
    // ======================

    if (isBrushTool(tool)) {
      engineRef.current.clearBrushCursor();

      engineRef.current.drawBrushCursor(
        point.x,
        point.y,
        settingsRef.current.brush.size
      );
    } else {
      engineRef.current.clearBrushCursor();
    }

    // ======================
    // 그리는 중이 아니면 종료
    // ======================

    if (!isDrawingRef.current) {
      return;
    }

    toolManagerRef.current
      .getCurrentTool()
      ?.onMouseMove(
        point,
        createContext()
      );
  };

  const onPointerUp = (
    event: React.PointerEvent<HTMLCanvasElement>
  ) => {
    event.preventDefault();
    
    if (!engineRef.current) return;

    isDrawingRef.current = false;

    event.currentTarget.releasePointerCapture(
      event.pointerId
    );

    const point =
      engineRef.current.getPoint(event);

    const tool =
      toolManagerRef.current.getCurrentTool();

    tool.onMouseUp(
      point,
      createContext()
    );

    if (!tool.isInstant?.()) {
      finishAction();
    }
  };

  const onPointerLeave = (
    event: React.PointerEvent<HTMLCanvasElement>
  ) => {
    if (!engineRef.current) return;

    isDrawingRef.current = false;

    const tool =
      toolManagerRef.current.getCurrentTool();

    tool.onMouseUp(
      engineRef.current.getPoint(event),
      createContext()
    );

    if (!tool.isInstant?.()) {
      finishAction();
    }

    engineRef.current.clearBrushCursor();
    
    cursorPointRef.current = null;
  };

  // ==============================
  // STEP3
  // History
  // ==============================

  const undo = () => {
    if (!engineRef.current) return;

    const image =
      historyRef.current.undo();

    if (!image) return;

    engineRef.current.restore(
      image
    );
  };

  const redo = () => {
    if (!engineRef.current) return;

    const image =
      historyRef.current.redo();

    if (!image) return;

    engineRef.current.restore(
      image
    );
  };

  const executeAction = (
    action: () => void
  ) => {
    if (!engineRef.current) return;

    historyRef.current.beginAction();

    action();

    historyRef.current.commitAction(
      engineRef.current.getSnapshot()
    );
  };

  const startAction = () => {
    if (!engineRef.current) return;

    historyRef.current.beginAction();
  };

  const finishAction = () => {
    if (!engineRef.current) return;

    historyRef.current.commitAction(
      engineRef.current.getSnapshot()
    );
  };

  const clear = () => {
    executeAction(() => {
      engineRef.current?.clear();
    });
  };

  // ==============================
  // STEP4
  // Keyboard Shortcut
  // ==============================
  const updateKeyboardState = (
    key: "shift",
    value: boolean
  ) => {
    settingsRef.current.keyboard[key] =
      value;
  };

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Shift") {
        updateKeyboardState("shift", true);
      }

      const key = event.key.toLowerCase();

      const modifier =event.ctrlKey || event.metaKey;

      if (!modifier) return;

      if (key !== "z") return;

      event.preventDefault();

      if (event.shiftKey) {
        redo();
      } else {
        undo();
      }
    };

    const handleKeyUp = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Shift") {
        updateKeyboardState("shift", false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    window.addEventListener(
      "keyup",
      handleKeyUp
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
      window.removeEventListener(
        "keyup",
        handleKeyUp
      );
    };
  }, []);

  return {
    tool,
    color: settingsRef.current.brush.color,
    brushSize: settingsRef.current.brush.size,

    canvasRef,
    overlayCanvasRef,

    initialize,

    setTool,
    setColor,
    setBrushSize,

    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerLeave,

    undo,
    redo,
    clear,
  };
}