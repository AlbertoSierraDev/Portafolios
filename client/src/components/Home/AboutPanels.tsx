import { motion } from "framer-motion";
import {
  HiOutlineCpuChip,
  HiOutlineSparkles,
  HiOutlineUser,
} from "react-icons/hi2";

export default function AboutPanels() {
  return (
    <section className="relative flex min-h-auto items-start px-4 py-12 sm:px-5 sm:py-14 md:min-h-screen md:items-center md:px-8 md:py-10">
      <div className="mx-auto w-full max-w-[1380px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-7 md:grid-rows-6 md:gap-4">
          <motion.article
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[20px] border border-cyan-300/15 bg-white/[0.04] p-4 backdrop-blur-xl shadow-[0_0_32px_rgba(34,211,238,0.06)] sm:p-5 md:col-span-5 md:row-span-3 md:col-start-2 md:min-h-[285px] md:rounded-[22px] md:p-7"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_30%)]" />

            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-3 flex items-center gap-3 md:mb-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] border border-cyan-300/20 bg-cyan-300/10 text-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.12)] md:h-10 md:w-10 md:rounded-[16px]">
                  <HiOutlineUser className="text-base md:text-lg" />
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.22em] text-white/45 md:text-[9px] md:tracking-[0.28em]">
                    Nodo 01
                  </p>

                  <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-white md:text-xl md:tracking-[0.1em]">
                    Sobre mí
                  </h3>
                </div>
              </div>

              <p className="max-w-5xl text-[12px] leading-5 text-white/72 sm:text-[13px] sm:leading-6 md:text-[15px] md:leading-7">
                Soy un perfil junior en tecnología con formación en Sistemas
                Microinformáticos y Redes. Tengo interés tanto en el desarrollo
                web fullstack como en el soporte técnico IT, combinando
                conocimientos de JavaScript, React, Node.js, Linux, servidores,
                redes básicas y resolución de incidencias. He desarrollado
                proyectos propios donde he trabajado con aplicaciones web, APIs,
                bases de datos, despliegues en VPS, Nginx, PM2, SSH y
                diagnóstico de errores. Me considero una persona resolutiva, con
                capacidad de aprendizaje rápido y orientación a crear soluciones
                útiles, claras y mantenibles.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-3 md:mt-5">
                <div className="rounded-[14px] border border-white/10 bg-black/10 p-3 md:rounded-[16px] md:p-4">
                  <p className="text-[8px] uppercase tracking-[0.2em] text-cyan-300 md:text-[9px] md:tracking-[0.24em]">
                    FORMACIÓN
                  </p>

                  <p className="mt-2 text-[11px] leading-5 text-white/70 md:text-sm">
                    Sistemas Microinformáticos y Redes.
                  </p>
                </div>

                <div className="rounded-[14px] border border-white/10 bg-black/10 p-3 md:rounded-[16px] md:p-4">
                  <p className="text-[8px] uppercase tracking-[0.2em] text-lime-400 md:text-[9px] md:tracking-[0.24em]">
                    STACK
                  </p>

                  <p className="mt-2 text-[11px] leading-5 text-white/70 md:text-sm">
                    JavaScript, desarrollo web fullstack y arquitectura.
                  </p>
                </div>

                <div className="rounded-[14px] border border-white/10 bg-black/10 p-3 md:rounded-[16px] md:p-4">
                  <p className="text-[8px] uppercase tracking-[0.2em] text-fuchsia-300 md:text-[9px] md:tracking-[0.24em]">
                    OBJETIVO
                  </p>

                  <p className="mt-2 text-[11px] leading-5 text-white/70 md:text-sm">
                    Primer empleo en tecnología y crecimiento hacia
                    ciberseguridad.
                  </p>
                </div>
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[20px] border border-lime-400/15 bg-white/[0.04] p-4 backdrop-blur-xl shadow-[0_0_28px_rgba(163,230,53,0.06)] sm:p-5 md:col-span-3 md:row-span-3 md:row-start-4 md:min-h-[255px] md:rounded-[22px] md:p-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.08),transparent_35%)]" />

            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-3 flex items-center gap-3 md:mb-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] border border-lime-400/20 bg-lime-400/10 text-lime-400 shadow-[0_0_14px_rgba(163,230,53,0.12)] md:h-10 md:w-10 md:rounded-[16px]">
                  <HiOutlineCpuChip className="text-base md:text-lg" />
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.22em] text-white/45 md:text-[9px] md:tracking-[0.28em]">
                    Nodo 02
                  </p>

                  <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-white md:text-xl md:tracking-[0.1em]">
                    IA
                  </h3>
                </div>
              </div>

              <p className="text-[12px] leading-5 text-white/72 sm:text-[13px] sm:leading-6 md:text-[15px] md:leading-7">
                Uso la inteligencia artificial como apoyo para aprender,
                investigar y resolver problemas, manteniendo siempre el criterio
                técnico sobre el resultado.
                <br /> Conozco y utilizo herramientas como agentes, skills y
                MCPs, aplicándolas de forma estratégica cuando un proyecto
                requiere velocidad, automatización o exploración rápida.
                <br /> Todo código que incorporo lo analizo, adapto y valido
                antes de usarlo.
              </p>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.14, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[20px] border border-fuchsia-300/15 bg-white/[0.04] p-4 backdrop-blur-xl shadow-[0_0_28px_rgba(232,121,249,0.06)] sm:p-5 md:col-span-3 md:row-span-3 md:col-start-5 md:row-start-4 md:min-h-[255px] md:rounded-[22px] md:p-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(232,121,249,0.08),transparent_35%)]" />

            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-3 flex items-center gap-3 md:mb-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] border border-fuchsia-300/20 bg-fuchsia-300/10 text-fuchsia-300 shadow-[0_0_14px_rgba(232,121,249,0.12)] md:h-10 md:w-10 md:rounded-[16px]">
                  <HiOutlineSparkles className="text-base md:text-lg" />
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-[0.22em] text-white/45 md:text-[9px] md:tracking-[0.28em]">
                    Nodo 03
                  </p>

                  <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-white md:text-xl md:tracking-[0.1em]">
                    Inquietudes y motivaciones
                  </h3>
                </div>
              </div>

              <p className="text-[12px] leading-5 text-white/72 sm:text-[13px] sm:leading-6 md:text-[15px] md:leading-7">
                Me motiva aprender constantemente, enfrentar nuevos retos
                técnicos y seguir creciendo dentro del sector tecnológico.
                <br /> Me interesa construir productos digitales completos,
                entendiendo tanto su lógica interna como su experiencia final.
                <br /> A largo plazo, quiero especializarme en ciberseguridad,
                apoyándome en una base sólida de desarrollo, sistemas y redes.
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
