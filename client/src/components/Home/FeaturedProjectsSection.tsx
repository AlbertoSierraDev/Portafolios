import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight, HiOutlinePhoto } from "react-icons/hi2";
import { getProjects } from "../../api/projects";
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
    <section className="relative px-4 py-12 sm:px-5 sm:py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-8 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between md:gap-6"
        >
          <div>
            <p className="mb-2 text-[9px] uppercase tracking-[0.28em] text-cyan-300 md:mb-3 md:text-[11px] md:tracking-[0.4em]">
              Proyectos
            </p>

            <h2 className="text-2xl font-black uppercase leading-tight text-white sm:text-3xl md:text-6xl">
              PROYECTOS & LABORATORIOS
            </h2>

            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-white/70 sm:text-sm md:mt-5 md:text-lg md:leading-8">
              Una muestra real de proyectos , con acceso directo al detalle
              completo de cada uno.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="w-full sm:w-auto"
          >
            <Link
              to="/projects"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-cyan-200/60 bg-cyan-200 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0D0221] shadow-[0_0_24px_rgba(103,232,249,0.45)] transition hover:bg-cyan-100 sm:w-auto md:px-7 md:py-4 md:text-sm md:tracking-[0.28em]"
            >
              Ver todos
              <HiOutlineArrowRight className="text-base md:text-lg" />
            </Link>
          </motion.div>
        </motion.div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[320px] animate-pulse rounded-[22px] border border-white/10 bg-white/[0.04] backdrop-blur-xl md:h-[430px] md:rounded-[28px]"
              />
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-[22px] border border-fuchsia-300/15 bg-white/[0.04] p-5 text-center backdrop-blur-xl shadow-[0_0_35px_rgba(232,121,249,0.08)] md:rounded-[28px] md:p-8">
            <p className="text-sm leading-7 text-white/70 md:text-base md:leading-8">
              {error}
            </p>

            <Link
              to="/projects"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-md border border-fuchsia-300 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-300 transition hover:bg-fuchsia-300/10 md:mt-6 md:px-6 md:text-sm md:tracking-[0.22em]"
            >
              Ir a proyectos
              <HiOutlineArrowRight className="text-base md:text-lg" />
            </Link>
          </div>
        )}

        {!isLoading && !error && featuredProjects.length === 0 && (
          <div className="rounded-[22px] border border-cyan-300/15 bg-white/[0.04] p-5 text-center backdrop-blur-xl shadow-[0_0_35px_rgba(34,211,238,0.08)] md:rounded-[28px] md:p-8">
            <p className="text-sm leading-7 text-white/70 md:text-base md:leading-8">
              Todavía no hay proyectos disponibles para mostrar.
            </p>
          </div>
        )}

        {!isLoading && !error && featuredProjects.length > 0 && (
          <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-3">
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
                  className={`relative overflow-hidden rounded-[22px] border ${styles.border} bg-white/[0.04] backdrop-blur-xl ${styles.shadow} md:rounded-[28px]`}
                >
                  <div className={`absolute inset-0 ${styles.glow}`} />

                  <div className="relative z-10 flex h-full flex-col">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="group relative block h-44 overflow-hidden border-b border-white/10 bg-black/20 sm:h-52 md:h-56"
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
                            className={`text-5xl ${styles.text} opacity-60 md:text-6xl`}
                          />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0221] via-[#0D0221]/20 to-transparent" />
                    </Link>

                    <div className="flex flex-1 flex-col p-5 md:p-7">
                      <div className="mb-4 flex items-start justify-between gap-3 md:mb-5 md:gap-4">
                        <h3 className="text-lg font-semibold uppercase tracking-[0.06em] text-white md:text-2xl md:tracking-[0.08em]">
                          {project.title}
                        </h3>

                        <p className="shrink-0 text-[9px] uppercase tracking-[0.28em] text-white/35 md:text-[11px] md:tracking-[0.35em]">
                          0{index + 1}
                        </p>
                      </div>

                      <p className="mb-5 line-clamp-3 flex-1 text-sm leading-6 text-white/70 md:mb-7 md:text-base md:leading-8">
                        {getProjectDescription(project)}
                      </p>

                      {technologies.length > 0 && (
                        <div className="mb-5 flex flex-wrap gap-2 md:mb-7">
                          {technologies.map((tech) => (
                            <span
                              key={tech}
                              className={`rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] md:px-3 md:text-[10px] md:tracking-[0.18em] ${styles.chip}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link
                        to={`/projects/${project.slug}`}
                        className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${styles.text} transition-all hover:gap-3 md:text-sm md:tracking-[0.22em]`}
                      >
                        Ver detalle
                        <HiOutlineArrowRight className="text-base md:text-lg" />
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
