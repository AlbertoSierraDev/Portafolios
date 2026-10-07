import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { HiOutlineArrowUpRight, HiOutlineArrowLeft, HiOutlineXMark } from "react-icons/hi2";
import ContentState from "../components/ContentState";
import { visual } from "../styles/visual";
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
        <div className="mx-auto max-w-[1500px]">
          <ContentState kind="loading" message="Cargando proyecto..." />
        </div>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="min-h-screen px-4 pb-16 pt-28 sm:px-5 md:px-10 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-[1500px] text-center">
          <ContentState kind="error" message={error || "Proyecto no encontrado"} />

          <Link
            to="/projects"
            className={`${visual.button} mt-5`}
          >
            Volver a proyectos
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-4 pb-16 pt-24 sm:px-5 md:px-10 md:pb-20 md:pt-32">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-6 md:mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 rounded-sm text-sm text-cyan-300/80 outline-none transition hover:text-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <HiOutlineArrowLeft aria-hidden="true" /> Volver a proyectos
          </Link>
        </div>

        <div className="min-w-0">
          <div className="relative h-56 overflow-hidden rounded-lg border border-white/10 bg-black/20 sm:h-72 md:h-[420px]">
            <div className="absolute inset-0 bg-cyan-400/10" />

            {project.coverImage && (
              <img
                src={project.coverImage}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            )}

          </div>

          <div className="pt-6 md:pt-8">
            <div className="mb-6 md:mb-8">
              <h1 className="mb-3 break-words text-2xl font-black uppercase leading-tight text-white sm:text-3xl md:mb-4 md:text-4xl">
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
                  className="max-w-full break-words rounded border border-cyan-300/20 bg-cyan-300/10 px-2 py-1 text-xs font-medium text-cyan-300"
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
                  className={`${visual.button} w-full sm:w-auto`}
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
                  className={`${visual.secondaryButton} w-full sm:w-auto`}
                >
                  GitHub
                  <FaGithub className="text-sm" />
                </a>
              )}
            </div>

            <div className="grid gap-5 lg:grid-cols-4">
              <div className="border-t border-white/10 py-6 lg:col-span-4">
                <h2 className="mb-3 text-lg font-semibold text-white md:mb-4 md:text-xl">
                  Descripción
                </h2>

                <p className="whitespace-pre-line text-sm leading-7 text-white/70 md:text-base md:leading-8">
                  {project.fullDescription}
                </p>
              </div>

              <div className="min-w-0 border-l border-white/15 pl-5 lg:col-span-2">
                <h2 className="mb-4 text-lg font-bold uppercase text-white md:text-xl">
                  Retos
                </h2>

                {project.challenges.length > 0 ? (
                  <ul className="space-y-3 text-[13px] leading-6 text-white/75 md:text-sm md:leading-7">
                    {project.challenges.map((challenge, index) => (
                      <li
                        key={`${challenge}-${index}`}
                        className="break-words border-b border-white/10 pb-3"
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

              <div className="min-w-0 border-l border-cyan-300/25 pl-5 lg:col-span-2">
                <h2 className="mb-4 text-lg font-bold uppercase text-white md:text-xl">
                  Soluciones
                </h2>

                {project.solutions.length > 0 ? (
                  <ul className="space-y-3 text-[13px] leading-6 text-white/75 md:text-sm md:leading-7">
                    {project.solutions.map((solution, index) => (
                      <li
                        key={`${solution}-${index}`}
                        className="break-words border-b border-white/10 pb-3"
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
                      aria-label={`Ampliar imagen ${index + 1} de ${project.title}`}
                      className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] text-left transition-colors hover:border-cyan-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    >
                      <img
                        src={image}
                        alt={`${project.title} ${index + 1}`}
                        className="h-48 w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025] motion-reduce:transition-none sm:h-60 md:h-72"
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
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="Cerrar imagen ampliada"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-md border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 md:right-6 md:top-6"
          >
            <HiOutlineXMark className="text-xl" />
          </button>

          <img
            src={selectedImage}
            alt="Imagen ampliada del proyecto"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[80vh] max-w-[92vw] rounded-lg border border-cyan-300/20 object-contain shadow-2xl md:max-h-[85vh] md:max-w-[95vw] "
          />
        </div>
      )}
    </section>
  );
}
