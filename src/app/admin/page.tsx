"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import Image from "next/image";

type Education = {
  id: string;
  institution: string;
  qualification: string;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
};

type Skill = {
  id: string;
  skill_name: string;
  category: string | null;
  proficiency: number | null;
};

type Project = {
  id: string;
  title: string;
  description: string | null;
  technologies: string | null;
  github_url: string | null;
  live_url: string | null;
  image_url: string | null;
};

type Certificate = {
  id: string;
  title: string | null;
  issuer: string | null;
  image_url: string | null;
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
      {/* FIXED QUOTE ISSUE */}
      <h1>Hi, I&apos;m Razack</h1>

      {/* HERO SECTION (example fix only) */}
      <section>
        <p>Full Stack Software Developer</p>
      </section>

      {/* EDUCATION */}
      <section>
        {education.map((item) => (
          <div key={item.id}>
            <h3>{item.qualification}</h3>
            <p>{item.institution}</p>
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
            <h3>{project.title}</h3>
            <p>{project.description}</p>
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
              style={{ width: "200px", cursor: "pointer" }}
            />
          </div>
        ))}
      </section>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
             alt="profile"
            src={selectedImage}
            style={{ maxWidth: "90%", maxHeight: "90%" }}
          />
        </div>
      )}
    </>
  );
}