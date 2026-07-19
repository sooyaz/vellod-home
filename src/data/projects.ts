import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: 1,

    slug: "calculator",

    title: "판매가 계산기",

    summary: "판매가 계산 및 수익 계산",

    description:
      "원가, 광고비, 수수료 등을 계산하는 웹 계산기",

    thumbnail: "",

    images: [],

    category: "utility",

    techStack: [
      "Next.js",
      "React",
      "TypeScript"
    ],

    github: "",

    demo: "",

    featured: true,

    status: "developing",

    startDate: "2026-07",

    order: 1,
},
  {
    id: 2,

    slug: "paint",

    title: "Canvas Paint",

    summary: "Canvas 기반 그림판",

    description:
      "Canvas API를 활용한 그림판으로 펜, 형광펜, 지우개, 도형, Undo/Redo 등을 구현한 웹 애플리케이션",

    thumbnail: "",

    images: [],

    category: "utility",

    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Canvas API"
    ],

    github: "",

    demo: "",

    featured: true,

    status: "developing",

    startDate: "2026-07",

    order: 2,
  },
  {
    id: 3,

    slug: "canvas-rpg",

    title: "Canvas RPG",

    summary: "HTML5 Canvas 게임",

    description:
      "Canvas 기반 RPG 게임 프로젝트",

    thumbnail: "",

    images: [],

    category: "game",

    techStack: ["TypeScript"],

    github: "",

    demo: "",

    featured: false,

    status: "developing",

    startDate: "2026-02",

    order: 3,
  },
];