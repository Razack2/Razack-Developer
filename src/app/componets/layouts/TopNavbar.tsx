'use client';

import React, { useState } from "react";
import Link from "next/link";
import MediaLinks from "../MediaLinks";
import { Menu, X } from "lucide-react";

const TopNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          <span className="text-blue-700">Razack</span>{" "}
          <span className="text-gray-900">Developer</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">

          <div className="flex items-center gap-6 text-gray-700 font-medium">
            <Link href="/" className="hover:text-blue-700 transition">
              Home
            </Link>

            <Link href="#education" className="hover:text-blue-700 transition">
              Education
            </Link>

            <Link href="#projects" className="hover:text-blue-700 transition">
              Projects
            </Link>

            <Link href="#certificates" className="hover:text-blue-700 transition">
              Certificates
            </Link>

            <Link href="/contact" className="hover:text-blue-700 transition">
              Contact
            </Link>
          </div>

          <MediaLinks />
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="flex flex-col px-6 py-4 space-y-4 text-gray-700">

            <Link href="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>

            <Link href="#education" onClick={() => setIsOpen(false)}>
              Education
            </Link>

            <Link href="#projects" onClick={() => setIsOpen(false)}>
              Projects
            </Link>

            <Link href="#certificates" onClick={() => setIsOpen(false)}>
              Certificates
            </Link>

            <Link href="#contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>

            <div className="pt-3 border-t">
              <MediaLinks />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default TopNavbar;