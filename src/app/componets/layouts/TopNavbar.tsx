'use client';
import React, { useState } from "react";
import Link from "next/link";
import MediaLinks from "../MediaLinks";
import { Menu, X } from "lucide-react";

const TopNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                {/* Branding */}
                <h1 className="text-2xl mx-6 font-bold text-blue-800">
                    Razack <span className="text-black">Developer</span>
                </h1>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex px-10 space-x-6 text-lg font-medium text-gray-600  items-center">
                    <Link href="#about" className="hover:text-blue-800 transition">About</Link>
                     <Link href="#education" className="hover:text-blue-800 transition">Education</Link>
                    <Link href="#skills" className="hover:text-blue-800 transition">Skills</Link>
                    <Link href="#projects" className="hover:text-blue-800 transition">Projects</Link>
                    <Link href="#contact" className="hover:text-blue-800 transition">Contact</Link>
                    <MediaLinks />
                </nav>

                {/* Mobile Menu Toggle */}
                <button onClick={toggleMenu} className="md:hidden text-gray-700 focus:outline-none">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <div className="md:hidden px-6 pb-4">
                    <nav className="flex flex-col space-y-3 text-gray-700 text-base font-medium">
                        <Link href="#about" className="hover:text-blue-800" onClick={toggleMenu}>About</Link>
                        <Link href="#education" className="hover:text-blue-800 transition">Education</Link>
                        <Link href="#skills" className="hover:text-blue-800" onClick={toggleMenu}>Skills</Link>
                        <Link href="#projects" className="hover:text-blue-800" onClick={toggleMenu}>Projects</Link>
                        <Link href="#contact" className="hover:text-blue-800" onClick={toggleMenu}>Contact</Link>
                        <MediaLinks />
                    </nav>
                </div>
            )}
        </header>
    );
};

export default TopNavbar;
