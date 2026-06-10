import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiOutlineArrowRight,
  HiOutlineBriefcase,
  HiOutlineDocumentText,
} from "react-icons/hi2";

export default function ContactCTASection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-5 sm:py-14 md:px-10 md:py-16">
      <div className="mx-auto w-full max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[22px] border border-cyan-300/15 bg-white/[0.04] p-5 backdrop-blur-xl shadow-[0_0_35px_rgba(34,211,238,0.08)] sm:p-6 md:rounded-[32px] md:p-12 lg:p-14"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.13),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(232,121,249,0.12),transparent_38%)]" />

          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-cyan-300/10 md:-right-20 md:-top-20 md:h-56 md:w-56" />
          <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full border border-fuchsia-300/10 md:-bottom-24 md:-left-24 md:h-64 md:w-64" />

          <div className="relative z-10 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-lime-400 sm:text-[10px] md:mb-5 md:gap-3 md:px-4 md:text-[11px] md:tracking-[0.28em]">
                <HiOutlineBriefcase className="text-base md:text-lg" />
                Abierto a oportunidades laborales
              </div>

              <h2 className="max-w-4xl text-2xl font-black uppercase leading-tight text-white sm:text-3xl md:text-6xl">
                BUSCO UN EQUIPO DONDE APORTAR, APRENDER Y CRECER
              </h2>

              <p className="mt-4 max-w-3xl text-[13px] leading-6 text-white/70 sm:text-sm md:mt-6 md:text-lg md:leading-8">
                Estoy preparado para dar el salto al sector tecnológico,
                aportando mi base en sistemas, experiencia creando soluciones
                web y enfoque en desarrollo fullstack. Busco trabajar en
                proyectos reales, con buenas prácticas y un equipo del que
                aprender.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:gap-4"
            >
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-cyan-200/60 bg-cyan-200 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0D0221] shadow-[0_0_24px_rgba(103,232,249,0.4)] transition hover:bg-cyan-100 sm:w-auto md:gap-3 md:px-8 md:py-4 md:text-sm md:tracking-[0.28em]"
              >
                Contactar
                <HiOutlineArrowRight className="text-base md:text-lg" />
              </Link>

              <Link
                to="/projects"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.03] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 transition hover:border-fuchsia-300/40 hover:text-fuchsia-300 sm:w-auto md:gap-3 md:px-8 md:py-4 md:text-sm md:tracking-[0.22em]"
              >
                Ver proyectos
                <HiOutlineDocumentText className="text-base md:text-lg" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
