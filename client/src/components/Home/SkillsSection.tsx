import { motion, useReducedMotion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaLinux,
  FaWindows,
  FaNetworkWired,
  FaTerminal,
  FaServer,
  FaHeadset,
  FaDocker,
  FaCode,
  FaBrain,
  FaShieldAlt,
  FaPython,
  FaCloud,
  FaHdd,
} from "react-icons/fa";

import {
  SiExpress,
  SiMysql,
  SiGithub,
  SiNginx,
  SiBurpsuite,
  SiWireshark,
} from "react-icons/si";

import SectionHeader from "../SectionHeader";

export default function SkillsSection() {
  const reducedMotion = useReducedMotion();
  const systems = [
    { name: "Windows", icon: FaWindows },
    { name: "Linux", icon: FaLinux },
    { name: "Microsoft 365", icon: FaCloud },
    { name: "Active Directory", icon: FaServer },
    { name: "Redes", icon: FaNetworkWired },
    { name: "Soporte IT", icon: FaHeadset },
    { name: "PowerShell", icon: FaTerminal },
    { name: "SSH", icon: FaTerminal },
  ];

  const cloud = [
    { name: "Microsoft Azure", icon: FaCloud },
    { name: "Nginx", icon: SiNginx },
    { name: "Docker", icon: FaDocker },
    { name: "VPS", icon: FaServer },
    { name: "DNS", icon: FaNetworkWired },
    { name: "VirtualBox", icon: FaHdd },
    { name: "GitHub Actions / CI/CD", icon: SiGithub },
    { name: "Servidores Linux", icon: FaLinux },
  ];

  const cybersecurity = [
    { name: "Kali Linux", icon: FaLinux },
    { name: "Nmap", icon: FaNetworkWired },
    { name: "Wireshark", icon: SiWireshark },
    { name: "Burp Suite", icon: SiBurpsuite },
    { name: "Metasploit", icon: FaTerminal },
    { name: "Bash", icon: FaTerminal },
    { name: "Python", icon: FaPython },
    { name: "Seguridad web", icon: FaShieldAlt },
  ];

  const development = [
    { name: "JavaScript", icon: FaJs },
    { name: "React", icon: FaReact },
    { name: "Node.js", icon: FaNodeJs },
    { name: "Express", icon: SiExpress },
    { name: "APIs REST", icon: FaCode },
    { name: "MySQL", icon: SiMysql },
    { name: "Git / GitHub", icon: SiGithub },
    { name: "IA aplicada", icon: FaBrain },
  ];

  const categories = [
    { title: "Sistemas y Soporte IT", label: "Soporte e infraestructura", icon: FaHeadset, skills: systems, accent: "text-lime-400", border: "border-lime-400/15" },
    { title: "Cloud e Infraestructura", label: "Cloud y despliegue", icon: FaCloud, skills: cloud, accent: "text-cyan-300", border: "border-cyan-300/15" },
    { title: "Ciberseguridad", label: "Seguridad informática", icon: FaShieldAlt, skills: cybersecurity, accent: "text-cyan-300", border: "border-cyan-300/15" },
    { title: "Desarrollo y Automatización", label: "Desarrollo complementario", icon: FaCode, skills: development, accent: "text-fuchsia-300", border: "border-fuchsia-300/15" },
  ];

  return (
    <section className="relative px-4 py-10 sm:px-5 sm:py-12 md:px-6 lg:py-4">
      <div className="mx-auto w-full max-w-[1500px]">
        <SectionHeader eyebrow="Competencias técnicas" title="Skills & Tools" description="Tecnologías, herramientas y conocimientos que utilizo en sistemas, redes, desarrollo, automatización y ciberseguridad." centered />
        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((category, index) => {
            const CategoryIcon = category.icon;
            return (
              <motion.article key={category.title}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                className={`group relative min-w-0 overflow-hidden rounded-lg border ${category.border} bg-white/[0.035] p-4 backdrop-blur-xl transition-colors duration-300 hover:bg-white/[0.055] sm:p-6 lg:p-4 lg:px-5 ${category.accent}`}>
                <span aria-hidden="true" className="absolute left-4 right-4 top-0 h-px bg-current opacity-40 transition-opacity duration-300 group-hover:opacity-80 sm:left-6 sm:right-6 lg:left-4 lg:right-4" />
                <div className="mb-2 flex items-start gap-3 border-b border-white/10 pb-5 sm:gap-4 lg:pb-3">
                  <CategoryIcon aria-hidden="true" className="mt-1 shrink-0 text-2xl" />
                  <div className="min-w-0 flex-1">
                    <h3 className="break-words text-base font-semibold leading-6 text-white lg:text-[19px]">{category.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-white/50">{category.label}</p>
                  </div>
                  <span aria-hidden="true" className="shrink-0 pt-1 font-mono text-xs tabular-nums text-white/25">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <ul className="grid grid-cols-2 gap-x-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-3">
                  {category.skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <motion.li key={skill.name} whileHover={reducedMotion ? undefined : { y: -2 }}
                        transition={{ duration: 0.15 }} className="flex min-h-16 min-w-0 items-center gap-2.5 border-b border-white/[0.06] py-3 transition-colors duration-200 hover:border-current hover:text-white motion-reduce:transition-none sm:gap-3 lg:min-h-[68px] lg:flex-col lg:justify-center lg:gap-1.5 lg:py-1 lg:text-center">
                        <Icon aria-hidden="true" className={`shrink-0 text-lg ${category.accent}`} />
                        <span className="min-w-0 break-words text-xs font-medium leading-5 text-white/75 sm:text-sm lg:text-[13px] lg:leading-4">{skill.name}</span>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
