"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Project } from "@/types/project";

interface PortfolioModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function PortfolioModal({
  project,
  onClose,
}: PortfolioModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          absolute
          left-1/2
          top-1/2
          flex
          h-screen
          w-screen
          -translate-x-1/2
          -translate-y-1/2
          flex-col
          bg-[#0B1120]
          md:h-[90vh]
          md:w-[95vw]
          md:rounded-3xl
          xl:w-[90vw]
        "
      >
        {/* Header */}
        <header className="border-b border-white/10 bg-[#0f172a] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-2xl font-bold text-white">
                {project.title}
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-400">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-600/20 px-3 py-1 text-xs text-blue-300">
                  {project.category}
                </span>

                <span className="rounded-full bg-emerald-600/20 px-3 py-1 text-xs text-emerald-300">
                  {project.status}
                </span>

                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm transition hover:border-blue-500"
                >
                  GitHub
                </a>
              )}

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm transition hover:bg-blue-500"
                >
                  Demo
                </a>
              )}

              <button
                onClick={onClose}
                className="rounded-lg p-2 transition hover:bg-white/10"
              >
                <X size={22} />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 bg-slate-900 p-8 md:p-10">
          <iframe
            title={project.title}
            src={`/portfolio/${project.slug}`}
            loading="lazy"
            className="h-full w-full border-0"
          />
        </main>

      </div>
    </div>
  );
}