import type { PublicCertificate } from "../types/certificate";

const API_URL = "/api/certificates";

export async function getCertificates(): Promise<PublicCertificate[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener los certificados");
  }

  return response.json();
}
