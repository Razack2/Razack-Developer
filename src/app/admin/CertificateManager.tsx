"use client";

import CrudManager from "./CrudManager";
import { useCrud } from "./useCrude";
import { uploadCertificateImage } from "@/app/lib/uploadcertificates";

interface Certificate {
  id: string;
  title?: string;
  issuer?: string;
  date?: string;
  link?: string;
  image_url?: string;
  type?: "text" | "date" | "textarea" | "file";
}

interface CertificateForm {
  title?: string;
  issuer?: string;
  date?: string;
  link?: string;
  image_url?: string;
}

type SetForm = (f: CertificateForm) => void;

export default function CertificatesSection() {
  const certificates = useCrud<Certificate>("certificates");

  return (
    <CrudManager
      title="Certificates"
      data={certificates.items}
      loading={certificates.loading}
      onInsert={certificates.insert}
      onUpdate={certificates.update}
      onDelete={certificates.remove}
      getId={(i: Certificate) => String(i.id)}
      mapToForm={(i: Certificate) => i}
      fields={[
        { name: "title", label: "Title" },
        { name: "issuer", label: "Issuer" },
        { name: "date", label: "Date", type: "date" },
        { name: "link", label: "Link" },
        { name: "image_url", label: "Certificate Image", type: "file" },
      ]}
      onFileUpload={async (file:any, form:any, setForm:any) => {
        const url = await uploadCertificateImage(file);

        setForm({
          ...form,
          image_url: url,
        });
      }}
    />
  );
}