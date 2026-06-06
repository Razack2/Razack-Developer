"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";

export default function HomePage() {
  const [hero, setHero] = useState<any>(null);
  const [education, setEducation] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      // HERO
      const heroRes = await supabase.from("hero").select("*").single();
      setHero(heroRes.data);

      // EDUCATION
      const edu = await supabase.from("education").select("*");
      setEducation(edu.data || []);

      // SKILLS
      const skillsRes = await supabase.from("technical_expertise").select("*");
      setSkills(skillsRes.data || []);

      // PROJECTS
      const proj = await supabase.from("projects").select("*");
      setProjects(proj.data || []);

      // EXPERIENCE
      const exp = await supabase.from("experience").select("*");
      setExperience(exp.data || []);

      // CERTIFICATES
      const cert = await supabase.from("certificates").select("*");
      setCertificates(cert.data || []);
    };

    fetchAll();
  }, []);

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-20">

      {/* HERO */}
      <section className="text-center">
        <h1 className="text-4xl font-bold">
          {hero?.title}
        </h1>
        <p className="text-gray-600 mt-2">
          {hero?.description}
        </p>
      </section>

      {/* EDUCATION */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Education</h2>
        {education.map((item) => (
          <div key={item.id} className="border p-3 mb-2">
            <h3 className="font-semibold">{item.qualification}</h3>
            <p>{item.institution}</p>
          </div>
        ))}
      </section>

      {/* SKILLS */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill.id} className="border px-3 py-1 rounded">
              {skill.skill_name}
            </span>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        {projects.map((project) => (
          <div key={project.id} className="border p-4 mb-3">
            <h3 className="font-semibold">{project.title}</h3>
            <p>{project.description}</p>

            <div className="flex gap-3 mt-2">
              {project.github_url && (
                <a href={project.github_url} target="_blank">
                  GitHub
                </a>
              )}
              {project.live_url && (
                <a href={project.live_url} target="_blank">
                  Live
                </a>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* EXPERIENCE */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Experience</h2>
        {experience.map((exp) => (
          <div key={exp.id} className="border p-3 mb-2">
            <h3 className="font-semibold">{exp.position}</h3>
            <p>{exp.company}</p>
            <p className="text-sm">{exp.description}</p>
          </div>
        ))}
      </section>

      {/* CERTIFICATES */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Certificates</h2>
        <div className="grid grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <div key={cert.id} className="border p-3">
              <img
                src={cert.image_url}
                className="w-full h-40 object-cover"
              />
              <p className="font-semibold mt-2">{cert.title}</p>
              <p className="text-sm">{cert.issuer}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}