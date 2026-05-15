import type { Project } from "../types/project";

const API_URL = "/api/admin/projects";

export type ProjectPayload = {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  gallery: string[];
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  challenges: string[];
  solutions: string[];
  featured: boolean;
};

export async function getAdminProjects(): Promise<Project[]> {
  const res = await fetch(API_URL, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Error al cargar proyectos");

  return data;
}

export async function createProject(project: ProjectPayload) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(project),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Error al crear proyecto");

  return data;
}

export async function updateProject(
  id: string,
  project: Partial<ProjectPayload>,
) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(project),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Error al actualizar proyecto");

  return data;
}

export async function deleteProject(id: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Error al eliminar proyecto");

  return data;
}
