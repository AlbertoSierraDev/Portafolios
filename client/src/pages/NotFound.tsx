import { motion, useReducedMotion } from "framer-motion";
import { visual } from "../styles/visual";
import { Link } from "react-router-dom";
import { HiOutlineArrowUpRight } from "react-icons/hi2";

export default function NotFound() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="min-h-screen px-6 pb-20 pt-32 md:px-10">
      <div className="mx-auto flex min-h-[70vh] max-w-[1500px] items-center justify-center">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative w-full max-w-3xl border-y border-white/10 py-10 text-center md:py-12"
        >

          <div className="relative z-10">
            <p className="mb-3 text-[11px] uppercase tracking-[0.4em] text-cyan-300">
              Error 404
            </p>

            <h1 className="break-words text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
              Página no encontrada
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/65 md:text-base">
              La ruta que buscas no existe, ha cambiado o ya no está disponible.
              Vuelve al inicio para seguir explorando la web.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                to="/"
                className={visual.button}
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
