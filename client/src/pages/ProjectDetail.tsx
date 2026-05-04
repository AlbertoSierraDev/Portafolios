import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { getProjectBySlug } from "../../api/projects";
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
      } catch (err) {
        setError("No se pudo cargar el proyecto");
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <section className="min-h-screen px-6 pb-20 pt-32 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-white">Cargando proyecto...</p>
        </div>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="min-h-screen px-6 pb-20 pt-32 md:px-10">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-6 text-red-400">
            {error || "Proyecto no encontrado"}
          </p>
          <Link
            to="/projects"
            className="inline-flex rounded-md border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300"
          >
            Volver a proyectos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-6 pb-20 pt-32 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            to="/projects"
            className="text-sm uppercase tracking-[0.25em] text-cyan-300/80 transition hover:text-cyan-300"
          >
            ← Volver a proyectos
          </Link>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-cyan-300/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_35px_rgba(34,211,238,0.06)]">
          <div className="relative h-[260px] md:h-[420px]">
            <div className="absolute inset-0 bg-cyan-400/10" />
            <img
              src={project.coverImage}
              alt={project.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(13,2,33,0.88),transparent_55%)]" />
          </div>

          <div className="p-6 md:p-10">
            <div className="mb-8">
              <h1 className="mb-4 text-4xl font-black uppercase text-white md:text-6xl">
                {project.title}
              </h1>

              <p className="max-w-3xl text-sm leading-7 text-white/70 md:text-base">
                {project.shortDescription}
              </p>
            </div>

            <div className="mb-8 flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mb-12 flex flex-wrap gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-md border border-cyan-200/50 bg-cyan-200 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#0D0221] shadow-[0_0_20px_rgba(103,232,249,0.35)] transition-all duration-150 hover:scale-[1.03]"
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
                  className="flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/80 transition-all duration-150 hover:bg-white/10 hover:text-white"
                >
                  GitHub
                  <FaGithub className="text-sm" />
                </a>
              )}
            </div>

            <div className="grid gap-6 lg:grid-cols-4 lg:gap-5">
              <div className="rounded-[28px] border border-cyan-300/20 bg-cyan-300/[0.06] p-6 shadow-[0_0_30px_rgba(34,211,238,0.08)] lg:col-span-4 lg:p-8">
                <h2 className="mb-4 text-2xl font-bold uppercase text-white md:text-3xl">
                  Descripción
                </h2>

                <p className="text-sm leading-8 text-white/80 md:text-lg md:leading-9">
                  {project.fullDescription}
                </p>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 lg:col-span-2 lg:p-6">
                <h2 className="mb-4 text-xl font-bold uppercase text-white">
                  Retos
                </h2>

                {project.challenges.length > 0 ? (
                  <ul className="space-y-3 text-sm leading-7 text-white/75">
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

              <div className="rounded-[24px] border border-cyan-300/10 bg-cyan-300/[0.05] p-5 lg:col-span-2 lg:p-6">
                <h2 className="mb-4 text-xl font-bold uppercase text-white">
                  Soluciones
                </h2>

                {project.solutions.length > 0 ? (
                  <ul className="space-y-3 text-sm leading-7 text-white/75">
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
              <div className="mt-14">
                <h2 className="mb-6 text-2xl font-bold uppercase text-white">
                  Galería
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                  {project.gallery.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(image)}
                      className="group overflow-hidden rounded-[24px] border border-cyan-300/10 bg-white/[0.03] text-left transition-all duration-300 hover:scale-[1.02] hover:border-cyan-300/30 hover:shadow-[0_0_25px_rgba(34,211,238,0.12)]"
                    >
                      <img
                        src={image}
                        alt={`${project.title} ${index + 1}`}
                        className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
            className="absolute right-6 top-6 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/20"
          >
            Cerrar
          </button>

          <img
            src={selectedImage}
            alt="Imagen ampliada del proyecto"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85vh] max-w-[95vw] rounded-[28px] border border-cyan-300/20 object-contain shadow-[0_0_45px_rgba(34,211,238,0.18)]"
          />
        </div>
      )}
    </section>
  );
}
