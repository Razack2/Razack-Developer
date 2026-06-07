import React from "react";
import Link from "next/link";
import MediaLinks from "../MediaLinks";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold">
              <span className="text-blue-500">Razack</span>{" "}
              Developer
            </h2>

            <p className="text-slate-400 mt-4 leading-relaxed">
              Full Stack Software Developer passionate about
              building modern web applications, scalable systems,
              and exceptional user experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-slate-400">
              <Link href="#education" className="hover:text-white">
                Education
              </Link>

              <Link href="#skills" className="hover:text-white">
                Technical Expertise
              </Link>

              <Link href="#projects" className="hover:text-white">
                Projects
              </Link>

              <Link href="#certificates" className="hover:text-white">
                Certificates
              </Link>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              Connect With Me
            </h3>

            <MediaLinks />

            <p className="text-slate-400 mt-4 text-sm">
              Open to freelance opportunities, collaborations,
              and software development projects.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Razack Developer.
            All rights reserved.
          </p>

          <p className="text-slate-500 text-sm">
            Built with Next.js, TypeScript & Supabase
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;