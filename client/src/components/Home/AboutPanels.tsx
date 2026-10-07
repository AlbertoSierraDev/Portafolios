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

                  <h3 className="text-lg font-semibold text-white">
                    Sobre mí
                  </h3>
                </div>
              </div>

              <p className="w-full text-center text-sm leading-7 text-white/70">
                Soy técnico IT con formación en Sistemas Microinformáticos y
                Redes, enfocado en sistemas, redes y ciberseguridad. Cuento con
                conocimientos de Windows, Linux, redes, soporte técnico y
                administración de sistemas, además de experiencia con desarrollo
                web, servidores y despliegues. Actualmente estoy profundizando
                en ciberseguridad mediante formación, laboratorios y CTFs,
                especialmente en seguridad web, enumeración, análisis de
                servicios y escalada de privilegios en entornos controlados.
              </p>

              <div className="mt-5 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-3">
                <div className="min-w-0 border-l border-white/10 pl-4">
                  <p className="text-[8px] uppercase tracking-[0.2em] text-cyan-300 md:text-[9px] md:tracking-[0.24em]">
                    FORMACIÓN
                  </p>

                  <p className="mt-2 text-[11px] leading-5 text-white/70 md:text-sm">
                    Sistemas Microinformáticos y Redes.
                  </p>
                </div>

                <div className="min-w-0 border-l border-white/10 pl-4">
                  <p className="text-[8px] uppercase tracking-[0.2em] text-lime-400 md:text-[9px] md:tracking-[0.24em]">
                    STACK
                  </p>

                  <p className="mt-2 text-[11px] leading-5 text-white/70 md:text-sm">
                    Linux · Windows · Redes · Bash · Python · Git · JavaScript ·
                    SQL
                  </p>
                </div>

                <div className="min-w-0 border-l border-white/10 pl-4">
                  <p className="text-[8px] uppercase tracking-[0.2em] text-fuchsia-300 md:text-[9px] md:tracking-[0.24em]">
                    OBJETIVO
                  </p>

                  <p className="mt-2 text-[11px] leading-5 text-white/70 md:text-sm">
                    Seguir creciendo en sistemas y redes mientras avanzo hacia
                    la ciberseguridad y el pentesting.
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

                  <h3 className="text-lg font-semibold text-white">
                    IA
                  </h3>
                </div>
              </div>

              <p className="text-sm leading-7 text-white/70">
                Utilizo la inteligencia artificial como herramienta para
                aprender, investigar, analizar código y, especialmente,
                automatizar procesos. Me interesa explorar el uso de agentes,
                herramientas, APIs y diferentes flujos de automatización para
                conectar tareas y crear soluciones que reduzcan trabajo manual.{" "}
                <br />
                Creo que la combinación de IA, programación y creatividad abre
                un mundo de posibilidades: muchas tareas que antes requerían
                procesos complejos pueden convertirse en sistemas automatizados
                si encuentras la forma adecuada de conectar las piezas.
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
                Practico ciberseguridad y pentesting en laboratorios y CTFs,
                trabajando con Linux, Windows, redes y seguridad web. <br />
                Utilizo herramientas como Burp Suite, Nmap, Wireshark, ffuf,
                Metasploit y Ghidra, pero intento ir más allá de simplemente
                utilizarlas. <br />
                Me gusta entender cómo funcionan los sistemas y aplicaciones,
                analizar lo que ocurre detrás y, cuando me encuentro con un
                problema, crear mis propias soluciones, scripts o herramientas
                con Bash y Python para resolverlo o automatizar el proceso.
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
