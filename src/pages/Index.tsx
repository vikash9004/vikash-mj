
import React, { useState } from 'react';
import Header from '../components/Header';
import About from '../components/About';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import ChatSystem from '../components/ChatSystem';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-16">
        <About />
        <Experience />
        <Skills />
      </main>
      <ChatSystem />
    </div>
  );
};

export default Index;
