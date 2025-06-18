
import React from 'react';
import { Building, Calendar, MapPin } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      company: "Zoho Corporation",
      role: "UX Designer",
      duration: "2021 - Present",
      location: "Chennai, India",
      description: "Leading design initiatives for multiple products, conducting user research, and collaborating with cross-functional teams to deliver exceptional user experiences.",
      achievements: [
        "Redesigned core workflows resulting in 40% improvement in user task completion",
        "Led user research studies with 200+ participants",
        "Mentored junior designers and established design system guidelines"
      ]
    },
    {
      company: "Previous Experience",
      role: "UI/UX Designer",
      duration: "2019 - 2021",
      location: "Chennai, India",
      description: "Focused on mobile app design and user interface optimization for e-commerce platforms.",
      achievements: [
        "Designed mobile apps with 4.8+ star ratings",
        "Increased conversion rates by 25% through UX improvements",
        "Created comprehensive design documentation and style guides"
      ]
    }
  ];

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience</h2>
        <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
      </div>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                <div className="flex items-center gap-2 text-green-600 font-medium">
                  <Building size={18} />
                  <span>{exp.company}</span>
                </div>
              </div>
              <div className="flex flex-col md:items-end gap-2 mt-4 md:mt-0">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} />
                  <span className="text-sm">{exp.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  <span className="text-sm">{exp.location}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">{exp.description}</p>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Key Achievements:</h4>
              <ul className="space-y-2">
                {exp.achievements.map((achievement, achIndex) => (
                  <li key={achIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
