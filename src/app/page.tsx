"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import TopNavbar from "./componets/layouts/TopNavbar";
import Footer from "./componets/layouts/Footer";
import ProtectedRoute from "@/app/componets/protectedRoute";
import Image from "next/image";

/* TYPES */
type Education = {
  id: string;
  institution: string;
  qualification: string;
  start_date?: string | null;
  end_date?: string | null;
  description?: string | null;
};

type Skill = {
  id: string;
  skill_name: string;
  category?: string | null;
  proficiency?: number | null;
};

type Project = {
  id: string;
  title: string;
  description?: string | null;
  technologies?: string | null;
  github_url?: string | null;
  live_url?: string | null;
  image_url?: string | null;
};

type Certificate = {
  id: string;
  title?: string | null;
  issuer?: string | null;
  image_url?: string | null;
};

export default function HomePage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const edu = await supabase.from("education").select("*");
      setEducation((edu.data as Education[]) || []);

      const skillsRes = await supabase.from("skills").select("*");
      setSkills((skillsRes.data as Skill[]) || []);

      const proj = await supabase.from("projects").select("*");
      setProjects((proj.data as Project[]) || []);

      const cert = await supabase.from("certificates").select("*");
      setCertificates((cert.data as Certificate[]) || []);
    };

    fetchAll();
  }, []);

  return (
    <ProtectedRoute>
      <TopNavbar />

      <main className="bg-slate-50 min-h-screen">
        {/* HERO */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white min-h-[90vh] flex items-center">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              <div>
                <p className="text-blue-300 font-medium tracking-wider uppercase mb-4">
                  Full Stack Software Developer
                </p>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Hi, I&apos;m Razack
                </h1>

                <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed">
                  I design and build modern web applications,
                  scalable systems, and intuitive user experiences
                  using React, Next.js, TypeScript, Node.js and Supabase.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section>
          {education.map((item) => (
            <div key={item.id}>
              {item.qualification} - {item.institution}
            </div>
          ))}
        </section>

        {/* SKILLS */}
        <section>
          {skills.map((skill) => (
            <span key={skill.id}>{skill.skill_name}</span>
          ))}
        </section>

        {/* PROJECTS */}
        <section>
          {projects.map((project) => (
            <div key={project.id}>
              {project.title}
            </div>
          ))}
        </section>

        {/* CERTIFICATES */}
        <section>
          {certificates.map((cert) => (
            <div key={cert.id}>
              <Image
                src={cert.image_url || ""}
                alt={cert.title || "certificate"}
                onClick={() => setSelectedImage(cert.image_url || "")}
              />
            </div>
          ))}
        </section>

        {/* IMAGE MODAL */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/80 flex items-center justify-center"
          >
            <Image alt="certificates" src={selectedImage} className="max-w-[90%] max-h-[90%]" />
          </div>
        )}
      </main>

      <Footer />
    </ProtectedRoute>
  );
}