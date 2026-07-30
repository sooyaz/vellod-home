import type { ColoringCategory, ColoringTemplate } from "./types";

import { aTemplates } from "./templates/a";
import { bTemplates } from "./templates/b";

export const coloringCategories: ColoringCategory[] = [
  {
    id: "a",
    title: "A",
    description: "Apple, Ant ...",
    thumbnail: "/coloring/templates/a/apple.png",
  },
  {
    id: "b",
    title: "B",
    description: "Bus, Bear ...",
    thumbnail: "/coloring/templates/b/bus.png",
  },
];

const templateRepository: Record<string, ColoringTemplate[]> = {
  a: aTemplates,
  b: bTemplates,
};

export function getTemplates(category: string): ColoringTemplate[] {
  return templateRepository[category.toLowerCase()] ?? [];
}

export function getTemplate(id: string): ColoringTemplate | undefined {
  return Object.values(templateRepository)
    .flat()
    .find((item) => item.id === id);
}