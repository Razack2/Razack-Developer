import React from 'react';

type SkillBarProps = {
  name: string;
  level: number;
  title: string;
};

const SkillBar = ({ name, level }: SkillBarProps) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-gray-700">{name}</span>
      <span className="text-sm font-medium text-gray-600">{level}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
        style={{ width: `${level}%` }}
      ></div>
    </div>
  </div>
);

type SkillGroupProps = {
  title: string;
  icon: React.ReactNode;
  skills: { name: string; level: number }[];
};

const SkillGroup = ({ title, icon, skills }: SkillGroupProps) => (
  <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
      {icon}
      {title}
    </h3>
    {skills.map((skill, index) => (
      <SkillBar key={index} name={skill.name} level={skill.level} title={title} />
    ))}
  </div>
);

const SkillsSection = () => {
  return (
    <section className="py-16 px-6 bg-white text-center" id='skills'>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Technical Expertise</h2>
      <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
        I have a diverse skill set in both frontend and backend development, with a strong focus on creating efficient,
         scalable, and user-friendly applications. My expertise includes modern web technologies and frameworks,
        allowing me to build robust solutions that meet client needs.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        <SkillGroup
          title="Frontend Development"
          icon={<span role="img" aria-label="frontend">🌐</span>}
          skills={[
            { name: 'React', level: 70 },
            { name: 'TypeScript', level: 80 },
            { name: 'JavaScript', level: 80 },
            { name: 'HTML/CSS', level: 95 },
            { name: 'NextJS', level: 80 },
          ]}
        />

        <SkillGroup
          title="Backend Development"
          icon={<span role="img" aria-label="backend">🧩</span>}
          skills={[
            { name: 'C++', level: 80 },
            { name: 'JAVA', level: 70 },
            { name: 'NodeJS', level: 65 },
          ]}
        />

        <SkillGroup
          title="Database Technologies"
          icon={<span role="img" aria-label="database">🗄️</span>}
          skills={[
            { name: 'Oracle SQL', level: 80 },
            { name: 'MySQL', level: 75 },
          ]}
        />
      </div>
    </section>
  );
};

export default SkillsSection;
