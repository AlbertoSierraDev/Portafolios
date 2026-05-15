import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight, HiOutlinePhoto } from "react-icons/hi2";
import { getProjects } from "../../../api/projects";
import type { Project } from "../../types/project";

const accentStyles = [
  {
    border: "border-cyan-300/15",
    text: "text-cyan-300",
    shadow: "shadow-[0_0_35px_rgba(34,211,238,0.08)]",
    glow: "bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_35%)]",
    chip: "border-cyan-300/20 bg-cyan-300/10 text-cyan-300",
  },
  {
    border: "border-lime-400/15",
    text: "text-lime-400",
    shadow: "shadow-[0_0_35px_rgba(163,230,53,0.08)]",
    glow: "bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.1),transparent_35%)]",
    chip: "border-lime-400/20 bg-lime-400/10 text-lime-400",
  },
  {
    border: "border-fuchsia-300/15",
    text: "text-fuchsia-300",
    shadow: "shadow-[0_0_35px_rgba(232,121,249,0.08)]",
    glow: "bg-[radial-gradient(circle_at_bottom_left,rgba(232,121,249,0.1),transparent_35%)]",
    chip: "border-fuchsia-300/20 bg-fuchsia-300/10 text-fuchsia-300",
  },
];

function getProjectDescription(project: Project) {
  return (
    project.shortDescription ||
    "Proyecto desarrollado con foco en diseño, arquitectura y experiencia de usuario."
  );
}

function getProjectImage(project: Project) {
  return project.coverImage || "";
}

function getProjectTechnologies(project: Project) {
  return project.technologies || [];
}

export default function FeaturedProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        setIsLoading(true);
        setError("");

        const data = await getProjects();

        if (!isMounted) return;

        setProjects(data);
      } catch {
        if (!isMounted) return;

        setError("No se pudieron cargar los proyectos destacados.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredProjects = useMemo(() => {
    const featured = projects.filter((project) => project.featured);
    const notFeatured = projects.filter((project) => !project.featured);

    return [...featured, ...notFeatured].slice(0, 3);
  }, [projects]);

  return (
    <section className="relative px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.4em] text-cyan-300">
              Proyectos
            </p>

            <h2 className="text-4xl font-black uppercase text-white md:text-6xl">
              Construcciones recientes
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-8 text-white/70 md:text-lg">
              Una muestra real de proyectos cargados desde la API del
              portafolio, con acceso directo al detalle completo de cada uno.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-cyan-200/60 bg-cyan-200 px-7 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#0D0221] shadow-[0_0_24px_rgba(103,232,249,0.45)] transition hover:bg-cyan-100"
            >
              Ver todos
              <HiOutlineArrowRight className="text-lg" />
            </Link>
          </motion.div>
        </motion.div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[430px] animate-pulse rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl"
              />
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-[28px] border border-fuchsia-300/15 bg-white/[0.04] p-8 text-center backdrop-blur-xl shadow-[0_0_35px_rgba(232,121,249,0.08)]">
            <p className="text-base leading-8 text-white/70">{error}</p>

            <Link
              to="/projects"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-md border border-fuchsia-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-fuchsia-300 transition hover:bg-fuchsia-300/10"
            >
              Ir a proyectos
              <HiOutlineArrowRight className="text-lg" />
            </Link>
          </div>
        )}

        {!isLoading && !error && featuredProjects.length === 0 && (
          <div className="rounded-[28px] border border-cyan-300/15 bg-white/[0.04] p-8 text-center backdrop-blur-xl shadow-[0_0_35px_rgba(34,211,238,0.08)]">
            <p className="text-base leading-8 text-white/70">
              Todavía no hay proyectos disponibles para mostrar.
            </p>
          </div>
        )}

        {!isLoading && !error && featuredProjects.length > 0 && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {featuredProjects.map((project, index) => {
              const styles = accentStyles[index % accentStyles.length];
              const image = getProjectImage(project);
              const technologies = getProjectTechnologies(project).slice(0, 4);

              return (
                <motion.article
                  key={project._id || project.slug}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -8 }}
                  className={`relative overflow-hidden rounded-[28px] border ${styles.border} bg-white/[0.04] backdrop-blur-xl ${styles.shadow}`}
                >
                  <div className={`absolute inset-0 ${styles.glow}`} />

                  <div className="relative z-10 flex h-full flex-col">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="group relative block h-56 overflow-hidden border-b border-white/10 bg-black/20"
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={project.title}
                          className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <HiOutlinePhoto
                            className={`text-6xl ${styles.text} opacity-60`}
                          />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0221] via-[#0D0221]/20 to-transparent" />
                    </Link>

                    <div className="flex flex-1 flex-col p-7">
                      <div className="mb-5 flex items-start justify-between gap-4">
                        <h3 className="text-2xl font-semibold uppercase tracking-[0.08em] text-white">
                          {project.title}
                        </h3>

                        <p className="shrink-0 text-[11px] uppercase tracking-[0.35em] text-white/35">
                          0{index + 1}
                        </p>
                      </div>

                      <p className="mb-7 line-clamp-3 flex-1 text-base leading-8 text-white/70">
                        {getProjectDescription(project)}
                      </p>

                      {technologies.length > 0 && (
                        <div className="mb-7 flex flex-wrap gap-2">
                          {technologies.map((tech) => (
                            <span
                              key={tech}
                              className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${styles.chip}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link
                        to={`/projects/${project.slug}`}
                        className={`inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] ${styles.text} transition-all hover:gap-3`}
                      >
                        Ver detalle
                        <HiOutlineArrowRight className="text-lg" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
