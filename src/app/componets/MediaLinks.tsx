import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const MediaLinks = () => {
  return (
    <div className="flex space-x-6 px-4">
      <Link
        href="https://github.com/razack2"
        target="_blank"
        className="hover:scale-110 transition-all duration-300"
      >
        <FaGithub className="text-5xl text-black" />
      </Link>

      <Link
        href="https://linkedin.com/in/razack-chimwala-04648a297"
        target="_blank"
        className="hover:scale-110 transition-all duration-300"
      >
        <FaLinkedin className="text-5xl text-[#0A66C2]" />
      </Link>
    </div>
  );
};

export default MediaLinks;