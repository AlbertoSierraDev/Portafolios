import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
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
  FaShieldAlt,
  FaPython,
} from "react-icons/fa";

import {
  SiExpress,
  SiMysql,
  SiPostgresql,
  SiGithub,
  SiNginx,
  SiBurpsuite,
  SiWireshark,
} from "react-icons/si";

export default function SkillsSection() {
  const cybersecurity = [
    { name: "Burp Suite", icon: SiBurpsuite },
    { name: "Nmap", icon: FaNetworkWired },
    { name: "Wireshark", icon: SiWireshark },
    { name: "Metasploit", icon: FaTerminal },
    { name: "Ghidra", icon: FaCode },
    { name: "Kali Linux", icon: FaLinux },
    { name: "Bash", icon: FaTerminal },
    { name: "Python", icon: FaPython },
  ];

  const systems = [
    { name: "Windows", icon: FaWindows },
    { name: "Linux", icon: FaLinux },
    { name: "Redes", icon: FaNetworkWired },
    { name: "Active Directory", icon: FaServer },
    { name: "SSH", icon: FaTerminal },
    { name: "Nginx", icon: SiNginx },
    { name: "VPS", icon: FaServer },
    { name: "Soporte IT", icon: FaHeadset },
  ];

  const development = [
    { name: "JavaScript", icon: FaJs },
    { name: "React", icon: FaReact },
    { name: "Node.js", icon: FaNodeJs },
    { name: "Express", icon: SiExpress },
    { name: "APIs REST", icon: FaCode },
    { name: "MySQL", icon: SiMysql },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "JWT", icon: FaKey },
  ];

  const tools = [
    { name: "Git", icon: FaGitAlt },
    { name: "GitHub", icon: SiGithub },
    { name: "Docker", icon: FaDocker },
    { name: "Terminal", icon: FaTerminal },
    { name: "IA aplicada", icon: FaBrain },
    { name: "Automatización", icon: FaCode },
    { name: "Logs", icon: FaClipboardList },
    { name: "Scripting", icon: FaTerminal },
  ];

  const renderSkills = (
    skills: {
      name: string;
      icon: React.ComponentType<{ className?: string }>;
    }[],
    colorClass: string,
    borderClass: string,
    bgClass: string,
    shadowClass: string,
  ) => {
    return skills.map((skill) => {
      const Icon = skill.icon;

      return (
        <motion.div
          key={skill.name}
          whileHover={{ scale: 1.06, y: -3 }}
          transition={{
            duration: 0.15,
            ease: "easeOut",
          }}
          className="flex flex-col items-center gap-2"
        >
          <div
            className={`
              flex h-12 w-12 items-center justify-center
              rounded-xl border
              transition-all duration-150
              sm:h-13 sm:w-13
              md:h-[58px] md:w-[58px]
              md:rounded-2xl
              ${borderClass}
              ${bgClass}
              ${colorClass}
              ${shadowClass}
            `}
          >
            <Icon className="text-[21px] sm:text-[23px] md:text-[25px]" />
          </div>

          <p
            className="
              max-w-[100px]
              text-center
              text-[9px]
              font-semibold
              uppercase
              leading-4
              tracking-[0.11em]
              text-white/75
              sm:text-[10px]
              md:text-[11px]
              md:tracking-[0.14em]
            "
          >
            {skill.name}
          </p>
        </motion.div>
      );
    });
  };

  const cardBase = "rounded-[22px] border bg-white/[0.04] p-5 backdrop-blur-xl";

  const skillGrid =
    "grid grid-cols-4 gap-x-4 gap-y-5 sm:gap-x-5 md:gap-x-5 md:gap-y-6";

  return (
    <section className="relative px-4 pb-14 pt-16 sm:px-6 sm:pt-16 md:px-8 md:pb-16 md:pt-20">
      {" "}
      <div className="mx-auto max-w-[1400px]">
        {/* CABECERA */}
        <div className="mb-9 text-center md:mb-11">
          <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-cyan-300 md:text-[10px] md:tracking-[0.38em]">
            Competencias técnicas
          </p>

          <h2 className="text-3xl font-black uppercase leading-none text-white sm:text-4xl md:text-5xl">
            Skills & Tools
          </h2>

          <p className="mx-auto mt-3 max-w-[640px] text-xs leading-5 text-white/55 md:text-sm md:leading-6">
            Tecnologías, herramientas y conocimientos que utilizo en sistemas,
            redes, desarrollo, automatización y ciberseguridad.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* CIBERSEGURIDAD */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className={`
              ${cardBase}
              border-cyan-300/15
              shadow-[0_0_28px_rgba(34,211,238,0.07)]
            `}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
                <FaShieldAlt />
              </div>

              <div>
                <p className="text-[8px] uppercase tracking-[0.24em] text-cyan-300/60">
                  Seguridad ofensiva
                </p>

                <h3 className="text-sm font-semibold uppercase tracking-[0.17em] text-cyan-300 md:text-lg md:tracking-[0.19em]">
                  Ciberseguridad
                </h3>
              </div>
            </div>

            <div className={skillGrid}>
              {renderSkills(
                cybersecurity,
                "text-cyan-300",
                "border-cyan-300/20",
                "bg-cyan-300/10",
                "shadow-[0_0_16px_rgba(34,211,238,0.14)]",
              )}
            </div>
          </motion.article>

          {/* SISTEMAS Y REDES */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.45,
              delay: 0.08,
              ease: "easeOut",
            }}
            className={`
              ${cardBase}
              border-lime-400/15
              shadow-[0_0_28px_rgba(163,230,53,0.07)]
            `}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-lime-400/20 bg-lime-400/10 text-lime-400">
                <FaServer />
              </div>

              <div>
                <p className="text-[8px] uppercase tracking-[0.24em] text-lime-400/60">
                  Infraestructura
                </p>

                <h3 className="text-sm font-semibold uppercase tracking-[0.17em] text-lime-400 md:text-lg md:tracking-[0.19em]">
                  Sistemas y Redes
                </h3>
              </div>
            </div>

            <div className={skillGrid}>
              {renderSkills(
                systems,
                "text-lime-400",
                "border-lime-400/20",
                "bg-lime-400/10",
                "shadow-[0_0_16px_rgba(163,230,53,0.14)]",
              )}
            </div>
          </motion.article>

          {/* DESARROLLO */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.45,
              delay: 0.14,
              ease: "easeOut",
            }}
            className={`
              ${cardBase}
              border-sky-300/15
              shadow-[0_0_28px_rgba(125,211,252,0.07)]
            `}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-sky-300/20 bg-sky-300/10 text-sky-300">
                <FaCode />
              </div>

              <div>
                <p className="text-[8px] uppercase tracking-[0.24em] text-sky-300/60">
                  Desarrollo complementario
                </p>

                <h3 className="text-sm font-semibold uppercase tracking-[0.17em] text-sky-300 md:text-lg md:tracking-[0.19em]">
                  Desarrollo y Backend
                </h3>
              </div>
            </div>

            <div className={skillGrid}>
              {renderSkills(
                development,
                "text-sky-300",
                "border-sky-300/20",
                "bg-sky-300/10",
                "shadow-[0_0_16px_rgba(125,211,252,0.14)]",
              )}
            </div>
          </motion.article>

          {/* TOOLS */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.45,
              delay: 0.2,
              ease: "easeOut",
            }}
            className={`
              ${cardBase}
              border-fuchsia-300/15
              shadow-[0_0_28px_rgba(232,121,249,0.07)]
            `}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-fuchsia-300/20 bg-fuchsia-300/10 text-fuchsia-300">
                <FaBrain />
              </div>

              <div>
                <p className="text-[8px] uppercase tracking-[0.24em] text-fuchsia-300/60">
                  Herramientas y productividad
                </p>

                <h3 className="text-sm font-semibold uppercase tracking-[0.17em] text-fuchsia-300 md:text-lg md:tracking-[0.19em]">
                  Tools y Automatización
                </h3>
              </div>
            </div>

            <div className={skillGrid}>
              {renderSkills(
                tools,
                "text-fuchsia-300",
                "border-fuchsia-300/20",
                "bg-fuchsia-300/10",
                "shadow-[0_0_16px_rgba(232,121,249,0.14)]",
              )}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
