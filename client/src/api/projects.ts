import type { Project } from "../types/project";

const API_URL = "/api/projects";

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener los proyectos");
  }

  return response.json();
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  const response = await fetch(`${API_URL}/${slug}`);

  if (!response.ok) {
    throw new Error("Error al obtener el proyecto");
  }

  return response.json();
}
