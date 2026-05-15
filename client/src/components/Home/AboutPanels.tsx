import { motion } from "framer-motion";
import {
  HiOutlineCpuChip,
  HiOutlineSparkles,
  HiOutlineUser,
} from "react-icons/hi2";

export default function AboutPanels() {
  return (
    <section className="relative flex min-h-screen items-center px-6  py-16 md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-7 md:grid-rows-6">
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[28px] border border-cyan-300/15 bg-white/[0.04] p-7 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.06)] md:col-span-5 md:row-span-3 md:col-start-2 md:min-h-[360px] md:p-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_30%)]" />
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.12)]">
                  <HiOutlineUser className="text-2xl" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">
                    Nodo 01
                  </p>
                  <h3 className="text-xl font-semibold uppercase tracking-[0.12em] text-white md:text-2xl">
                    Sobre mí
                  </h3>
                </div>
              </div>

              <p className="max-w-5xl text-base leading-8 text-white/72 md:text-lg">
                Soy un perfil junior en tecnología con formación en Sistemas
                Microinformáticos y Redes. Desde pequeño me ha apasionado la
                informática, los sistemas y entender cómo funciona la tecnología
                desde dentro. Mi primer contacto con la programación fue con
                Bash, motivado por mi interés en Linux y su papel dentro de la
                ciberseguridad. Durante los últimos años he desarrollado
                proyectos propios y me he formado en aplicaciones web fullstack,
                especialmente con el stack de JavaScript, poniendo foco en
                arquitectura, organización del código y creación de productos
                digitales sólidos.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-300">
                    FORMACIÓN
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/70 md:text-base">
                    Sistemas Microinformáticos y Redes.{" "}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-lime-400">
                    STACK
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/70 md:text-base">
                    JavaScript, desarrollo web fullstack y arquitectura.{" "}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-fuchsia-300">
                    Objetivo
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/70 md:text-base">
                    Primer empleo en tecnología y crecimiento hacia
                    ciberseguridad.
                  </p>
                </div>
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[28px] border border-lime-400/15 bg-white/[0.04] p-7 backdrop-blur-xl shadow-[0_0_35px_rgba(163,230,53,0.06)] md:col-span-3 md:row-span-3 md:row-start-4 md:min-h-[320px] md:p-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.08),transparent_35%)]" />
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-lime-400/20 bg-lime-400/10 text-lime-400 shadow-[0_0_18px_rgba(163,230,53,0.12)]">
                  <HiOutlineCpuChip className="text-2xl" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">
                    Nodo 02
                  </p>
                  <h3 className="text-xl font-semibold uppercase tracking-[0.12em] text-white md:text-2xl">
                    IA
                  </h3>
                </div>
              </div>

              <p className="text-base leading-8 text-white/72 md:text-lg">
                Uso la inteligencia artificial como apoyo para aprender,
                investigar y resolver problemas, manteniendo siempre el criterio
                técnico sobre el resultado.
                <br /> Conozco y utilizo herramientas como agentes, skills y
                MCPs, pero las aplico de forma estratégica: cuando un proyecto
                requiere velocidad, automatización o exploración rápida. En mi
                flujo habitual prefiero escribir, revisar y entender el código
                por mí mismo.
                <br /> Todo código que incorporo lo analizo, adapto y valido
                antes de usarlo.
                <br /> Veo la IA como una herramienta muy potente si se sabe
                pedir bien, interpretar sus respuestas y mantener una base
                técnica sólida. Mal utilizada, puede convertirse en un arma de
                doble filo.
              </p>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.14, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[28px] border border-fuchsia-300/15 bg-white/[0.04] p-7 backdrop-blur-xl shadow-[0_0_35px_rgba(232,121,249,0.06)] md:col-span-3 md:row-span-3 md:col-start-5 md:row-start-4 md:min-h-[320px] md:p-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(232,121,249,0.08),transparent_35%)]" />
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-fuchsia-300/10 text-fuchsia-300 shadow-[0_0_18px_rgba(232,121,249,0.12)]">
                  <HiOutlineSparkles className="text-2xl" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">
                    Nodo 03
                  </p>
                  <h3 className="text-xl font-semibold uppercase tracking-[0.12em] text-white md:text-2xl">
                    Inquietudes y motivaciones
                  </h3>
                </div>
              </div>

              <p className="text-base leading-8 text-white/72 md:text-lg">
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
