import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineAcademicCap,
  HiOutlineArrowDown,
  HiOutlineArrowUp,
  HiOutlineCheckCircle,
  HiOutlinePencilSquare,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineXCircle,
} from "react-icons/hi2";
import {
  deleteCertificate,
  getAdminCertificates,
  updateCertificateOrder,
  updateCertificateVisibility,
} from "../../api/adminCertificates";
import type { Certificate } from "../../types/certificate";

function formatIssueDate(value: string | null) {
  if (!value) return "Sin fecha";

  return new Date(value).toLocaleDateString("es-ES", {
    dateStyle: "medium",
  });
}

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyVisibilityId, setBusyVisibilityId] = useState<string | null>(null);
  const [isReordering, setIsReordering] = useState(false);

  async function loadCertificates() {
    try {
      setLoading(true);
      setError("");
      setCertificates(await getAdminCertificates());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar certificados.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCertificates();
  }, []);

  async function handleVisibility(certificate: Certificate) {
    if (busyVisibilityId) return;

    setBusyVisibilityId(certificate._id);
    setError("");

    try {
      const updated = await updateCertificateVisibility(
        certificate._id,
        !certificate.visible,
      );
      setCertificates((current) =>
        current.map((item) => (item._id === updated._id ? updated : item)),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cambiar la visibilidad.");
    } finally {
      setBusyVisibilityId(null);
    }
  }

  async function handleMove(index: number, direction: -1 | 1) {
    if (isReordering) return;

    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= certificates.length) return;

    const next = [...certificates];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    setIsReordering(true);
    setError("");
    setCertificates(next);

    try {
      await updateCertificateOrder(
        next.map((certificate, order) => ({
          id: certificate._id,
          displayOrder: Number(order),
        })),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar el orden.");
      await loadCertificates();
    } finally {
      setIsReordering(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("¿Seguro que quieres eliminar este certificado? También se eliminará su imagen.")) {
      return;
    }

    try {
      setError("");
      await deleteCertificate(id);
      setCertificates((current) => current.filter((item) => item._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar el certificado.");
    }
  }

  if (loading) {
    return (
      <section className="space-y-6 text-white">
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-cyan-300">Admin</p>
          <h1 className="text-3xl font-black uppercase md:text-5xl">Certificados</h1>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-32 animate-pulse rounded-2xl border border-white/10 bg-white/[0.04]" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8 text-white">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-cyan-300">Admin</p>
          <h1 className="text-3xl font-black uppercase md:text-5xl">Certificados</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
            Gestiona las credenciales que aparecerán próximamente en el portfolio.
          </p>
        </div>
        <Link
          to="/admin/certificates/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-200/60 bg-cyan-200 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#0D0221] shadow-[0_0_22px_rgba(103,232,249,0.35)] transition hover:bg-cyan-100"
        >
          <HiOutlinePlus className="text-lg" />
          Nuevo certificado
        </Link>
      </div>

      {error && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-4 text-sm font-medium text-red-300">
          <span>{error}</span>
          <button type="button" onClick={loadCertificates} className="rounded-lg border border-red-300/30 px-3 py-2 text-xs uppercase tracking-[0.16em]">Reintentar</button>
        </div>
      )}

      {certificates.length === 0 ? (
        <div className="relative overflow-hidden rounded-[28px] border border-cyan-300/15 bg-white/[0.04] p-8 text-center backdrop-blur-xl shadow-[0_0_35px_rgba(34,211,238,0.08)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_35%)]" />
          <div className="relative z-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
              <HiOutlineAcademicCap className="text-3xl" />
            </div>
            <h2 className="text-2xl font-semibold uppercase tracking-[0.08em]">Todavía no hay certificados</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/60">Añade tu primera certificación para tenerla lista para la sección pública.</p>
            <Link to="/admin/certificates/new" className="mt-6 inline-flex items-center gap-2 rounded-xl border border-cyan-200/60 bg-cyan-200 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#0D0221]">
              <HiOutlinePlus className="text-lg" />
              Añadir primer certificado
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl">
          <div className="hidden border-b border-white/10 bg-black/20 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40 md:grid md:grid-cols-[1.6fr_1fr_0.7fr_0.8fr_1fr]">
            <span>Certificado</span><span>Emisor</span><span>Orden</span><span>Estado</span><span className="text-right">Acciones</span>
          </div>
          <div className="divide-y divide-white/10">
            {certificates.map((certificate, index) => (
              <article key={certificate._id} className="grid gap-4 px-5 py-5 md:grid-cols-[1.6fr_1fr_0.7fr_0.8fr_1fr] md:items-center md:px-6">
                <div className="flex min-w-0 items-center gap-4">
                  <img src={certificate.image} alt={certificate.title} className="h-16 w-20 shrink-0 rounded-xl border border-cyan-300/15 bg-black/20 object-cover" />
                  <div className="min-w-0">
                    <h2 className="truncate text-lg font-semibold">{certificate.title}</h2>
                    <p className="mt-1 text-sm text-white/50">{formatIssueDate(certificate.issueDate)}</p>
                  </div>
                </div>
                <p className="text-sm text-white/60">{certificate.issuer}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/70">{index + 1}</span>
                  <button type="button" disabled={index === 0 || isReordering} onClick={() => handleMove(index, -1)} aria-label="Mover certificado hacia arriba" className="rounded-lg border border-white/10 p-2 text-white/60 transition hover:border-cyan-300/30 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-30"><HiOutlineArrowUp /></button>
                  <button type="button" disabled={index === certificates.length - 1 || isReordering} onClick={() => handleMove(index, 1)} aria-label="Mover certificado hacia abajo" className="rounded-lg border border-white/10 p-2 text-white/60 transition hover:border-cyan-300/30 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-30"><HiOutlineArrowDown /></button>
                </div>
                <button type="button" disabled={busyVisibilityId === certificate._id} onClick={() => handleVisibility(certificate)} className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] transition disabled:cursor-not-allowed disabled:opacity-50 ${certificate.visible ? "border-lime-400/25 bg-lime-400/10 text-lime-400" : "border-white/10 bg-white/[0.04] text-white/45"}`}>
                  {certificate.visible ? <HiOutlineCheckCircle /> : <HiOutlineXCircle />}{certificate.visible ? "Visible" : "Oculto"}
                </button>
                <div className="flex flex-wrap gap-2 md:justify-end">
                  <Link to={`/admin/certificates/${certificate._id}/edit`} className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-300"><HiOutlinePencilSquare />Editar</Link>
                  <button type="button" onClick={() => handleDelete(certificate._id)} className="inline-flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-red-300"><HiOutlineTrash />Eliminar</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
