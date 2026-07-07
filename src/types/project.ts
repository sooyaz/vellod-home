export type ProjectCategory =
  | "portfolio"
  | "landing"
  | "utility"
  | "game"
  | "admin"
  | "ai";

export type ProjectStatus =
  | "completed"
  | "developing"
  | "archived";

export interface Project {
  id: number;

  slug: string;

  title: string;

  summary: string;

  description: string;

  thumbnail: string;

  images: string[];

  category: ProjectCategory;

  techStack: string[];

  github?: string;

  demo?: string;

  featured: boolean;

  status: ProjectStatus;

  startDate: string;

  endDate?: string;

  order: number;
}