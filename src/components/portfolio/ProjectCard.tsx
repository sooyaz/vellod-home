import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export default function ProjectCard({
  project,
  onClick,
}: ProjectCardProps) {
  return (
    <button
      onClick={() => onClick(project)}
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-[#111827]
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-blue-500/40
      "
    >
      <div className="aspect-video bg-slate-800" />

      <div className="space-y-5 p-6 text-left">
        <p className="text-xs uppercase tracking-[0.25em] text-blue-400">
          {project.category}
        </p>

        <h3 className="text-xl font-semibold">
          {project.title}
        </h3>

        <p className="text-sm leading-7 text-slate-400">
          {project.summary}
        </p>
      </div>
    </button>
  );
}