"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import TopNavbar from "./componets/layouts/TopNavbar";
import Footer from "./componets/layouts/Footer";
import ProtectedRoute from "@/app/componets/protectedRoute";

export default function HomePage() {
  const [education, setEducation] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {

      const edu = await supabase.from("education").select("*");
      setEducation(edu.data || []);

      const skillsRes = await supabase.from("skills").select("*");
      setSkills(skillsRes.data || []);

      const proj = await supabase.from("projects").select("*");
      setProjects(proj.data || []);

      const cert = await supabase.from("certificates").select("*");
      setCertificates(cert.data || []);
    };

    fetchAll();
  }, []);

  return (
  <>
  <ProtectedRoute>
    <TopNavbar />

    <main className="bg-slate-50 min-h-screen">
      {/* HERO SECTION */}
<section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white min-h-[90vh] flex items-center">
  <div className="max-w-6xl mx-auto px-6 w-full">
    <div className="grid lg:grid-cols-2 gap-12 items-center">

      {/* LEFT SIDE */}
      <div>
        <p className="text-blue-300 font-medium tracking-wider uppercase mb-4">
          Full Stack Software Developer
        </p>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
         Hi, I'm Razack
        </h1>

        <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed">
          I design and build modern web applications,
          scalable systems, and intuitive user experiences
          using React, Next.js, TypeScript, Node.js and Supabase.
        </p>

        <div className="flex flex-wrap gap-4 mt-8">
          <a
            href="#projects"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            View Projects
          </a>

          <a
            href="#certificates"
            className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-slate-900 transition"
          >
            View Certificates
          </a>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-center lg:justify-end">
        <div className="relative">

          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-blue-500 blur-[100px] opacity-30"></div>

          {/* Image */}
          <img
            src="/profile.jpg"
            alt="Razack"
            className="
              relative
              w-72
              h-72
              md:w-96
              md:h-96
              object-cover
              rounded-full
              border-4
              border-white/20
              shadow-2xl
            "
          />
        </div>
      </div>

    </div>
  </div>
</section>
    
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
        {/* EDUCATION */}
        <section id="education" >
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-blue-600 pl-4">
            Education
          </h2>

          <div className="grid gap-6">
            {education.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold">
                  {item.qualification}
                </h3>

                <p className="text-gray-600 mt-2">
                  {item.institution}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-blue-600 pl-4">
            Technical Expertise
          </h2>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="bg-blue-600 text-white px-4 py-2 rounded-full shadow"
              >
                {skill.skill_name}
              </span>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-blue-600 pl-4">
            Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold mb-3">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>

                <div className="flex gap-4">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-gray-900 text-white px-4 py-2 rounded-lg"
                    >
                      GitHub
                    </a>
                  )}

                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* CERTIFICATES */}
        <section id="certificates">
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-blue-600 pl-4">
            Certificates
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={cert.image_url}
                  alt={cert.title}
                  className="w-full h-56 object-cover cursor-pointer"
                  onClick={() => setSelectedImage(cert.image_url)}
                />

                {selectedImage && (
                  <div
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                    onClick={() => setSelectedImage(null)}
                  >
                    <img
                      src={selectedImage}
                      className="max-w-[90%] max-h-[90%] rounded shadow-lg"
                      alt="Selected certificate"
                    />
                  </div>
                )}

                <div className="p-4">
                  <h3 className="font-semibold text-lg">
                    {cert.title}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    {cert.issuer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>

    <Footer />
    </ProtectedRoute>
  </>
);
}