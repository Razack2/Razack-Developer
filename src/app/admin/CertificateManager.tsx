"use client";

import React from "react";
import CrudManager from "./CrudManager";
import { useCrud } from "./useCrude";
import { uploadCertificateImage } from "@/app/lib/uploadcertificates";

interface Certificate {
  id: string;
  title?: string;
  issuer?: string;
  issue_date?: string;
  certificate_url?: string;
  image_url?: string;
}

export default function CertificatesSection() {
  const certificates = useCrud<Certificate>("certificates");

  return (
    <CrudManager
      title="Certificates"
      data={certificates.items}
      loading={certificates.loading}
      onInsert={certificates.insert}
      onUpdate={certificates.update}
      onDelete={(id: string) => certificates.remove(id)}
      getId={(i: Certificate) => String(i.id)}
      mapToForm={(i: Certificate) => ({
        title: i.title ?? "",
        issuer: i.issuer ?? "",
        issue_date: i.issue_date ?? "",
        certificate_url: i.certificate_url ?? "",
        image_url: i.image_url ?? "",
      })}
      fields={[
        { name: "title", label: "Title" },
        { name: "issuer", label: "Issuer" },
        { name: "issue_date", label: "Issue Date", type: "date" },
        { name: "certificate_url", label: "Certificate URL" },
        { name: "image_url", label: "Image", type: "file" },
      ]}
      onFileUpload={async (
        file: File,
        form: Record<string, string>,
        setForm: React.Dispatch<
          React.SetStateAction<Record<string, string>>
        >
      ) => {
        const url = await uploadCertificateImage(file);

        setForm({
          ...form,
          image_url: url,
        });
      }}
    />
  );
}