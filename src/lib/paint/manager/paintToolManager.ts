import { ToolType } from "@/types/paint";

import type { PaintContext, PaintTool } from "../tools/tool";

export default class ToolManager {
  private tools = new Map<
    ToolType,
    PaintTool
  >();

  private currentToolType: ToolType =
    "pen";

  /**
   * Tool 등록
   */
  register(
    type: ToolType,
    tool: PaintTool
  ) {
    this.tools.set(type, tool);
  }
  
  registerTools(
    tools: Partial<
      Record<ToolType, PaintTool>
    >
  ) {
    (
      Object.keys(tools) as ToolType[]
    ).forEach((type) => {
      const tool = tools[type];

      if (!tool) return;

      this.register(type, tool);
    });
  }

  /**
   * Tool 변경
   */
  setTool(
    type: ToolType,
    context: PaintContext
  ) {
    if (type === this.currentToolType) {
      return;
    }

    const current =
      this.tools.get(this.currentToolType);

    current?.onUnselect?.(context);

    const next =
      this.tools.get(type);

    if (!next) {
      throw new Error(
        `${type} Tool이 등록되지 않았습니다.`
      );
    }

    this.currentToolType = type;

    next.onSelect?.(context);
  }

  /**
   * 현재 Tool
   */
  getCurrentTool(): PaintTool {
    const tool =
      this.tools.get(
        this.currentToolType
      );

    if (!tool) {
      throw new Error(
        "현재 Tool이 존재하지 않습니다."
      );
    }

    return tool;
  }

  /**
   * 현재 Tool 종류
   */
  getCurrentToolType() {
    return this.currentToolType;
  }

  /**
   * Tool 존재 여부
   */
  hasTool(
    type: ToolType
  ) {
    return this.tools.has(type);
  }

  /**
   * 등록된 Tool 개수
   */
  size() {
    return this.tools.size;
  }

  /**
   * 초기화
   */
  clear() {
    this.tools.clear();
  }
}