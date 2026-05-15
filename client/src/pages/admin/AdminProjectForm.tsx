import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createProject,
  getAdminProjects,
  updateProject,
} from "../../../api/adminProjects";

type ProjectFormData = {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  gallery: string;
  technologies: string;
  githubUrl: string;
  demoUrl: string;
  challenges: string;
  solutions: string;
  featured: boolean;
};

const initialForm: ProjectFormData = {
  title: "",
  slug: "",
  shortDescription: "",
  fullDescription: "",
  coverImage: "",
  gallery: "",
  technologies: "",
  githubUrl: "",
  demoUrl: "",
  challenges: "",
  solutions: "",
  featured: false,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function AdminProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = useMemo(() => Boolean(id), [id]);

  const [form, setForm] = useState<ProjectFormData>(initialForm);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProject() {
      if (!id) return;

      try {
        const projects = await getAdminProjects();
        const project = projects.find((item) => item._id === id);

        if (!project) {
          setError("Proyecto no encontrado");
          return;
        }

        setForm({
          title: project.title || "",
          slug: project.slug || "",
          shortDescription: project.shortDescription || "",
          fullDescription: project.fullDescription || "",
          coverImage: project.coverImage || "",
          gallery: (project.gallery || []).join("\n"),
          technologies: (project.technologies || []).join("\n"),
          githubUrl: project.githubUrl || "",
          demoUrl: project.demoUrl || "",
          challenges: (project.challenges || []).join("\n"),
          solutions: (project.solutions || []).join("\n"),
          featured: project.featured || false,
        });
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error al cargar el proyecto");
        }
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const target = event.target;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: target.checked,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleGenerateSlug() {
    setForm((prev) => ({
      ...prev,
      slug: slugify(prev.title),
    }));
  }

  function validateForm() {
    if (!form.title.trim()) {
      return "El título es obligatorio";
    }

    if (!form.slug.trim()) {
      return "El slug es obligatorio";
    }

    if (!form.shortDescription.trim()) {
      return "La descripción corta es obligatoria";
    }

    if (!form.fullDescription.trim()) {
      return "La descripción completa es obligatoria";
    }

    if (!form.coverImage.trim()) {
      return "La imagen de portada es obligatoria";
    }

    return "";
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);

    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      shortDescription: form.shortDescription.trim(),
      fullDescription: form.fullDescription.trim(),
      coverImage: form.coverImage.trim(),
      gallery: splitLines(form.gallery),
      technologies: splitLines(form.technologies),
      githubUrl: form.githubUrl.trim(),
      demoUrl: form.demoUrl.trim(),
      challenges: splitLines(form.challenges),
      solutions: splitLines(form.solutions),
      featured: form.featured,
    };

    try {
      if (isEditMode && id) {
        await updateProject(id, payload);
      } else {
        await createProject(payload);
      }

      navigate("/admin/projects");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al guardar el proyecto");
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section className="min-h-screen px-6 pb-20 pt-32 md:px-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-white">Cargando formulario...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-6 pb-20 pt-32 md:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.4em] text-cyan-300">
              Panel de control
            </p>
            <h1 className="text-3xl font-black uppercase text-white md:text-5xl">
              {isEditMode ? "Editar proyecto" : "Nuevo proyecto"}
            </h1>
          </div>

          <Link
            to="/admin/projects"
            className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/80"
          >
            Volver
          </Link>
        </div>

        {error && (
          <p className="mb-6 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-[28px] border border-cyan-300/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-8"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                Título *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                Slug *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/40"
                />
                <button
                  type="button"
                  onClick={handleGenerateSlug}
                  className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300"
                >
                  Generar
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
              Descripción corta *
            </label>
            <textarea
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/40"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
              Descripción completa *
            </label>
            <textarea
              name="fullDescription"
              value={form.fullDescription}
              onChange={handleChange}
              rows={6}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/40"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
              Imagen de portada *
            </label>
            <input
              type="text"
              name="coverImage"
              value={form.coverImage}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/40"
            />

            {form.coverImage.trim() && (
              <div className="mt-4 overflow-hidden rounded-2xl border border-cyan-300/10 bg-white/[0.03]">
                <img
                  src={form.coverImage}
                  alt="Preview portada"
                  className="h-56 w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                GitHub
              </label>
              <input
                type="text"
                name="githubUrl"
                value={form.githubUrl}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                Demo
              </label>
              <input
                type="text"
                name="demoUrl"
                value={form.demoUrl}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/40"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                Tecnologías
              </label>
              <textarea
                name="technologies"
                value={form.technologies}
                onChange={handleChange}
                rows={5}
                placeholder={"React\nTypeScript\nNode.js"}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/40"
              />
              <p className="mt-2 text-xs text-white/45">
                Una tecnología por línea.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                Galería
              </label>
              <textarea
                name="gallery"
                value={form.gallery}
                onChange={handleChange}
                rows={5}
                placeholder={"https://...\nhttps://..."}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/40"
              />
              <p className="mt-2 text-xs text-white/45">
                Una imagen por línea.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                Retos
              </label>
              <textarea
                name="challenges"
                value={form.challenges}
                onChange={handleChange}
                rows={5}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                Soluciones
              </label>
              <textarea
                name="solutions"
                value={form.solutions}
                onChange={handleChange}
                rows={5}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/40"
              />
            </div>
          </div>

          <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white/80">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="h-4 w-4 accent-cyan-300"
            />
            Marcar como proyecto destacado
          </label>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl border border-cyan-200/50 bg-cyan-200 px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#0D0221] shadow-[0_0_20px_rgba(103,232,249,0.35)] transition-all duration-150 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving
                ? "Guardando..."
                : isEditMode
                  ? "Guardar cambios"
                  : "Crear proyecto"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
