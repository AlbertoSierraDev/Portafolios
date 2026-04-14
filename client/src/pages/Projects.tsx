import { motion } from "framer-motion";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../../api/projects";
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
      } catch (err) {
        setError("Error al cargar proyectos");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen px-6 pb-20 pt-32 md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <p className="mt-20 text-center text-white">Cargando proyectos...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen px-6 pb-20 pt-32 md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <p className="mt-20 text-center text-red-400">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-6 pb-20 pt-32 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-14 text-center">
          <p className="mb-3 text-[11px] uppercase tracking-[0.4em] text-cyan-300">
            Showcase principal
          </p>
          <h1 className="text-4xl font-black uppercase text-white md:text-6xl">
            Proyectos
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
            Una selección de proyectos donde combino diseño, lógica y
            rendimiento para construir experiencias digitales sólidas y con
            identidad visual.
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-white/70">
            Todavía no hay proyectos publicados.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group overflow-hidden rounded-[28px] border border-cyan-300/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_35px_rgba(34,211,238,0.06)]"
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-cyan-400/10" />
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(13,2,33,0.85),transparent_55%)]" />
                </div>

                <div className="p-6">
                  <h2 className="mb-3 text-2xl font-bold uppercase text-white">
                    {project.title}
                  </h2>

                  <p className="mb-5 text-sm leading-7 text-white/70 md:text-base">
                    {project.shortDescription}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="flex items-center gap-2 rounded-md border border-cyan-200/50 bg-cyan-200 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#0D0221] shadow-[0_0_20px_rgba(103,232,249,0.35)] transition-all duration-150 hover:scale-[1.03]"
                    >
                      Ver detalles
                      <HiOutlineArrowUpRight className="text-base" />
                    </Link>

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
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
