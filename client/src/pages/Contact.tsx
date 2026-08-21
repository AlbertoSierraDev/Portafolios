import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import {
  HiOutlineArrowRight,
  HiOutlineEnvelope,
  HiOutlineUser,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineBriefcase,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { FaLinkedin } from "react-icons/fa";
import { sendContactMessage } from "../api/contact";

const EMAIL = "alberto.s.perez.asp@gmail.com";
const LINKEDIN_URL =
  "https://www.linkedin.com/in/alberto-sierra-perez-44811a38a/";

export default function Contact() {
  const turnstileRef = useRef<TurnstileInstance>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [turnstileToken, setTurnstileToken] = useState("");

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [error, setError] = useState("");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (status === "success" || status === "error") {
      setStatus("idle");
      setError("");
    }
  }

  const handleSubmit: React.ComponentProps<"form">["onSubmit"] = async (
    event,
  ) => {
    event.preventDefault();

    if (!turnstileToken) {
      setStatus("error");
      setError("Completa la verificación anti-bots antes de enviar.");
      return;
    }

    try {
      setStatus("sending");
      setError("");

      await sendContactMessage({
        ...formData,
        turnstileToken,
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTurnstileToken("");
      turnstileRef.current?.reset();

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setTurnstileToken("");
      turnstileRef.current?.reset();

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("No se pudo enviar el mensaje.");
      }
    }
  };

  const isSubmitDisabled = status === "sending" || !turnstileToken;

  return (
    <main className="relative min-h-screen px-4 py-24 text-white sm:px-5 md:px-10 md:py-24">
      <section className="mx-auto max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-9 md:mb-14"
        >
          <p className="mb-2 text-[9px] uppercase tracking-[0.28em] text-cyan-300 md:mb-3 md:text-[11px] md:tracking-[0.4em]">
            Contacto
          </p>

          <h1 className="max-w-4xl text-3xl font-black uppercase leading-[1.05] text-white sm:text-4xl md:text-5xl">
            HABLEMOS DE TECNOLOGÍA, PROYECTOS Y OPORTUNIDADES
          </h1>

          <p className="mt-4 max-w-3xl text-[13px] leading-6 text-white/70 sm:text-sm md:mt-5 md:text-base md:leading-7">
            Estoy abierto a oportunidades laborales y colaboraciones donde pueda
            aportar mis conocimientos en sistemas, redes, desarrollo y
            ciberseguridad, mientras continúo aprendiendo y creciendo
            profesionalmente.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[22px] border border-cyan-300/15 bg-white/[0.04] p-5 backdrop-blur-xl shadow-[0_0_35px_rgba(34,211,238,0.08)] sm:p-6 md:rounded-[32px] md:p-8 md:shadow-[0_0_45px_rgba(34,211,238,0.08)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(232,121,249,0.1),transparent_38%)]" />

            <div className="relative z-10">
              <div className="mb-6 flex items-center gap-3 md:mb-8">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border border-cyan-300/20 bg-cyan-300/10 text-cyan-300 md:h-12 md:w-12 md:rounded-2xl">
                  <HiOutlineChatBubbleBottomCenterText className="text-xl md:text-2xl" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold uppercase tracking-[0.08em] text-white md:text-2xl">
                    Enviar mensaje
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-white/50 md:text-sm">
                    Cuéntame tu propuesta, oportunidad o idea de proyecto.
                    <br />
                    48h máximo respuesta.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 md:gap-5">
                <label className="block">
                  <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 md:text-[11px] md:tracking-[0.24em]">
                    Nombre
                  </span>

                  <div className="relative">
                    <HiOutlineUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-cyan-300/70 md:text-xl" />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre"
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-11 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/50 focus:bg-cyan-300/5 md:px-12 md:py-4"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 md:text-[11px] md:tracking-[0.24em]">
                    Email
                  </span>

                  <div className="relative">
                    <HiOutlineEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-cyan-300/70 md:text-xl" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="email@empresa.com"
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-11 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/50 focus:bg-cyan-300/5 md:px-12 md:py-4"
                    />
                  </div>
                </label>
              </div>

              <label className="mt-4 block md:mt-5">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 md:text-[11px] md:tracking-[0.24em]">
                  Asunto
                </span>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Oferta, entrevista, oportunidad laboral..."
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/50 focus:bg-cyan-300/5 md:px-5 md:py-4"
                />
              </label>

              <label className="mt-4 block md:mt-5">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 md:text-[11px] md:tracking-[0.24em]">
                  Mensaje
                </span>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Cuéntame sobre la oportunidad o el proceso de selección..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm leading-6 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/50 focus:bg-cyan-300/5 md:px-5 md:py-4 md:leading-7"
                />
              </label>

              <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-3 md:mt-6 md:p-4">
                <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45 md:text-xs md:tracking-[0.2em]">
                  <HiOutlineShieldCheck className="text-base text-lime-400 md:text-lg" />
                  Verificación anti-bots
                </div>

                {import.meta.env.VITE_TURNSTILE_SITE_KEY ? (
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                    onSuccess={(token) => {
                      setTurnstileToken(token);
                      setError("");

                      if (status === "error") {
                        setStatus("idle");
                      }
                    }}
                    onError={() => {
                      setTurnstileToken("");
                      setStatus("error");
                      setError("No se pudo cargar la verificación anti-bots.");
                    }}
                    onExpire={() => {
                      setTurnstileToken("");
                    }}
                    options={{
                      theme: "dark",
                      size: "flexible",
                    }}
                  />
                ) : (
                  <p className="text-sm leading-7 text-fuchsia-300">
                    Falta configurar VITE_TURNSTILE_SITE_KEY en el frontend.
                  </p>
                )}
              </div>

              {status === "success" && (
                <p className="mt-5 rounded-2xl border border-lime-400/20 bg-lime-400/10 px-4 py-3 text-sm font-medium text-lime-400 md:px-5 md:py-4">
                  Mensaje enviado correctamente. Gracias por contactar conmigo.
                </p>
              )}

              {status === "error" && (
                <p className="mt-5 rounded-2xl border border-fuchsia-300/20 bg-fuchsia-300/10 px-4 py-3 text-sm font-medium text-fuchsia-300 md:px-5 md:py-4">
                  {error}
                </p>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitDisabled}
                whileHover={{
                  scale: isSubmitDisabled ? 1 : 1.02,
                  y: isSubmitDisabled ? 0 : -2,
                }}
                whileTap={{ scale: isSubmitDisabled ? 1 : 0.98 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-cyan-200/60 bg-cyan-200 px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0D0221] shadow-[0_0_24px_rgba(103,232,249,0.45)] transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-60 md:mt-7 md:w-auto md:gap-3 md:px-8 md:py-4 md:text-sm md:tracking-[0.28em]"
              >
                {status === "sending" ? "Enviando..." : "Enviar mensaje"}
                <HiOutlineArrowRight className="text-base md:text-lg" />
              </motion.button>
            </div>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16, ease: "easeOut" }}
            className="grid gap-5 md:gap-6"
          >
            <div className="relative overflow-hidden rounded-[22px] border border-lime-400/15 bg-white/[0.04] p-5 backdrop-blur-xl shadow-[0_0_30px_rgba(163,230,53,0.08)] md:rounded-[32px] md:p-7 md:shadow-[0_0_35px_rgba(163,230,53,0.08)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.1),transparent_35%)]" />

              <div className="relative z-10">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[16px] border border-lime-400/20 bg-lime-400/10 text-lime-400 md:mb-5 md:h-12 md:w-12 md:rounded-2xl">
                  <HiOutlineBriefcase className="text-xl md:text-2xl" />
                </div>

                <h2 className="text-xl font-semibold uppercase tracking-[0.08em] text-white md:text-2xl">
                  Disponibilidad
                </h2>

                <p className="mt-3 text-sm leading-7 text-white/70 md:mt-4 md:text-base md:leading-8">
                  Estoy abierto a oportunidades dentro del sector IT,
                  especialmente en sistemas, redes, soporte técnico y
                  ciberseguridad. Busco un entorno donde pueda aportar mi base
                  técnica, afrontar nuevos retos y seguir desarrollándome
                  profesionalmente.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[22px] border border-cyan-300/15 bg-white/[0.04] p-5 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.08)] md:rounded-[32px] md:p-7 md:shadow-[0_0_35px_rgba(34,211,238,0.08)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_35%)]" />

              <div className="relative z-10">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300 md:mb-5 md:text-[11px] md:tracking-[0.3em]">
                  Contacto directo
                </p>

                <div className="flex flex-col gap-3 md:gap-4">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 transition hover:border-cyan-300/40 hover:bg-cyan-300/5 md:gap-4 md:px-5 md:py-4"
                  >
                    <span className="min-w-0">
                      <span className="block text-[10px] uppercase tracking-[0.18em] text-white/40 md:text-xs md:tracking-[0.22em]">
                        Email
                      </span>
                      <span className="mt-1 block break-all text-xs font-semibold text-white sm:text-sm">
                        {EMAIL}
                      </span>
                    </span>

                    <HiOutlineEnvelope className="shrink-0 text-xl text-cyan-300 transition group-hover:scale-110 md:text-2xl" />
                  </a>

                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 transition hover:border-fuchsia-300/40 hover:bg-fuchsia-300/5 md:gap-4 md:px-5 md:py-4"
                  >
                    <span className="min-w-0">
                      <span className="block text-[10px] uppercase tracking-[0.18em] text-white/40 md:text-xs md:tracking-[0.22em]">
                        LinkedIn
                      </span>
                      <span className="mt-1 block text-xs font-semibold text-white sm:text-sm">
                        Ver perfil profesional
                      </span>
                    </span>

                    <FaLinkedin className="shrink-0 text-xl text-fuchsia-300 transition group-hover:scale-110 md:text-2xl" />
                  </a>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>
    </main>
  );
}
