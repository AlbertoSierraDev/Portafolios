import { motion } from "framer-motion";
import { HiOutlineArrowUpRight, HiOutlinePhoto } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../api/projects";
import type { Project } from "../types/project";

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
          <p className="mt-16 text-center text-sm text-white md:mt-20 md:text-base">
            Cargando proyectos...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen px-4 pb-16 pt-28 sm:px-5 md:px-10 md:pb-20 md:pt-32">
        <div className="mx-auto max-w-[1500px]">
          <p className="mt-16 text-center text-sm text-red-400 md:mt-20 md:text-base">
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-4 pb-16 pt-28 sm:px-5 md:px-10 md:pb-20 md:pt-32">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-2 text-[9px] uppercase tracking-[0.28em] text-cyan-300 md:mb-3 md:text-[11px] md:tracking-[0.4em]">
            PORTFOLIO TÉCNICO
          </p>

          <h1 className="text-3xl font-black uppercase text-white sm:text-4xl md:text-6xl">
            PROYECTOS & LABS
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-[13px] leading-6 text-white/65 sm:text-sm md:mt-5 md:text-base md:leading-7">
            Proyectos y laboratorios donde pongo en práctica desarrollo,
            sistemas, redes y ciberseguridad, aprendiendo a construir, analizar
            y resolver problemas reales.
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-sm text-white/70 md:text-base">
            Todavía no hay proyectos publicados.
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-8">
            {projects.map((project, index) => (
              <motion.article
                key={project._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group overflow-hidden rounded-[22px] border border-cyan-300/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.06)] md:rounded-[28px] md:shadow-[0_0_35px_rgba(34,211,238,0.06)]"
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="relative block h-44 overflow-hidden sm:h-52 md:h-56"
                >
                  <div className="absolute inset-0 bg-cyan-400/10" />

                  {project.coverImage ? (
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-black/20">
                      <HiOutlinePhoto className="text-5xl text-cyan-300/60 md:text-6xl" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(13,2,33,0.85),transparent_55%)]" />
                </Link>

                <div className="p-5 md:p-6">
                  <h2 className="mb-3 break-words text-xl font-bold uppercase leading-tight text-white md:text-2xl">
                    {project.title}
                  </h2>

                  <p className="mb-5 line-clamp-3 text-[13px] leading-6 text-white/70 sm:text-sm md:text-base md:leading-7">
                    {project.shortDescription}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-cyan-300 md:px-3 md:text-[10px] md:tracking-[0.2em]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="flex w-full items-center justify-center gap-2 rounded-md border border-cyan-200/50 bg-cyan-200 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0D0221] shadow-[0_0_20px_rgba(103,232,249,0.35)] transition-all duration-150 hover:scale-[1.03] sm:w-auto md:text-xs md:tracking-[0.24em]"
                    >
                      Ver detalles
                      <HiOutlineArrowUpRight className="text-base" />
                    </Link>

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
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
