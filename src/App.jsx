// src/App.jsx
import React from 'react';
import './index.css';

const App = () => {
  return (
    <div className="flex">
      <div className="w-64 bg-[#103446] text-white h-screen flex flex-col items-center p-5 fixed top-0 left-0">
        <div className="relative text-center mb-5">
        <div className="bg-[#D3D9D4] p-7 rounded-lg mb-10 mt-3">
            {/* Background Box */}
          </div>
          <img
            src="/profile_pic.png"
            alt="Profile"
            className="w-24 h-24 rounded-full absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
          <h2 className="text-xl">Ayush Rawal</h2>
          <p className="text-[#ff9db2]">Web Developer</p>
        </div>
        <div className="flex gap-3 mb-5">
          <span>📧</span>
          <span>🔗</span>
          <span>🐙</span>
          <span>📸</span>
        </div>
        <nav className="flex flex-col w-full">
          <a href="#" className="py-2 border-b border-gray-700 hover:text-red-400">Home</a>
          <a href="#" className="py-2 border-b border-gray-700 hover:text-red-400">About</a>
          <a href="#" className="py-2 border-b border-gray-700 hover:text-red-400">Resume</a>
          <a href="#" className="py-2 border-b border-gray-700 hover:text-red-400">Services</a>
          <a href="#" className="py-2 border-b border-gray-700 hover:text-red-400">Portfolio</a>
          <a href="#" className="py-2 border-b border-gray-700 hover:text-red-400">Contact</a>
        </nav>
        <button className="mt-auto bg-[#748D92] text-[#D3D9D4] py-2 px-4 rounded hover:bg-[#0e1c2b]">
          Download CV
        </button>
      </div>
      <main className="ml-64 p-5 flex-grow">
        <h1 className="text-3xl mb-4">Welcome to My Portfolio</h1>
        <p>Here is some content about me...</p>
      </main>
    </div>
  );
};

export default App;