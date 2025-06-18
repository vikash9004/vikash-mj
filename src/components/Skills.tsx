
import React from 'react';
import { Palette, Code, Users, BarChart3, Figma, Smartphone } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      icon: Palette,
      title: "Design Tools",
      skills: ["Figma", "Adobe XD", "Sketch", "Adobe Creative Suite", "Principle", "InVision"]
    },
    {
      icon: Code,
      title: "Technical Skills",
      skills: ["HTML/CSS", "JavaScript", "React Basics", "Responsive Design", "CSS Animations"]
    },
    {
      icon: Users,
      title: "UX Research",
      skills: ["User Interviews", "Usability Testing", "Persona Creation", "Journey Mapping", "A/B Testing"]
    },
    {
      icon: BarChart3,
      title: "Analytics",
      skills: ["Google Analytics", "Hotjar", "Mixpanel", "User Behavior Analysis", "Conversion Optimization"]
    }
  ];

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
        <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <category.icon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <span 
                  key={skillIndex}
                  className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium hover:bg-green-100 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
