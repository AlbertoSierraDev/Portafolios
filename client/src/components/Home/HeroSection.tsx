import { motion } from "framer-motion";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import profileImage from "../../assets/Foto_mia.png";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center px-5 py-16 sm:px-6 sm:py-20 md:px-10 md:py-20 lg:py-0">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="order-1 flex justify-center md:order-none md:justify-start"
        >
          <div className="relative h-40 w-40 sm:h-48 sm:w-48 md:h-72 md:w-72 lg:h-[340px] lg:w-[340px]">
            <div className="absolute inset-[-12%] rounded-full bg-cyan-400/15 blur-3xl" />
            <div className="absolute inset-[-4%] rounded-full border border-cyan-300/15" />
            <div className="absolute inset-0 rounded-full border border-cyan-300/30 shadow-[0_0_35px_rgba(34,211,238,0.18)]" />
            <div className="absolute inset-2 rounded-full border border-white/10" />

            <div className="relative h-full w-full overflow-hidden rounded-full border border-cyan-200/20 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.22),rgba(13,2,33,0.7)_45%,rgba(13,2,33,0.95)_75%)] shadow-[0_0_40px_rgba(34,211,238,0.12)]">
              <img
                src={profileImage}
                alt="Foto de perfil"
                className="h-full w-full object-cover opacity-90"
              />

              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(13,2,33,0.08)_35%,rgba(13,2,33,0.32)_100%)]" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
          className="order-2 mx-auto max-w-xl text-center md:order-none md:mx-0 md:max-w-2xl md:text-left"
        >
          <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-lime-400 sm:text-[10px] md:mb-5 md:text-xs md:tracking-[0.42em]">
            SISTEMAS · REDES · CIBERSEGURIDAD
          </p>

          <h1 className="mb-4 text-[1.9rem] font-black uppercase leading-[0.94] text-white sm:text-[2.5rem] md:mb-7 md:text-6xl lg:text-[4rem]">
            <span className="block">SISTEMAS, REDES</span>
            <span className="block text-lime-400">Y CIBERSEGURIDAD.</span>
          </h1>

          <div className="mb-6 flex max-w-xl gap-4 text-left md:mb-8 md:gap-5">
            <div className="mt-1 hidden h-24 w-[2px] shrink-0 bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.85)] sm:block" />

            <p className="text-[13px] leading-6 text-white/72 sm:text-sm sm:leading-7 md:text-lg md:leading-8">
              Soy técnico IT con formación en sistemas y redes, orientando mi
              carrera hacia la ciberseguridad y el pentesting. Me interesa
              entender cómo funcionan los sistemas, redes y aplicaciones para
              identificar sus debilidades y comprender la seguridad desde su
              base. Practico en laboratorios y CTFs trabajando con Linux,
              Windows, redes, seguridad web y herramientas como Burp Suite, Nmap
              y Wireshark. Además, cuento con conocimientos de desarrollo web,
              scripting y servidores, que utilizo como base para comprender
              mejor las aplicaciones y automatizar procesos.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start md:gap-4">
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/projects"
                className="flex w-full items-center justify-center gap-2 rounded-md border border-cyan-200/60 bg-cyan-200 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0D0221] shadow-[0_0_24px_rgba(103,232,249,0.5)] transition sm:w-auto sm:px-6 sm:py-3.5 sm:text-xs md:px-8 md:py-4 md:text-sm md:tracking-[0.28em]"
              >
                VER PROYECTOS
                <HiOutlineArrowRight className="text-sm md:text-lg" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/contact"
                className="flex w-full items-center justify-center rounded-md border border-lime-400 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-lime-400 shadow-[0_0_18px_rgba(163,230,53,0.25)] transition hover:bg-lime-400/10 sm:w-auto sm:px-6 sm:py-3.5 sm:text-xs md:px-8 md:py-4 md:text-sm md:tracking-[0.28em]"
              >
                CONTACTAR
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
