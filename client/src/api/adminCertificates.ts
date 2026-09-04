import type {
  Certificate,
  CertificateOrderItem,
} from "../types/certificate";

const API_URL = "/api/admin/certificates";

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

export async function createCertificate(formData: FormData): Promise<Certificate> {
  const response = await fetch(API_URL, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  return parseResponse(response);
}

export async function updateCertificate(
  id: string,
  formData: FormData,
): Promise<Certificate> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    credentials: "include",
    body: formData,
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
