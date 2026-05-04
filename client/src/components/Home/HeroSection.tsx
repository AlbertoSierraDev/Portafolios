import { motion } from "framer-motion";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <>
      <section className="relative flex min-h-screen items-start md:pt-65">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 md:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex justify-center md:justify-start"
          >
            <div className="relative h-64 w-64 md:h-80 md:w-80 lg:h-[360px] lg:w-[360px]">
              <div className="absolute inset-[-12%] rounded-full bg-cyan-400/15 blur-3xl" />
              <div className="absolute inset-[-4%] rounded-full border border-cyan-300/15" />
              <div className="absolute inset-0 rounded-full border border-cyan-300/30 shadow-[0_0_35px_rgba(34,211,238,0.18)]" />

              <div className="absolute inset-2 rounded-full border border-white/10" />

              <div className="relative h-full w-full overflow-hidden rounded-full border border-cyan-200/20 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.22),rgba(13,2,33,0.7)_45%,rgba(13,2,33,0.95)_75%)] shadow-[0_0_40px_rgba(34,211,238,0.12)]">
                <img
                  src="/avatar.png"
                  alt="Profile"
                  className="h-full w-full object-cover opacity-90"
                />

                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(13,2,33,0.08)_35%,rgba(13,2,33,0.32)_100%)]" />
                <div className="absolute left-0 top-[22%] h-px w-full bg-cyan-300/30 shadow-[0_0_10px_rgba(103,232,249,0.45)]" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.42em] text-lime-400 md:text-xs">
              SISTEMA ACTIVO
            </p>

            <h1 className="mb-7 text-5xl font-black uppercase leading-[0.92] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              <span className="block text-white">Desarrollador</span>
              <span className="block text-white">Fullstack</span>
              <span className="block text-lime-400">Optimizado.</span>
            </h1>

            <div className="mb-8 flex max-w-xl gap-5">
              <div className="mt-1 h-24 w-[2px] shrink-0 bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.85)]" />
              <p className="text-base leading-8 text-white/72 md:text-lg">
                Transformando la complejidad en arquitectura digital elegante,
                especializado en sistemas web de alto rendimiento y experiencias
                de usuario inmersivas.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <Link
                  to="/projects"
                  className="flex items-center justify-center gap-2 rounded-md border border-cyan-200/60 bg-cyan-200 px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#0D0221] shadow-[0_0_24px_rgba(103,232,249,0.5)] transition"
                >
                  VER PROYECTOS
                  <HiOutlineArrowRight className="text-lg" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                <Link
                  to="/contact"
                  className="flex items-center justify-center rounded-md border border-lime-400 px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-lime-400 shadow-[0_0_18px_rgba(163,230,53,0.25)] transition hover:bg-lime-400/10"
                >
                  CONTACTAR
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
