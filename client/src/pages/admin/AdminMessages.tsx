import { useEffect, useMemo, useState } from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineEnvelope,
  HiOutlineInbox,
  HiOutlineTrash,
  HiOutlineUser,
} from "react-icons/hi2";
import {
  deleteContactMessage,
  getContactMessages,
  markContactMessageAsRead,
  type ContactMessage,
} from "../../api/contact";

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const unreadMessages = useMemo(
    () => messages.filter((message) => !message.read).length,
    [messages],
  );

  const readMessages = useMemo(
    () => messages.filter((message) => message.read).length,
    [messages],
  );

  async function loadMessages() {
    try {
      setIsLoading(true);
      setError("");

      const data = await getContactMessages();

      setMessages(data);
    } catch {
      setError("No se pudieron cargar los mensajes.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleMarkAsRead(id: string) {
    try {
      const updatedMessage = await markContactMessageAsRead(id);

      setMessages((prev) =>
        prev.map((message) => (message._id === id ? updatedMessage : message)),
      );
    } catch {
      setError("No se pudo marcar el mensaje como leído.");
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar este mensaje?",
    );

    if (!confirmDelete) return;

    try {
      await deleteContactMessage(id);

      setMessages((prev) => prev.filter((message) => message._id !== id));
    } catch {
      setError("No se pudo eliminar el mensaje.");
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  if (isLoading) {
    return (
      <section className="space-y-6 text-white">
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-cyan-300">
            Admin
          </p>

          <h1 className="text-3xl font-black uppercase text-white md:text-5xl">
            Mensajes
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
            Mensajes recibidos desde el formulario de contacto del portafolio.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl border border-white/10 bg-white/[0.04]"
            />
          ))}
        </div>

        <div className="grid gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-40 animate-pulse rounded-2xl border border-white/10 bg-white/[0.04]"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8 text-white">
      <div>
        <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-cyan-300">
          Admin
        </p>

        <h1 className="text-3xl font-black uppercase text-white md:text-5xl">
          Mensajes
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
          Mensajes recibidos desde el formulario de contacto del portafolio.
          Revisa oportunidades laborales, marca mensajes como leídos o elimina
          los que ya no necesites.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-4 text-sm font-medium text-red-300">
          {error}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
            Total
          </p>

          <p className="mt-3 text-4xl font-black text-white">
            {messages.length}
          </p>
        </div>

        <div className="rounded-2xl border border-lime-400/15 bg-lime-400/10 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-lime-400">
            Sin leer
          </p>

          <p className="mt-3 text-4xl font-black text-white">
            {unreadMessages}
          </p>
        </div>

        <div className="rounded-2xl border border-fuchsia-300/15 bg-fuchsia-300/10 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-fuchsia-300">
            Leídos
          </p>

          <p className="mt-3 text-4xl font-black text-white">{readMessages}</p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="relative overflow-hidden rounded-[28px] border border-cyan-300/15 bg-white/[0.04] p-8 text-center backdrop-blur-xl shadow-[0_0_35px_rgba(34,211,238,0.08)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_35%)]" />

          <div className="relative z-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
              <HiOutlineInbox className="text-3xl" />
            </div>

            <h2 className="text-2xl font-semibold uppercase tracking-[0.08em] text-white">
              No hay mensajes todavía
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/60">
              Cuando alguien use el formulario de contacto del portafolio, sus
              mensajes aparecerán aquí.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-5">
          {messages.map((message) => (
            <article
              key={message._id}
              className={`relative overflow-hidden rounded-[28px] border p-5 backdrop-blur-xl  md:p-6 ${
                message.read
                  ? "border-white/10 bg-white/[0.035] shadow-[0_0_30px_rgba(255,255,255,0.03)]"
                  : "border-cyan-300/25 bg-cyan-300/10 shadow-[0_0_35px_rgba(34,211,238,0.1)]"
              }`}
            >
              <div
                className={`absolute inset-0 ${
                  message.read
                    ? "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.04),transparent_35%)]"
                    : "bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(232,121,249,0.08),transparent_38%)]"
                }`}
              />

              <div className="relative z-10">
                <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      {!message.read ? (
                        <span className="rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-lime-400">
                          Sin leer
                        </span>
                      ) : (
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                          Leído
                        </span>
                      )}

                      <span className="text-xs text-white/40">
                        {new Date(message.createdAt).toLocaleString("es-ES", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>

                    <h2 className="text-2xl font-semibold text-white">
                      {message.subject}
                    </h2>

                    <div className="mt-3 flex flex-col gap-2 text-sm text-white/60 sm:flex-row sm:flex-wrap sm:items-center">
                      <span className="inline-flex items-center gap-2">
                        <HiOutlineUser className="text-cyan-300" />
                        {message.name}
                      </span>

                      <span className="hidden text-white/20 sm:inline">·</span>

                      <a
                        href={`mailto:${message.email}`}
                        className="inline-flex min-w-0 items-center gap-2 text-cyan-300 hover:underline"
                      >
                        <HiOutlineEnvelope className="shrink-0" />
                        <span className="break-all">{message.email}</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 xl:justify-end">
                    {!message.read && (
                      <button
                        type="button"
                        onClick={() => handleMarkAsRead(message._id)}
                        className="inline-flex items-center gap-2 rounded-xl border border-lime-400/30 bg-lime-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-lime-400 transition hover:bg-lime-400/15"
                      >
                        <HiOutlineCheckCircle className="text-base" />
                        Marcar leído
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDelete(message._id)}
                      className="inline-flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-300 transition hover:bg-red-400/15"
                    >
                      <HiOutlineTrash className="text-base" />
                      Eliminar
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/25 p-5">
                  <p className="whitespace-pre-line text-sm leading-7 text-white/75">
                    {message.message}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
