import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { getProjects } from "../../api/projects";
import type { Project } from "../../types/project";
import ContentState from "../ContentState";
import ProjectCard from "../ProjectCard";

export default function FeaturedProjectsSection() {
  const reducedMotion = useReducedMotion();
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
    <section className="relative px-4 py-10 sm:px-5 sm:py-12 md:px-10 md:py-14">
      <div className="mx-auto max-w-[1500px]">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-6 flex flex-col items-center gap-4 border-b border-white/10 pb-5 text-center md:mb-7 md:gap-6"
        >
          <div>
            <p className="mb-2 text-[9px] uppercase tracking-[0.28em] text-cyan-300 md:mb-3 md:text-[11px] md:tracking-[0.4em]">
              Proyectos
            </p>

            <h2 className="text-2xl font-black uppercase leading-tight text-white sm:text-3xl md:text-4xl">
              PROYECTOS & LABORATORIOS
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-white/60">
              Desarrollo, sistemas y seguridad aplicados a proyectos reales.
            </p>
          </div>

          <motion.div
            whileHover={reducedMotion ? undefined : { y: -2 }}
            whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="shrink-0"
          >
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-cyan-300/25 bg-cyan-300/5 px-4 py-2.5 text-xs font-semibold text-cyan-200 transition hover:border-cyan-300/60 hover:bg-cyan-300/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Ver todos
              <HiOutlineArrowRight className="text-base md:text-lg" />
            </Link>
          </motion.div>
        </motion.div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[560px] animate-pulse rounded-lg border border-white/10 bg-white/[0.04] motion-reduce:animate-none"
              />
            ))}
          </div>
        )}

        {!isLoading && error && (
          <ContentState kind="error" message={error}>
            <Link to="/projects" className="inline-flex items-center gap-2 rounded-md border border-cyan-300/25 bg-cyan-300/5 px-4 py-2.5 text-xs font-semibold text-cyan-200 transition hover:border-cyan-300/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
              Ir a proyectos <HiOutlineArrowRight />
            </Link>
          </ContentState>
        )}

        {!isLoading && !error && featuredProjects.length === 0 && (
          <ContentState kind="empty" message="Todavía no hay proyectos disponibles para mostrar." />
        )}

        {!isLoading && !error && featuredProjects.length > 0 && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project._id || project.slug} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
