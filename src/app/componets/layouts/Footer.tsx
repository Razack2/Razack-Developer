import React from "react";
import Link from "next/link";
import MediaLinks from "../MediaLinks";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8 mt-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    {/* Branding */}
                    <div>
                        <h1 className="text-3xl font-bold">
                            <span className="text-blue-500">Razack</span>{" "}
                            <span className="text-white">Developer</span>
                        </h1>
                        <p className="text-sm text-gray-400 mt-2">
                            &copy; {new Date().getFullYear()} Razack Developer. All rights reserved.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-wrap gap-4 text-sm">

                        <Link href="#about" className="text-gray-400 hover:text-white transition">
                            About
                        </Link>
                        <Link href="#education" className="text-gray-400 hover:text-white transition">Education</Link>
                        <Link href="#skills" className="text-gray-400 hover:text-white transition">
                            Skills
                        </Link>
                        <Link href="#projects" className="text-gray-400 hover:text-white transition">
                            Projects
                        </Link>
                        <Link href="#contact" className="text-gray-400 hover:text-white transition">
                            Contact
                        </Link>
                    </nav>

                    {/* Social Media Links */}
                    <div>
                        <MediaLinks />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
