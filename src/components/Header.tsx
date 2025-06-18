
import React from 'react';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-green-50 to-green-100 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-500 to-green-600 mx-auto flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold text-white">V</span>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-gray-900">Vikash MJ</h1>
            <p className="text-xl text-green-600 font-medium">UX Designer at Zoho</p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Passionate about creating delightful digital experiences. Designing with empathy and logic to solve complex problems and enhance user satisfaction.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-gray-600">
            <div className="flex items-center gap-2 hover:text-green-600 transition-colors">
              <MapPin size={18} />
              <span>Chennai, India</span>
            </div>
            <div className="flex items-center gap-2 hover:text-green-600 transition-colors">
              <Mail size={18} />
              <span>vikash@zoho.com</span>
            </div>
            <div className="flex items-center gap-2 hover:text-green-600 transition-colors">
              <Globe size={18} />
              <span>vikashmj.com</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
