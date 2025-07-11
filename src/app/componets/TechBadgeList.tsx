import React from "react";

const techStack = [ "React", "NodeJS", "Tailwind CSS", "TypeScript" ];

const TechBadgeList = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {techStack.map((tech, index) => (
        <span
          key={index}
          className="bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-full text-sm shadow-sm"
        >
          {tech}
        </span>
      ))}
    </div>
  );
};

export default TechBadgeList;
