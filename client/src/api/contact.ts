const API_URL = "/api/contact";

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  turnstileToken: string;
};

export type ContactMessage = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function sendContactMessage(data: ContactFormData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "No se pudo enviar el mensaje.");
  }

  return result;
}

export async function getContactMessages() {
  const response = await fetch(API_URL, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("No se pudieron cargar los mensajes.");
  }

  return response.json() as Promise<ContactMessage[]>;
}

export async function markContactMessageAsRead(id: string) {
  const response = await fetch(`${API_URL}/${id}/read`, {
    method: "PATCH",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("No se pudo marcar el mensaje como leído.");
  }

  return response.json() as Promise<ContactMessage>;
}

export async function deleteContactMessage(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar el mensaje.");
  }

  return response.json();
}
