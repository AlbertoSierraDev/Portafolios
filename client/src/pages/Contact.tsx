import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineArrowRight,
  HiOutlineEnvelope,
  HiOutlineUser,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineBriefcase,
} from "react-icons/hi2";
import { FaLinkedin } from "react-icons/fa";
import { sendContactMessage } from "../../api/contact";

const EMAIL = "alberto.s.perez.asp@gmail.com";
const LINKEDIN_URL =
  "https://www.linkedin.com/in/alberto-sierra-perez-44811a38a/";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setStatus("sending");
      setError("");

      await sendContactMessage(formData);

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setStatus("success");
    } catch (error) {
      setStatus("error");

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("No se pudo enviar el mensaje.");
      }
    }
  }

  return (
    <main className="relative min-h-screen px-6 py-16 text-white md:px-10 md:py-24">
      <section className="mx-auto max-w-[1500px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-14"
        >
          <p className="mb-3 text-[11px] uppercase tracking-[0.4em] text-cyan-300">
            Contacto
          </p>

          <h1 className="max-w-5xl text-4xl font-black uppercase leading-tight text-white md:text-7xl">
            Hablemos de oportunidades laborales
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-white/70 md:text-lg">
            Estoy abierto a incorporarme a un equipo de desarrollo donde pueda
            aportar, aprender y seguir creciendo profesionalmente. Puedes
            escribirme directamente o contactar conmigo por LinkedIn.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[32px] border border-cyan-300/15 bg-white/[0.04] p-6 backdrop-blur-xl shadow-[0_0_45px_rgba(34,211,238,0.08)] md:p-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(232,121,249,0.1),transparent_38%)]" />

            <div className="relative z-10">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
                  <HiOutlineChatBubbleBottomCenterText className="text-2xl" />
                </div>

                <div>
                  <h2 className="text-2xl font-semibold uppercase tracking-[0.08em] text-white">
                    Enviar mensaje
                  </h2>
                  <p className="mt-1 text-sm text-white/50">
                    El mensaje llegará directamente a mi panel de
                    administración.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
                    Nombre
                  </span>

                  <div className="relative">
                    <HiOutlineUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-cyan-300/70" />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre"
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-12 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/50 focus:bg-cyan-300/5"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
                    Email
                  </span>

                  <div className="relative">
                    <HiOutlineEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-cyan-300/70" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="email@empresa.com"
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-12 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/50 focus:bg-cyan-300/5"
                    />
                  </div>
                </label>
              </div>

              <label className="mt-5 block">
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
                  Asunto
                </span>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Oferta, entrevista, oportunidad laboral..."
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/50 focus:bg-cyan-300/5"
                />
              </label>

              <label className="mt-5 block">
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
                  Mensaje
                </span>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={7}
                  placeholder="Cuéntame sobre la oportunidad o el proceso de selección..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/50 focus:bg-cyan-300/5"
                />
              </label>

              {status === "success" && (
                <p className="mt-5 rounded-2xl border border-lime-400/20 bg-lime-400/10 px-5 py-4 text-sm font-medium text-lime-400">
                  Mensaje enviado correctamente. Gracias por contactar conmigo.
                </p>
              )}

              {status === "error" && (
                <p className="mt-5 rounded-2xl border border-fuchsia-300/20 bg-fuchsia-300/10 px-5 py-4 text-sm font-medium text-fuchsia-300">
                  {error}
                </p>
              )}

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{
                  scale: status === "sending" ? 1 : 1.02,
                  y: status === "sending" ? 0 : -2,
                }}
                whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-md border border-cyan-200/60 bg-cyan-200 px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-[#0D0221] shadow-[0_0_28px_rgba(103,232,249,0.45)] transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
              >
                {status === "sending" ? "Enviando..." : "Enviar mensaje"}
                <HiOutlineArrowRight className="text-lg" />
              </motion.button>
            </div>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16, ease: "easeOut" }}
            className="grid gap-6"
          >
            <div className="relative overflow-hidden rounded-[32px] border border-lime-400/15 bg-white/[0.04] p-7 backdrop-blur-xl shadow-[0_0_35px_rgba(163,230,53,0.08)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.1),transparent_35%)]" />

              <div className="relative z-10">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-lime-400/20 bg-lime-400/10 text-lime-400">
                  <HiOutlineBriefcase className="text-2xl" />
                </div>

                <h2 className="text-2xl font-semibold uppercase tracking-[0.08em] text-white">
                  Disponibilidad
                </h2>

                <p className="mt-4 text-base leading-8 text-white/70">
                  Busco una oportunidad dentro de una empresa donde pueda formar
                  parte de un equipo, trabajar en proyectos reales y seguir
                  mejorando como desarrollador.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[32px] border border-cyan-300/15 bg-white/[0.04] p-7 backdrop-blur-xl shadow-[0_0_35px_rgba(34,211,238,0.08)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_35%)]" />

              <div className="relative z-10">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-300">
                  Contacto directo
                </p>

                <div className="flex flex-col gap-4">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 transition hover:border-cyan-300/40 hover:bg-cyan-300/5"
                  >
                    <span>
                      <span className="block text-xs uppercase tracking-[0.22em] text-white/40">
                        Email
                      </span>
                      <span className="mt-1 block break-all text-sm font-semibold text-white">
                        {EMAIL}
                      </span>
                    </span>

                    <HiOutlineEnvelope className="shrink-0 text-2xl text-cyan-300 transition group-hover:scale-110" />
                  </a>

                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 px-5 py-4 transition hover:border-fuchsia-300/40 hover:bg-fuchsia-300/5"
                  >
                    <span>
                      <span className="block text-xs uppercase tracking-[0.22em] text-white/40">
                        LinkedIn
                      </span>
                      <span className="mt-1 block text-sm font-semibold text-white">
                        Ver perfil profesional
                      </span>
                    </span>

                    <FaLinkedin className="shrink-0 text-2xl text-fuchsia-300 transition group-hover:scale-110" />
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
