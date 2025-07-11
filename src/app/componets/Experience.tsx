import React from "react";
import Link from "next/link";

const Experience = () => {
  const projects = [
    {
      title: "E-Learning Application",
      description: "Created a real-time app using Node.js, and Nextjs.",
    },
  ];

  return (
    <section className="py-6 px-6 bg-gray-50  rounded-xl shadow-sm" id="projects">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Projects & Experience</h1>
        <p className="text-lg text-gray-600 mb-6 text-center"> 
         Take a look at the featured project below. Additional projects will be uploaded shortly.
        </p>
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="p-5 bg-white w-6xs rounded-lg shadow-md hover:shadow-lg transition-shadow"
            ><Link
                href="https://github.com/Razack2" 
                target="_blank" 
                rel="noopener noreferrer"
                 className="text-sm text-blue-500 hover:underline"
              >
              <h2 className="text-2xl font-semibold text-blue-700 hover:text-blue-800">
                {project.title}
              </h2>
            </Link>
             
              <p className="text-gray-600 mt-2">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
