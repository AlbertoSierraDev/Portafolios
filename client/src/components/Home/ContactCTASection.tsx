import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiOutlineArrowRight,
  HiOutlineBriefcase,
  HiOutlineDocumentText,
} from "react-icons/hi2";

export default function ContactCTASection() {
  return (
    <section className="relative px-6 pb-14 pt-0 md:px-10 md:pb-20 md:pt-0">
      <div className="mx-auto max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[32px] border border-cyan-300/15 bg-white/[0.04] p-8 backdrop-blur-xl shadow-[0_0_45px_rgba(34,211,238,0.08)] md:p-12 lg:p-14"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.13),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(232,121,249,0.12),transparent_38%)]" />

          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-cyan-300/10" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full border border-fuchsia-300/10" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-lime-400">
                <HiOutlineBriefcase className="text-lg" />
                Abierto a oportunidades laborales
              </div>

              <h2 className="max-w-4xl text-4xl font-black uppercase leading-tight text-white md:text-6xl">
                Busco incorporarme a un equipo donde seguir creciendo
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 md:text-lg">
                Estoy enfocado en seguir desarrollándome como programador,
                aportar en proyectos reales y aprender dentro de un entorno
                profesional con buenas prácticas de desarrollo.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="flex flex-col gap-4 sm:flex-row lg:flex-col"
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-md border border-cyan-200/60 bg-cyan-200 px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#0D0221] shadow-[0_0_28px_rgba(103,232,249,0.45)] transition hover:bg-cyan-100"
              >
                Contactar
                <HiOutlineArrowRight className="text-lg" />
              </Link>

              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-3 rounded-md border border-white/15 bg-white/[0.03] px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/80 transition hover:border-fuchsia-300/40 hover:text-fuchsia-300"
              >
                Ver proyectos
                <HiOutlineDocumentText className="text-lg" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
