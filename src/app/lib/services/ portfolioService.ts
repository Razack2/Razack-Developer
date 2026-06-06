import { supabase } from "@/app/lib/supabaseClient";

/* HERO */
export const getHero = async () => {
  return supabase.from("hero").select("*").single();
};

/* EDUCATION */
export const getEducation = async () => {
  return supabase.from("education").select("*");
};

/* SKILLS */
export const getSkills = async () => {
  return supabase.from("technical_expertise").select("*");
};

/* PROJECTS */
export const getProjects = async () => {
  return supabase.from("projects").select("*");
};

/* EXPERIENCE */
export const getExperience = async () => {
  return supabase.from("experience").select("*");
};

/* CERTIFICATES */
export const getCertificates = async () => {
  return supabase.from("certificates").select("*");
};