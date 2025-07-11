import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const MediaLinks = () => {
    return (
        <div className="flex space-x-4 mx-15 px-4 place-items-end text-lg">
            <Link href="https://www.github.com/razack2" className="text-gray-400 hover:text-white">
                <FaGithub className="inline ml-1" />
            </Link>
            <Link href="https://www.linkedin.com/in/razack-chimwala-04648a297" className="text-gray-400 hover:text-white">
                <FaLinkedin className="inline ml-1" />
            </Link>
        </div>
    );
};
export default MediaLinks;  