
import React from 'react';
import { Award, Users, Coffee, Heart } from 'lucide-react';

const About = () => {
  const highlights = [
    { icon: Award, label: "5+ Years Experience", desc: "In UX/UI Design" },
    { icon: Users, label: "50+ Projects", desc: "Successfully Delivered" },
    { icon: Coffee, label: "User-Centered", desc: "Design Approach" },
    { icon: Heart, label: "Passionate", desc: "About Great UX" }
  ];

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">About Me</h2>
        <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8">
        <p className="text-lg text-gray-700 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
          I'm a UX Designer with a passion for creating intuitive and engaging digital experiences. 
          Currently working at Zoho, I specialize in user research, interaction design, and prototyping. 
          I believe great design happens when empathy meets functionality.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{item.label}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
