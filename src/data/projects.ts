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

    slug: "lunch-roulette",

    title: "Lunch Roulette",

    summary: "점심 메뉴 추천",

    description:
      "점심 메뉴를 랜덤으로 추천하는 웹 서비스",

    thumbnail: "",

    images: [],

    category: "utility",

    techStack: ["React"],

    github: "",

    demo: "",

    featured: false,

    status: "completed",

    startDate: "2025-12",

    endDate: "2026-01",

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