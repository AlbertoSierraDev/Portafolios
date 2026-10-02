import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createCertificate,
  getAdminCertificates,
  updateCertificate,
} from "../../api/adminCertificates";

type FormState = {
  title: string;
  issuer: string;
  description: string;
  image: string;
  credentialUrl: string;
  issueDate: string;
  displayOrder: string;
  visible: boolean;
};

const initialForm: FormState = {
  title: "",
  issuer: "",
  description: "",
  image: "",
  credentialUrl: "",
  issueDate: "",
  displayOrder: "0",
  visible: true,
};

function dateInputValue(value: string | null) {
  return value ? value.slice(0, 10) : "";
}

function isValidHttpUrl(value: string) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function AdminCertificateForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    async function loadCertificate() {
      try {
        const certificates = await getAdminCertificates();
        const certificate = certificates.find((item) => item._id === id);
        if (!certificate) {
          setError("Certificado no encontrado.");
          return;
        }
        setForm({
          title: certificate.title,
          issuer: certificate.issuer,
          description: certificate.description,
          image: certificate.image || "",
          credentialUrl: certificate.credentialUrl || "",
          issueDate: dateInputValue(certificate.issueDate),
          displayOrder: String(certificate.displayOrder),
          visible: certificate.visible,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar el certificado.");
      } finally {
        setLoading(false);
      }
    }
    loadCertificate();
  }, [id]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const target = event.target;
    setForm((current) => ({
      ...current,
      [target.name]: target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value,
    }));
  }

  function isValidImageValue(value: string) {
    if (/^\/uploads\/certificates\/[0-9a-f-]+\.(jpg|png|webp)$/i.test(value)) return true;
    try {
      const url = new URL(value);
      return url.protocol === "https:";
    } catch {
      return false;
    }
  }

  function validateForm() {
    if (!form.title.trim()) return "El título es obligatorio.";
    if (!form.issuer.trim()) return "La entidad emisora es obligatoria.";
    if (!form.description.trim()) return "La descripción es obligatoria.";
    if (!form.image.trim()) return "La URL de imagen es obligatoria.";
    if (!isValidImageValue(form.image.trim())) return "La imagen debe ser una URL HTTPS válida.";
    if (!isValidHttpUrl(form.credentialUrl.trim())) return "La URL debe utilizar http o https.";
    if (!/^\d+$/.test(form.displayOrder) || Number(form.displayOrder) < 0) return "El orden debe ser un entero mayor o igual que 0.";
    if (form.issueDate && Number.isNaN(new Date(`${form.issueDate}T00:00:00`).getTime())) return "La fecha de emisión no es válida.";
    return "";
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    setSaving(true);
    setError("");
    const payload = {
      title: form.title.trim(),
      issuer: form.issuer.trim(),
      description: form.description.trim(),
      image: form.image.trim(),
      credentialUrl: form.credentialUrl.trim(),
      issueDate: form.issueDate,
      displayOrder: form.displayOrder,
      visible: form.visible,
    };
    try {
      if (isEditMode && id) await updateCertificate(id, payload);
      else await createCertificate(payload);
      navigate("/admin/certificates");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar el certificado.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <section className="flex min-h-[50vh] items-center justify-center text-white">Cargando certificado...</section>;

  return (
    <section className="space-y-8 text-white">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.4em] text-cyan-300">Panel de control</p>
          <h1 className="text-3xl font-black uppercase md:text-5xl">{isEditMode ? "Editar certificado" : "Nuevo certificado"}</h1>
        </div>
        <Link to="/admin/certificates" className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">Cancelar</Link>
      </div>

      {error && <p className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6 rounded-[28px] border border-cyan-300/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div><label htmlFor="certificate-title" className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Título *</label><input id="certificate-title" name="title" value={form.title} onChange={handleChange} maxLength={160} required className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/40" /></div>
          <div><label htmlFor="certificate-issuer" className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Entidad emisora *</label><input id="certificate-issuer" name="issuer" value={form.issuer} onChange={handleChange} maxLength={160} required className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/40" /></div>
        </div>
        <div><label htmlFor="certificate-description" className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Descripción *</label><textarea id="certificate-description" name="description" value={form.description} onChange={handleChange} maxLength={2000} rows={6} required className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/40" /></div>
        <div><label htmlFor="certificate-image" className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Imagen / URL de imagen *</label><input id="certificate-image" name="image" type="text" inputMode="url" value={form.image} onChange={handleChange} placeholder="https://res.cloudinary.com/..." required className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/40" /><p className="mt-2 text-xs text-white/45">Pega una URL HTTPS pública de la imagen. Los certificados antiguos con /uploads/certificates se conservan durante la transición.</p>{form.image.trim() && <div className="mt-4 overflow-hidden rounded-2xl border border-cyan-300/10 bg-white/[0.03]"><img src={form.image.trim()} alt="Vista previa del certificado" className="max-h-72 w-full object-contain" /></div>}</div>
        <div className="grid gap-6 md:grid-cols-3">
          <div><label htmlFor="certificate-date" className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Fecha de emisión</label><input id="certificate-date" name="issueDate" type="date" value={form.issueDate} onChange={handleChange} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/40" /></div>
          <div><label htmlFor="certificate-url" className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/70">URL de credencial</label><input id="certificate-url" name="credentialUrl" type="url" value={form.credentialUrl} onChange={handleChange} placeholder="https://..." className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/40" /></div>
          <div><label htmlFor="certificate-order" className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Orden</label><input id="certificate-order" name="displayOrder" type="number" min="0" step="1" value={form.displayOrder} onChange={handleChange} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/40" /></div>
        </div>
        <label htmlFor="certificate-visible" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/80"><input id="certificate-visible" type="checkbox" name="visible" checked={form.visible} onChange={handleChange} className="h-4 w-4 accent-cyan-300" />Mostrar certificado</label>
        <div className="flex justify-end"><button type="submit" disabled={saving} className="rounded-xl border border-cyan-200/50 bg-cyan-200 px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#0D0221] shadow-[0_0_20px_rgba(103,232,249,0.35)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70">{saving ? "Guardando..." : isEditMode ? "Guardar cambios" : "Crear certificado"}</button></div>
      </form>
    </section>
  );
}
