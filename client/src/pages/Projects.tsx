import { useEffect, useState } from "react";
import { getProjects } from "../api/projects";
import type { Project } from "../types/project";
import ContentState from "../components/ContentState";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch {
        setError("Error al cargar proyectos");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen px-4 pb-16 pt-28 sm:px-5 md:px-10 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-[1500px]">
          <ContentState kind="loading" message="Cargando proyectos..." />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen px-4 pb-16 pt-28 sm:px-5 md:px-10 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-[1500px]">
          <ContentState kind="error" message={error} />
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-4 pb-16 pt-28 sm:px-5 md:px-10 md:pb-20 md:pt-32">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-6 border-b border-white/10 pb-5 md:mb-7">
          <p className="mb-2 text-[9px] uppercase tracking-[0.28em] text-cyan-300 md:mb-3 md:text-[11px] md:tracking-[0.4em]">
            PORTFOLIO TÉCNICO
          </p>

          <h1 className="text-2xl font-black uppercase leading-tight text-white sm:text-3xl md:text-4xl">
            PROYECTOS & LABS
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
            Proyectos y laboratorios donde pongo en práctica desarrollo,
            sistemas, redes y ciberseguridad, aprendiendo a construir, analizar
            y resolver problemas reales.
          </p>
        </div>

        {projects.length === 0 ? (
          <ContentState kind="empty" message="Todavía no hay proyectos publicados." />
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project._id || project.slug} project={project} index={index} showGithub headingLevel="h2" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
