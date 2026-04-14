import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaLinux,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiGithub,
  SiVite,
  SiDocker,
} from "react-icons/si";

export default function SkillsSection() {
  const frontend = [
    { name: "React", icon: FaReact },
    { name: "JavaScript", icon: FaJs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "HTML", icon: FaHtml5 },
    { name: "CSS", icon: FaCss3Alt },
    { name: "Tailwind", icon: SiTailwindcss },
    { name: "Vite", icon: SiVite },
  ];

  const backend = [
    { name: "Node.js", icon: FaNodeJs },
    { name: "Express", icon: SiExpress },
    { name: "MongoDB", icon: SiMongodb },
    { name: "MySQL", icon: SiMysql },
    { name: "PostgreSQL", icon: SiPostgresql },
  ];

  const tools = [
    { name: "Linux", icon: FaLinux },
    { name: "Git", icon: FaGitAlt },
    { name: "GitHub", icon: SiGithub },
    { name: "Docker", icon: SiDocker },
  ];

  return (
    <section className="relative min-h-screen px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-14 text-center">
          <p className="mb-3 text-[11px] uppercase tracking-[0.4em] text-cyan-300">
            Stack tecnológico
          </p>
          <h2 className="text-4xl font-black uppercase text-white md:text-6xl">
            Skills
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:grid-rows-3">
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="rounded-[26px] border border-cyan-300/15 bg-white/[0.04] p-6 backdrop-blur-xl shadow-[0_0_35px_rgba(34,211,238,0.08)] md:col-span-2"
          >
            <h3 className="mb-6 text-lg font-semibold uppercase tracking-[0.2em] text-cyan-300 md:text-xl">
              Frontend
            </h3>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {frontend.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.08, y: -4 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.18)] transition-all duration-150">
                      <Icon size={28} />
                    </div>

                    <p className="text-center text-xs uppercase tracking-[0.18em] text-white/75">
                      {skill.name}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="rounded-[26px] border border-lime-400/15 bg-white/[0.04] p-6 backdrop-blur-xl shadow-[0_0_35px_rgba(163,230,53,0.08)] md:col-span-2 md:col-start-3"
          >
            <h3 className="mb-6 text-lg font-semibold uppercase tracking-[0.2em] text-lime-400 md:text-xl">
              Backend y bases de datos
            </h3>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {backend.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.08, y: -4 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-lime-400/20 bg-lime-400/10 text-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.18)] transition-all duration-150">
                      <Icon size={28} />
                    </div>

                    <p className="text-center text-xs uppercase tracking-[0.18em] text-white/75">
                      {skill.name}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.14, ease: "easeOut" }}
            className="rounded-[26px] border border-fuchsia-300/15 bg-white/[0.04] p-6 backdrop-blur-xl shadow-[0_0_35px_rgba(232,121,249,0.08)] md:col-span-2 md:col-start-2 md:row-start-2"
          >
            <h3 className="mb-6 text-lg font-semibold uppercase tracking-[0.2em] text-fuchsia-300 md:text-xl">
              Tools y entorno
            </h3>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {tools.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.08, y: -4 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-fuchsia-300/10 text-fuchsia-300 shadow-[0_0_20px_rgba(232,121,249,0.18)] transition-all duration-150">
                      <Icon size={28} />
                    </div>

                    <p className="text-center text-xs uppercase tracking-[0.18em] text-white/75">
                      {skill.name}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
