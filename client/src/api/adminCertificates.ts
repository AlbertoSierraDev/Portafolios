import type {
  Certificate,
  CertificateOrderItem,
} from "../types/certificate";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

const API_URL = `${API_BASE_URL}/api/admin/certificates`;

export type CertificatePayload = {
  title: string;
  issuer: string;
  description: string;
  image: string;
  credentialUrl: string;
  issueDate: string;
  displayOrder: string;
  visible: boolean;
};

async function parseResponse(response: Response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Error al gestionar el certificado");
  }

  return data;
}

export async function getAdminCertificates(): Promise<Certificate[]> {
  const response = await fetch(API_URL, { credentials: "include" });
  return parseResponse(response);
}

export async function createCertificate(payload: CertificatePayload): Promise<Certificate> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
}

export async function updateCertificate(
  id: string,
  payload: CertificatePayload,
): Promise<Certificate> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
}

export async function updateCertificateVisibility(
  id: string,
  visible: boolean,
): Promise<Certificate> {
  const response = await fetch(`${API_URL}/${id}/visibility`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ visible }),
  });

  return parseResponse(response);
}

export async function updateCertificateOrder(
  items: CertificateOrderItem[],
): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/order`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ items }),
  });

  return parseResponse(response);
}

export async function deleteCertificate(id: string): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  return parseResponse(response);
}
