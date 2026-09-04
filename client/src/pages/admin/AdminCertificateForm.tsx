import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createCertificate,
  getAdminCertificates,
  updateCertificate,
} from "../../api/adminCertificates";
import type { Certificate } from "../../types/certificate";

type FormState = {
  title: string;
  issuer: string;
  description: string;
  credentialUrl: string;
  issueDate: string;
  displayOrder: string;
  visible: boolean;
};

const initialForm: FormState = {
  title: "",
  issuer: "",
  description: "",
  credentialUrl: "",
  issueDate: "",
  displayOrder: "0",
  visible: true,
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

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
  const [currentCertificate, setCurrentCertificate] = useState<Certificate | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
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
        setCurrentCertificate(certificate);
        setForm({
          title: certificate.title,
          issuer: certificate.issuer,
          description: certificate.description,
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

  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl("");
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const target = event.target;
    setForm((current) => ({
      ...current,
      [target.name]: target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value,
    }));
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    if (!file) return;
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("La imagen debe ser JPEG, PNG o WebP.");
      event.target.value = "";
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setError("La imagen no puede superar los 5 MB.");
      event.target.value = "";
      return;
    }
    setError("");
    setSelectedImage(file);
  }

  function validateForm() {
    if (!form.title.trim()) return "El título es obligatorio.";
    if (!form.issuer.trim()) return "La entidad emisora es obligatoria.";
    if (!form.description.trim()) return "La descripción es obligatoria.";
    if (!isEditMode && !selectedImage) return "La imagen es obligatoria al crear un certificado.";
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
    const formData = new FormData();
    formData.append("title", form.title.trim());
    formData.append("issuer", form.issuer.trim());
    formData.append("description", form.description.trim());
    formData.append("credentialUrl", form.credentialUrl.trim());
    formData.append("issueDate", form.issueDate);
    formData.append("displayOrder", form.displayOrder);
    formData.append("visible", String(form.visible));
    if (selectedImage) formData.append("image", selectedImage);
    try {
      if (isEditMode && id) await updateCertificate(id, formData);
      else await createCertificate(formData);
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
        <div><label htmlFor="certificate-image" className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Imagen {isEditMode ? "(opcional)" : "*"}</label><input id="certificate-image" name="image" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-200 file:px-4 file:py-2 file:font-semibold file:text-[#0D0221]" /><p className="mt-2 text-xs text-white/45">JPEG, PNG o WebP. Máximo 5 MB.</p>{(previewUrl || currentCertificate?.image) && <div className="mt-4 overflow-hidden rounded-2xl border border-cyan-300/10 bg-white/[0.03]"><img src={previewUrl || currentCertificate?.image} alt="Vista previa del certificado" className="max-h-72 w-full object-contain" /></div>}</div>
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
