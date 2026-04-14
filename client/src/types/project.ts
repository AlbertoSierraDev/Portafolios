export interface Project {
  _id: string;
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
  createdAt: string;
  updatedAt: string;
}
