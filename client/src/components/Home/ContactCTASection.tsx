import { motion, useReducedMotion } from "framer-motion";
import { visual } from "../../styles/visual";
import { Link } from "react-router-dom";
import {
  HiOutlineArrowRight,
  HiOutlineBriefcase,
  HiOutlineDocumentText,
} from "react-icons/hi2";

export default function ContactCTASection() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="relative px-4 py-12 sm:px-5 md:px-10 md:py-16">
      <div className="mx-auto w-full max-w-[1500px]">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative border-y border-white/10 py-8 md:py-12"
        >

          <div className="relative z-10 grid justify-items-center gap-7 text-center lg:gap-10">
            <div>
              <div className="mb-4 inline-flex max-w-full items-center gap-2 text-xs font-medium text-lime-400">
                <HiOutlineBriefcase className="text-base md:text-lg" />
                ABIERTO A OPORTUNIDADES EN IT{" "}
              </div>

              <h2 className="mx-auto max-w-3xl break-words text-2xl font-black uppercase leading-tight text-white sm:text-3xl md:text-4xl">
                BUSCO UN EQUIPO DONDE APORTAR, APRENDER Y CRECER
              </h2>

              <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-white/70 md:mt-5 md:text-base">
                Busco seguir creciendo en el sector IT, aportando mi base en
                sistemas, redes y soporte técnico mientras continúo
                desarrollándome en ciberseguridad. Me interesa formar parte de
                proyectos reales, resolver problemas, aprender y aportar
                soluciones con iniciativa y curiosidad técnica.
              </p>
            </div>

            <motion.div
              whileHover={reducedMotion ? undefined : { y: -2 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row lg:gap-4"
            >
              <Link
                to="/contact"
                className={`${visual.button} w-full sm:w-auto`}
              >
                Contactar
                <HiOutlineArrowRight className="text-base md:text-lg" />
              </Link>

              <Link
                to="/projects"
                className={`${visual.secondaryButton} w-full sm:w-auto`}
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
