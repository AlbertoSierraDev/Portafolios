export interface Certificate {
  _id: string;
  title: string;
  issuer: string;
  description: string;
  image: string;
  credentialUrl: string | null;
  issueDate: string | null;
  displayOrder: number;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export type PublicCertificate = Omit<Certificate, "visible">;

export type CertificateOrderItem = {
  id: string;
  displayOrder: number;
};
