"use client";

import TopNavbar from "../componets/layouts/TopNavbar";
import Footer from "../componets/layouts/Footer";
import CertificatesManager from "./CertificateManager"
import CrudManager from "./CrudManager";
import { useCrud } from "./useCrude";

export default function AdminPage() {
  const education = useCrud<any>("education", "start_date");
  const skills = useCrud<any>("skills");
  const projects = useCrud<any>("projects", "created_at");
  const certificates = useCrud<any>("certificates");

  return (
    <>
      <TopNavbar />

      <main className="bg-slate-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">

          <h1 className="text-4xl font-bold">
            Portfolio Admin Dashboard
          </h1>

          <CrudManager
            title="Education"
            data={education.items}
            loading={education.loading}
            onInsert={education.insert}
            onUpdate={education.update}
            onDelete={education.remove}
            getId={(i) => i.id}
            mapToForm={(i) => i}
            fields={[
              { name: "institution", label: "Institution" },
              { name: "qualification", label: "Qualification" },
              { name: "start_date", label: "Start Date", type: "date" },
              { name: "end_date", label: "End Date", type: "date" },
              { name: "description", label: "Description", type: "textarea" },
            ]}
          />

          <CrudManager
            title="Skills"
            data={skills.items}
            loading={skills.loading}
            onInsert={skills.insert}
            onUpdate={skills.update}
            onDelete={skills.remove}
            getId={(i) => i.id}
            mapToForm={(i) => i}
            fields={[
              { name: "name", label: "Skill" },
              { name: "level", label: "Level" },
            ]}
          />

          <CrudManager
            title="Projects"
            data={projects.items}
            loading={projects.loading}
            onInsert={projects.insert}
            onUpdate={projects.update}
            onDelete={projects.remove}
            getId={(i) => i.id}
            mapToForm={(i) => i}
            fields={[
              { name: "title", label: "Title" },
              { name: "description", label: "Description", type: "textarea" },
              { name: "link", label: "Link" },
            ]}
          />

          <CertificatesManager />
        </div>
      </main>

      <Footer />
    </>
  );
}