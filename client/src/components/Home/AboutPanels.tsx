import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import {
  HiOutlineCpuChip,
  HiOutlineSparkles,
  HiOutlineUser,
} from "react-icons/hi2";

export default function AboutPanels() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="relative px-4 py-10 sm:px-5 sm:py-12 md:px-10 md:py-14">
      <div className="mx-auto w-full max-w-[1500px]">
        <SectionHeader eyebrow="Perfil" title="Sobre mí" centered />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <motion.article
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative w-full justify-self-center overflow-hidden rounded-lg border border-cyan-300/15 bg-white/[0.035] p-4 backdrop-blur-xl sm:p-5 md:col-span-2 md:w-[80%] md:p-7"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_30%)]" />

            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-3 flex flex-col items-center justify-center gap-3 text-center md:mb-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-cyan-300/20 bg-cyan-300/10 text-cyan-300 md:h-10 md:w-10">
                  <HiOutlineUser className="text-base md:text-lg" />
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.22em] text-white/45 md:text-[9px] md:tracking-[0.28em]">
                    Nodo 01
                  </p>

                  <h3 className="text-lg font-semibold text-white">Sobre mí</h3>
                </div>
              </div>

              <p className="w-full text-center text-sm leading-7 text-white/70">
                Soy Técnico de Soporte IT con formación en Sistemas
                Microinformáticos y Redes y actualmente curso Administración de
                Sistemas Informáticos en Red (ASIR). Cuento con experiencia
                profesional en soporte a usuarios, gestión y resolución de
                incidencias, además de conocimientos prácticos de Windows,
                Linux, redes y administración de sistemas. Desarrollo proyectos
                propios relacionados con Microsoft Azure, servidores, desarrollo
                y automatización, que utilizo para seguir ampliando mis
                conocimientos técnicos. Paralelamente, continúo formándome y
                practicando ciberseguridad mediante laboratorios y CTFs.
              </p>

              <div className="mt-5 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-3">
                <div className="min-w-0 border-l border-white/10 pl-4">
                  <p className="text-[8px] uppercase tracking-[0.2em] text-cyan-300 md:text-[9px] md:tracking-[0.24em]">
                    FORMACIÓN
                  </p>

                  <p className="mt-2 text-[11px] leading-5 text-white/70 md:text-sm">
                    Sistemas Microinformáticos y Redes · ASIR en curso
                  </p>
                </div>

                <div className="min-w-0 border-l border-white/10 pl-4">
                  <p className="text-[8px] uppercase tracking-[0.2em] text-lime-400 md:text-[9px] md:tracking-[0.24em]">
                    STACK
                  </p>

                  <p className="mt-2 text-[11px] leading-5 text-white/70 md:text-sm">
                    Windows · Linux · Redes · Microsoft 365 · Active Directory ·
                    Azure
                  </p>
                </div>

                <div className="min-w-0 border-l border-white/10 pl-4">
                  <p className="text-[8px] uppercase tracking-[0.2em] text-fuchsia-300 md:text-[9px] md:tracking-[0.24em]">
                    OBJETIVO
                  </p>

                  <p className="mt-2 text-[11px] leading-5 text-white/70 md:text-sm">
                    Seguir creciendo en soporte y administración de sistemas,
                    avanzando hacia cloud y ciberseguridad.
                  </p>
                </div>
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="relative overflow-hidden rounded-lg border border-lime-400/15 bg-white/[0.035] p-4 backdrop-blur-xl sm:p-5 md:p-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.08),transparent_35%)]" />

            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-3 flex items-center gap-3 md:mb-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-lime-400/20 bg-lime-400/10 text-lime-400 md:h-10 md:w-10">
                  <HiOutlineCpuChip className="text-base md:text-lg" />
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.22em] text-white/45 md:text-[9px] md:tracking-[0.28em]">
                    Nodo 02
                  </p>

                  <h3 className="text-lg font-semibold text-white">IA</h3>
                </div>
              </div>

              <p className="text-sm leading-7 text-white/70">
                Utilizo la inteligencia artificial como herramienta para
                aprender, investigar, analizar código y automatizar procesos.
                Trabajo con agentes, APIs y modelos locales para experimentar
                con diferentes flujos de trabajo y desarrollar soluciones
                propias. Integro la IA en mi forma de trabajar como apoyo para
                resolver problemas, documentar, desarrollar y automatizar
                tareas, manteniendo siempre la revisión y el criterio técnico
                sobre los resultados.
              </p>
            </div>
          </motion.article>

          <motion.article
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.14, ease: "easeOut" }}
            className="relative overflow-hidden rounded-lg border border-fuchsia-300/15 bg-white/[0.035] p-4 backdrop-blur-xl sm:p-5 md:p-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(232,121,249,0.08),transparent_35%)]" />

            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-3 flex items-center gap-3 md:mb-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-fuchsia-300/20 bg-fuchsia-300/10 text-fuchsia-300 md:h-10 md:w-10">
                  <HiOutlineSparkles className="text-base md:text-lg" />
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.22em] text-white/45 md:text-[9px] md:tracking-[0.28em]">
                    Nodo 03
                  </p>

                  <h3 className="text-lg font-semibold text-white">
                    CIBERSEGURIDAD
                  </h3>
                </div>
              </div>

              <p className="text-sm leading-7 text-white/70">
                Practico ciberseguridad en laboratorios y CTFs, trabajando
                principalmente con Linux, redes, seguridad web y análisis de
                servicios. Utilizo herramientas como Burp Suite, Nmap,
                Wireshark, ffuf y Metasploit para reconocimiento, enumeración y
                análisis de vulnerabilidades en entornos controlados. También
                desarrollo scripts y herramientas propias con Bash y Python para
                automatizar tareas y comprender mejor el funcionamiento interno
                de sistemas y aplicaciones.
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
