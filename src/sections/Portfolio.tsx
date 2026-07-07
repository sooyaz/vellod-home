"use client";

import { useState } from "react";

import Container from "@/components/shared/Container";
import ProjectCard from "@/components/portfolio/ProjectCard";
import PortfolioModal from "@/components/modal/PortfolioModal";

import { projects } from "@/data/projects";
import { Project } from "@/types/project";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  return (
    <>
      <section
        id="portfolio"
        className="py-24"
      >
        <Container>
          <div className="mb-14">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
              Portfolio
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Featured Projects
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={setSelectedProject}
              />
            ))}
          </div>
        </Container>
      </section>

      <PortfolioModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}