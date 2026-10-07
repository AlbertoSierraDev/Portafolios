import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { visual } from "../../styles/visual";
import profileImage from "../../assets/Foto_mia.png";

export default function HeroSection() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="relative flex min-h-[85svh] items-center px-4 pb-12 pt-28 sm:px-5 md:px-10 md:pb-16 md:pt-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 justify-items-center gap-8 md:gap-10">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="relative h-44 w-44 sm:h-52 sm:w-52 md:h-64 md:w-64 lg:h-80 lg:w-80">
            <div className="absolute -inset-2 rounded-lg border border-cyan-300/15" />
            <div className="absolute -bottom-4 left-5 right-5 h-px bg-lime-400/40" />

            <div className="relative h-full w-full overflow-hidden rounded-lg border border-cyan-300/15 bg-white/[0.035]">
              <img
                src={profileImage}
                alt="Foto de perfil"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(13,2,33,0.08)_35%,rgba(13,2,33,0.32)_100%)]" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
          className="mx-auto w-full max-w-6xl text-center"
        >
          <p className="relative mx-auto mb-3 w-fit max-w-full pb-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-lime-400 sm:text-[10px] md:mb-5 md:text-xl md:tracking-[0.42em]">
            Alberto Sierra Perez
            <span aria-hidden="true" className="absolute bottom-0 left-5 right-5 h-px bg-lime-400/40" />
          </p>

          <h1 className="mb-4 break-words text-3xl font-black uppercase leading-tight text-white sm:text-4xl md:mb-5 md:text-3xl lg:text-5xl">
            <span className="block">SISTEMAS, REDES</span>
            <span className="block text-cyan-200">Y CIBERSEGURIDAD.</span>
          </h1>

          <div className="mx-auto mb-6 max-w-5xl text-center md:mb-8">
            <p className="text-sm leading-7 text-white/70 lg:text-base lg:leading-8">
              Soy Técnico de Soporte IT con formación en sistemas y redes, y
              actualmente continúo especializándome en administración de
              sistemas, cloud y ciberseguridad. Tengo experiencia profesional en
              soporte a usuarios y resolución de incidencias, y complemento mi
              formación con proyectos propios en Windows, Linux, redes y
              Microsoft Azure. También practico ciberseguridad en laboratorios y
              CTFs utilizando herramientas como Burp Suite, Nmap y Wireshark.
              Mis conocimientos de desarrollo, servidores y scripting me
              permiten comprender mejor cómo funcionan las aplicaciones y
              sistemas, automatizar procesos y abordar los problemas desde una
              perspectiva más completa.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row md:gap-4">
            <motion.div
              whileHover={reducedMotion ? undefined : { y: -2 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/projects"
                className={`${visual.button} w-full sm:w-auto`}
              >
                VER PROYECTOS
                <HiOutlineArrowRight className="text-sm md:text-lg" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={reducedMotion ? undefined : { y: -2 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/contact"
                className={`${visual.secondaryButton} w-full sm:w-auto`}
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
