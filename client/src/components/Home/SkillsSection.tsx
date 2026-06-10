import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaLinux,
  FaGitAlt,
  FaWindows,
  FaNetworkWired,
  FaTerminal,
  FaServer,
  FaHeadset,
  FaDocker,
  FaCode,
  FaKey,
  FaClipboardList,
  FaBrain,
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
  SiSqlite,
  SiNginx,
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
    { name: "MySQL", icon: SiMysql },
    { name: "SQLite", icon: SiSqlite },
    { name: "MongoDB", icon: SiMongodb },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "APIs REST", icon: FaCode },
    { name: "JWT", icon: FaKey },
  ];

  const support = [
    { name: "Windows", icon: FaWindows },
    { name: "Linux", icon: FaLinux },
    { name: "Redes", icon: FaNetworkWired },
    { name: "SSH", icon: FaTerminal },
    { name: "Nginx", icon: SiNginx },
    { name: "PM2", icon: FaServer },
    { name: "VPS", icon: FaServer },
    { name: "Soporte", icon: FaHeadset },
  ];

  const tools = [
    { name: "Git", icon: FaGitAlt },
    { name: "GitHub", icon: SiGithub },
    { name: "Docker básico", icon: FaDocker },
    { name: "Terminal", icon: FaTerminal },
    { name: "Logs", icon: FaClipboardList },
    { name: "IA aplicada", icon: FaBrain },
  ];

  const renderSkills = (
    skills: typeof frontend,
    colorClass: string,
    borderClass: string,
    bgClass: string,
    shadowClass: string,
  ) => {
    return skills.map((skill, i) => {
      const Icon = skill.icon;

      return (
        <motion.div
          key={i}
          whileHover={{ scale: 1.06, y: -3 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="flex flex-col items-center gap-2 md:gap-3"
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl border text-[22px] transition-all duration-150 sm:h-14 sm:w-14 md:h-16 md:w-16 md:rounded-2xl ${borderClass} ${bgClass} ${colorClass} ${shadowClass}`}
          >
            <Icon className="text-[22px] sm:text-[25px] md:text-[28px]" />
          </div>

          <p className="max-w-[95px] text-center text-[10px] font-medium uppercase leading-4 tracking-[0.12em] text-white/75 sm:text-[11px] md:text-xs md:tracking-[0.18em]">
            {skill.name}
          </p>
        </motion.div>
      );
    });
  };

  return (
    <section className="relative px-4 pb-16 pt-12 sm:px-5 sm:pt-14 md:px-10 md:pb-20 md:pt-20">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-8 text-center md:mb-14">
          <p className="mb-2 text-[9px] uppercase tracking-[0.28em] text-cyan-300 md:mb-3 md:text-[11px] md:tracking-[0.4em]">
            Stack tecnológico
          </p>

          <h2 className="text-3xl font-black uppercase text-white sm:text-4xl md:text-6xl">
            Skills
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="rounded-[20px] border border-cyan-300/15 bg-white/[0.04] p-5 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.08)] md:rounded-[26px] md:p-6 md:shadow-[0_0_35px_rgba(34,211,238,0.08)]"
          >
            <h3 className="mb-5 text-base font-semibold uppercase tracking-[0.16em] text-cyan-300 md:mb-6 md:text-xl md:tracking-[0.2em]">
              Frontend
            </h3>

            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
              {renderSkills(
                frontend,
                "text-cyan-300",
                "border-cyan-300/20",
                "bg-cyan-300/10",
                "shadow-[0_0_16px_rgba(34,211,238,0.16)] md:shadow-[0_0_20px_rgba(34,211,238,0.18)]",
              )}
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="rounded-[20px] border border-lime-400/15 bg-white/[0.04] p-5 backdrop-blur-xl shadow-[0_0_30px_rgba(163,230,53,0.08)] md:rounded-[26px] md:p-6 md:shadow-[0_0_35px_rgba(163,230,53,0.08)]"
          >
            <h3 className="mb-5 text-base font-semibold uppercase tracking-[0.16em] text-lime-400 md:mb-6 md:text-xl md:tracking-[0.2em]">
              Backend y bases de datos
            </h3>

            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
              {renderSkills(
                backend,
                "text-lime-400",
                "border-lime-400/20",
                "bg-lime-400/10",
                "shadow-[0_0_16px_rgba(163,230,53,0.16)] md:shadow-[0_0_20px_rgba(163,230,53,0.18)]",
              )}
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.14, ease: "easeOut" }}
            className="rounded-[20px] border border-sky-300/15 bg-white/[0.04] p-5 backdrop-blur-xl shadow-[0_0_30px_rgba(125,211,252,0.08)] md:rounded-[26px] md:p-6 md:shadow-[0_0_35px_rgba(125,211,252,0.08)]"
          >
            <h3 className="mb-5 text-base font-semibold uppercase tracking-[0.16em] text-sky-300 md:mb-6 md:text-xl md:tracking-[0.2em]">
              Soporte IT / Sistemas
            </h3>

            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
              {renderSkills(
                support,
                "text-sky-300",
                "border-sky-300/20",
                "bg-sky-300/10",
                "shadow-[0_0_16px_rgba(125,211,252,0.16)] md:shadow-[0_0_20px_rgba(125,211,252,0.18)]",
              )}
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
            className="rounded-[20px] border border-fuchsia-300/15 bg-white/[0.04] p-5 backdrop-blur-xl shadow-[0_0_30px_rgba(232,121,249,0.08)] md:rounded-[26px] md:p-6 md:shadow-[0_0_35px_rgba(232,121,249,0.08)]"
          >
            <h3 className="mb-5 text-base font-semibold uppercase tracking-[0.16em] text-fuchsia-300 md:mb-6 md:text-xl md:tracking-[0.2em]">
              Tools y entorno
            </h3>

            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 sm:gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
              {renderSkills(
                tools,
                "text-fuchsia-300",
                "border-fuchsia-300/20",
                "bg-fuchsia-300/10",
                "shadow-[0_0_16px_rgba(232,121,249,0.16)] md:shadow-[0_0_20px_rgba(232,121,249,0.18)]",
              )}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
