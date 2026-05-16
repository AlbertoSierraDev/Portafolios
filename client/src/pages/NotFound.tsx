import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineArrowUpRight } from "react-icons/hi2";

export default function NotFound() {
  return (
    <section className="min-h-screen px-6 pb-20 pt-32 md:px-10">
      <div className="mx-auto flex min-h-[70vh] max-w-[1500px] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative w-full max-w-3xl overflow-hidden rounded-[28px] border border-cyan-300/10 bg-white/[0.04] p-8 text-center shadow-[0_0_35px_rgba(34,211,238,0.08)] backdrop-blur-xl md:p-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_45%)]" />

          <div className="relative z-10">
            <p className="mb-3 text-[11px] uppercase tracking-[0.4em] text-cyan-300">
              Error 404
            </p>

            <h1 className="text-5xl font-black uppercase text-white md:text-7xl">
              Página no encontrada
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/65 md:text-base">
              La ruta que buscas no existe, ha cambiado o ya no está disponible.
              Vuelve al inicio para seguir explorando la web.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                to="/"
                className="flex items-center gap-2 rounded-md border border-cyan-200/50 bg-cyan-200 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#0D0221] shadow-[0_0_20px_rgba(103,232,249,0.35)] transition-all duration-150 hover:scale-[1.03]"
              >
                Volver al inicio
                <HiOutlineArrowUpRight className="text-base" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
