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

    slug: "coloring",

    title: "Coloring",

    summary: "브러시와 채우기를 이용한 색칠놀이",

    description:
      "Canvas 기반 색칠놀이 프로젝트로 브러시와 채우기 기능을 직접 구현한 교육용 콘텐츠",

    thumbnail: "",

    images: [],

    category: "education",

    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Canvas API"
    ],

    github: "",

    demo: "/portfolio/coloring",

    featured: true,

    status: "completed",

    startDate: "2026-07",

    order: 3,
  },
  {
    id: 4,

    slug: "wordgame",

    title: "영단어 카드게임",

    summary: "드래그 앤 드롭 영단어 맞추기",

    description:
        "영어 단어를 카드 드래그 방식으로 맞추는 교육용 게임입니다. 카드 드래그, 드롭 판정, 복귀 애니메이션, 셔플 알고리즘 등을 직접 구현했습니다.",

    thumbnail: "",

    images: [],

    category: "game",

    techStack: [
        "Next.js",
        "React",
        "TypeScript"
    ],

    github: "",

    demo: "/portfolio/wordgame",

    featured: true,

    status: "developing",

    startDate: "2026-07",

    order: 4,
  },
];