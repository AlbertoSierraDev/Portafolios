import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { getProjectBySlug } from "../api/projects";
import type { Project } from "../types/project";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function loadProject() {
      if (!slug) {
        setError("Slug no válido");
        setLoading(false);
        return;
      }

      try {
        const data = await getProjectBySlug(slug);
        setProject(data);
      } catch {
        setError("No se pudo cargar el proyecto");
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <section className="min-h-screen px-4 pb-16 pt-28 sm:px-5 md:px-10 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-sm text-white md:text-base">
            Cargando proyecto...
          </p>
        </div>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="min-h-screen px-4 pb-16 pt-28 sm:px-5 md:px-10 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-6 text-sm text-red-400 md:text-base">
            {error || "Proyecto no encontrado"}
          </p>

          <Link
            to="/projects"
            className="inline-flex rounded-md border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300 md:text-sm md:tracking-[0.2em]"
          >
            Volver a proyectos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-4 pb-16 pt-24 sm:px-5 md:px-10 md:pb-20 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 md:mb-8">
          <Link
            to="/projects"
            className="text-xs uppercase tracking-[0.18em] text-cyan-300/80 transition hover:text-cyan-300 md:text-sm md:tracking-[0.25em]"
          >
            ← Volver a proyectos
          </Link>
        </div>

        <div className="overflow-hidden rounded-[22px] border border-cyan-300/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_35px_rgba(34,211,238,0.06)] md:rounded-[32px]">
          <div className="relative h-[190px] sm:h-[240px] md:h-[420px]">
            <div className="absolute inset-0 bg-cyan-400/10" />

            {project.coverImage && (
              <img
                src={project.coverImage}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            )}

            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(13,2,33,0.9),transparent_60%)]" />
          </div>

          <div className="p-5 sm:p-6 md:p-10">
            <div className="mb-6 md:mb-8">
              <h1 className="mb-3 break-words text-2xl font-black uppercase leading-tight text-white sm:text-3xl md:mb-4 md:text-6xl">
                {project.title}
              </h1>

              <p className="max-w-3xl text-[13px] leading-6 text-white/70 sm:text-sm md:text-base md:leading-7">
                {project.shortDescription}
              </p>
            </div>

            <div className="mb-6 flex flex-wrap gap-2 md:mb-8 md:gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-cyan-300 md:px-4 md:py-2 md:text-[10px] md:tracking-[0.2em]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mb-12">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-cyan-200/50 bg-cyan-200 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0D0221] shadow-[0_0_20px_rgba(103,232,249,0.35)] transition-all duration-150 hover:scale-[1.03] sm:w-auto md:text-xs md:tracking-[0.24em]"
                >
                  Ver demo
                  <HiOutlineArrowUpRight className="text-base" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-md border border-white/15 bg-white/5 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 transition-all duration-150 hover:bg-white/10 hover:text-white sm:w-auto md:text-xs md:tracking-[0.24em]"
                >
                  GitHub
                  <FaGithub className="text-sm" />
                </a>
              )}
            </div>

            <div className="grid gap-5 lg:grid-cols-4">
              <div className="rounded-[22px] border border-cyan-300/20 bg-cyan-300/[0.06] p-5 shadow-[0_0_30px_rgba(34,211,238,0.08)] md:rounded-[28px] md:p-8 lg:col-span-4">
                <h2 className="mb-3 text-xl font-bold uppercase text-white md:mb-4 md:text-3xl">
                  Descripción
                </h2>

                <p className="text-[13px] leading-7 text-white/80 sm:text-sm md:text-lg md:leading-9">
                  {project.fullDescription}
                </p>
              </div>

              <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-5 md:rounded-[24px] md:p-6 lg:col-span-2">
                <h2 className="mb-4 text-lg font-bold uppercase text-white md:text-xl">
                  Retos
                </h2>

                {project.challenges.length > 0 ? (
                  <ul className="space-y-3 text-[13px] leading-6 text-white/75 md:text-sm md:leading-7">
                    {project.challenges.map((challenge, index) => (
                      <li
                        key={`${challenge}-${index}`}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                      >
                        {challenge}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-white/50">
                    No hay retos añadidos.
                  </p>
                )}
              </div>

              <div className="rounded-[20px] border border-cyan-300/10 bg-cyan-300/[0.05] p-5 md:rounded-[24px] md:p-6 lg:col-span-2">
                <h2 className="mb-4 text-lg font-bold uppercase text-white md:text-xl">
                  Soluciones
                </h2>

                {project.solutions.length > 0 ? (
                  <ul className="space-y-3 text-[13px] leading-6 text-white/75 md:text-sm md:leading-7">
                    {project.solutions.map((solution, index) => (
                      <li
                        key={`${solution}-${index}`}
                        className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.05] px-4 py-3"
                      >
                        {solution}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-white/50">
                    No hay soluciones añadidas.
                  </p>
                )}
              </div>
            </div>

            {project.gallery.length > 0 && (
              <div className="mt-10 md:mt-14">
                <h2 className="mb-5 text-xl font-bold uppercase text-white md:mb-6 md:text-2xl">
                  Galería
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                  {project.gallery.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(image)}
                      className="group overflow-hidden rounded-[20px] border border-cyan-300/10 bg-white/[0.03] text-left transition-all duration-300 hover:scale-[1.02] hover:border-cyan-300/30 hover:shadow-[0_0_25px_rgba(34,211,238,0.12)] md:rounded-[24px]"
                    >
                      <img
                        src={image}
                        alt={`${project.title} ${index + 1}`}
                        className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-60 md:h-72"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/20 md:right-6 md:top-6 md:text-sm"
          >
            Cerrar
          </button>

          <img
            src={selectedImage}
            alt="Imagen ampliada del proyecto"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[80vh] max-w-[92vw] rounded-[20px] border border-cyan-300/20 object-contain shadow-[0_0_45px_rgba(34,211,238,0.18)] md:max-h-[85vh] md:max-w-[95vw] md:rounded-[28px]"
          />
        </div>
      )}
    </section>
  );
}
