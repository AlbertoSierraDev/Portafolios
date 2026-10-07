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
    <section className="relative px-4 py-10 sm:px-5 sm:py-12 md:px-10 md:py-14">
      <div className="mx-auto w-full max-w-[1400px]">
        <SectionHeader eyebrow="Competencias técnicas" title="Skills & Tools" description="Tecnologías, herramientas y conocimientos que utilizo en sistemas, redes, desarrollo, automatización y ciberseguridad." centered />
        <div className="grid gap-3 md:grid-cols-2">
          {categories.map((category, index) => {
            const CategoryIcon = category.icon;
            return (
              <motion.article key={category.title}
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                className={`min-w-0 rounded-lg border ${category.border} bg-white/[0.035] p-4 backdrop-blur-xl md:p-5`}>
                <div className="mb-3 flex items-center justify-center gap-3 border-b border-white/10 pb-3 text-center">
                  <CategoryIcon aria-hidden="true" className={`shrink-0 text-xl ${category.accent}`} />
                  <div className="min-w-0">
                    <p className="text-[10px] leading-5 text-white/50">{category.label}</p>
                    <h3 className="break-words text-base font-semibold text-white">{category.title}</h3>
                  </div>
                </div>
                <ul className="grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-4">
                  {category.skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <motion.li key={skill.name} whileHover={reducedMotion ? undefined : { y: -2 }}
                        transition={{ duration: 0.15 }} className="flex min-w-0 flex-col items-center gap-1.5 py-1 text-center">
                        <Icon aria-hidden="true" className={`text-xl ${category.accent}`} />
                        <span className="min-h-10 max-w-full break-words text-xs leading-5 text-white/75">{skill.name}</span>
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
