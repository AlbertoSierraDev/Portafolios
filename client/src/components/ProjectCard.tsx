import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight, HiOutlinePhoto } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";
import type { Project } from "../types/project";

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


type ProjectCardProps = {
  project: Project;
  index: number;
  showGithub?: boolean;
  headingLevel?: "h2" | "h3";
};

export default function ProjectCard({ project, index, showGithub = false, headingLevel: Heading = "h3" }: ProjectCardProps) {
  const reducedMotion = useReducedMotion();
  const styles = accentStyles[index % accentStyles.length];
  const image = getProjectImage(project);
  const technologies = getProjectTechnologies(project).slice(0, 4);

  return (
                <motion.article
                  key={project._id || project.slug}
                  initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  whileHover={reducedMotion ? undefined : { y: -4 }}
                  className={`group relative min-w-0 overflow-hidden rounded-lg border ${styles.border} bg-white/[0.035] backdrop-blur-xl ${styles.shadow} transition-colors hover:border-white/30 focus-within:border-cyan-300/50`}
                >
                  <div className={`absolute inset-0 ${styles.glow}`} />

                  <div className="relative z-10 flex h-full flex-col">
                    <Link
                      to={`/projects/${project.slug}`}
                      aria-label={`Ver proyecto ${project.title}`}
                      className="relative block h-56 overflow-hidden border-b border-white/10 bg-black/20 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-300 md:h-64"
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={project.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <HiOutlinePhoto
                            className={`text-5xl ${styles.text} opacity-60 md:text-6xl`}
                          />
                        </div>
                      )}

                      <span className="absolute left-3 top-3 rounded border border-white/15 bg-black/65 px-2 py-1 text-[10px] font-medium tabular-nums text-white/80 backdrop-blur-md">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>

                    <div className="flex flex-1 flex-col p-6 md:p-7">
                      <Heading className="mb-4 min-h-[5.25rem] text-lg font-semibold leading-7 text-white">
                        <Link to={`/projects/${project.slug}`} title={project.title} className="line-clamp-3 break-words rounded-sm outline-none transition-colors hover:text-cyan-200 focus-visible:ring-2 focus-visible:ring-cyan-300">{project.title}</Link>
                      </Heading>

                      <p className="mb-5 min-h-[4.5rem] line-clamp-3 text-sm leading-6 text-white/60">
                        {getProjectDescription(project)}
                      </p>

                      {technologies.length > 0 && (
                        <div className="mb-4 flex flex-wrap gap-1.5">
                          {technologies.map((tech) => (
                            <span
                              key={tech}
                              className={`max-w-full break-words rounded border px-2 py-1 text-[10px] font-medium ${styles.chip}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                      <Link
                        to={`/projects/${project.slug}`}
                        className={`flex flex-1 items-center justify-between gap-2 text-xs font-semibold ${styles.text} outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-300`}
                      >
                        Ver detalle
                        <HiOutlineArrowRight className="text-base md:text-lg" />
                      </Link>
                      {showGithub && project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`GitHub de ${project.title}`} title="GitHub" className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-white/15 text-white/65 transition hover:border-cyan-300/40 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"><FaGithub className="text-base" /></a>
                      )}
                      </div>
                    </div>
                  </div>
                </motion.article>
  );
}

