import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlinePencilSquare,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineFolder,
} from "react-icons/hi2";
import { getAdminProjects, deleteProject } from "../../api/adminProjects";
import type { Project } from "../../types/project";

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminProjects();

      setProjects(data);
    } catch {
      setError("Error al cargar proyectos.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm(
      "¿Seguro que quieres eliminar este proyecto?",
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(id);

      setProjects((prev) => prev.filter((project) => project._id !== id));
    } catch {
      setError("Error al eliminar el proyecto.");
    }
  }

  if (loading) {
    return (
      <section className="space-y-6 text-white">
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-cyan-300">
            Admin
          </p>

          <h1 className="text-3xl font-black uppercase text-white md:text-5xl">
            Proyectos
          </h1>
        </div>

        <div className="grid gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl border border-white/10 bg-white/[0.04]"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8 text-white">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.35em] text-cyan-300">
            Admin
          </p>

          <h1 className="text-3xl font-black uppercase text-white md:text-5xl">
            Proyectos
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
            Gestiona los proyectos que aparecen en el portafolio: crea nuevos
            casos, edita contenido existente o elimina proyectos antiguos.
          </p>
        </div>

        <Link
          to="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-200/60 bg-cyan-200 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#0D0221] shadow-[0_0_22px_rgba(103,232,249,0.35)] transition hover:bg-cyan-100"
        >
          <HiOutlinePlus className="text-lg" />
          Nuevo proyecto
        </Link>
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
            {projects.length}
          </p>
        </div>

        <div className="rounded-2xl border border-lime-400/15 bg-lime-400/10 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-lime-400">
            Destacados
          </p>
          <p className="mt-3 text-4xl font-black text-white">
            {projects.filter((project) => project.featured).length}
          </p>
        </div>

        <div className="rounded-2xl border border-fuchsia-300/15 bg-fuchsia-300/10 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-fuchsia-300">
            Visibles
          </p>
          <p className="mt-3 text-4xl font-black text-white">
            {projects.length}
          </p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="relative overflow-hidden rounded-[28px] border border-cyan-300/15 bg-white/[0.04] p-8 text-center backdrop-blur-xl shadow-[0_0_35px_rgba(34,211,238,0.08)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_35%)]" />

          <div className="relative z-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
              <HiOutlineFolder className="text-3xl" />
            </div>

            <h2 className="text-2xl font-semibold uppercase tracking-[0.08em] text-white">
              No hay proyectos todavía
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/60">
              Crea tu primer proyecto para que aparezca en el listado público y
              en la sección de proyectos destacados del home.
            </p>

            <Link
              to="/admin/projects/new"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-200/60 bg-cyan-200 px-5 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#0D0221] transition hover:bg-cyan-100"
            >
              <HiOutlinePlus className="text-lg" />
              Crear proyecto
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl">
          <div className="hidden border-b border-white/10 bg-black/20 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40 md:grid md:grid-cols-[1.4fr_1fr_0.7fr_0.8fr]">
            <span>Proyecto</span>
            <span>Slug</span>
            <span>Estado</span>
            <span className="text-right">Acciones</span>
          </div>

          <div className="divide-y divide-white/10">
            {projects.map((project) => (
              <article
                key={project._id}
                className="grid gap-4 px-5 py-5 transition hover:bg-white/[0.03] md:grid-cols-[1.4fr_1fr_0.7fr_0.8fr] md:items-center md:px-6"
              >
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {project.title}
                  </h2>

                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-white/50">
                    {project.shortDescription || "Sin descripción breve."}
                  </p>
                </div>

                <p className="break-all rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/60 md:bg-transparent md:px-0 md:py-0 md:border-0">
                  {project.slug}
                </p>

                <div>
                  {project.featured ? (
                    <span className="inline-flex rounded-full border border-lime-400/25 bg-lime-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-lime-400">
                      Destacado
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">
                      Normal
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 md:justify-end">
                  <Link
                    to={`/projects/${project.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/60 transition hover:border-cyan-300/30 hover:text-cyan-300"
                  >
                    Ver
                  </Link>

                  <Link
                    to={`/admin/projects/${project._id}/edit`}
                    className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/25 bg-cyan-300/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300 transition hover:bg-cyan-300/15"
                  >
                    <HiOutlinePencilSquare className="text-base" />
                    Editar
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(project._id)}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-400/25 bg-red-400/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-red-300 transition hover:bg-red-400/15"
                  >
                    <HiOutlineTrash className="text-base" />
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
