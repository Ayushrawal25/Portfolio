import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie-player';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLink, faCamera } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import LoadingAnimation from './LoadingAnimation.json'; // Import animation JSON directly

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2300);
    return () => clearTimeout(timer);
  }, []);

  // Toggle menu visibility
  const toggleMenu = () => setIsOpen(!isOpen);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#9c4ed1] backdrop-blur-3xl text-white z-50">
        <Lottie
          loop
          play
          animationData={LoadingAnimation}
          style={{ width: 500, height: 500 }}
        />
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 bg-[#140b32] text-white h-screen flex flex-col items-center p-5 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 md:relative md:translate-x-0`}
      >
        <div className="relative text-center mb-5">
          <div className="bg-[#D3D9D4] px-4 py-7 rounded-lg mb-min mt-12"></div>
          <img
            src="/profile_pic.png"
            alt="Profile"
            className="w-max h-25 absolute rounded-b-lg top-9 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
          <h2 className="text-2xl mt-10">Ayush Rawal</h2>
          <p className="text-[#ff9db2]">Web Developer</p>
        </div>
        <div className="flex gap-8 mb-5">
          <FontAwesomeIcon icon={faEnvelope} />
          <FontAwesomeIcon icon={faLinkedin} />
          <FontAwesomeIcon icon={faGithub} />
          <FontAwesomeIcon icon={faInstagram}/>
        </div>
        <nav className="flex flex-col w-full">
          <a href="#" className="py-2 border-b border-white text-white hover:text-red-400">Home</a>
          <a href="#" className="py-2 border-b border-white text-white hover:text-red-400">About</a>
          <a href="#" className="py-2 border-b border-white text-white hover:text-red-400">Resume</a>
          <a href="#" className="py-2 border-b border-white text-white hover:text-red-400">Portfolio</a>
          <a href="#" className="py-2 border-b border-white text-white hover:text-red-400">Contact</a>
        </nav>
        <button className="mt-auto bg-[#868EBB] text-[#D3D9D4] py-2 px-4 rounded hover:bg-[#0e1c2b]">
          Download CV
        </button>
      </div>

      {/* Menu Toggle Button */}
      <button
        className="md:hidden text-white bg-[#041219] p-2 fixed top-5 right-5 z-50"
        onClick={toggleMenu}
      >
        {isOpen ? '✖' : '☰'}
      </button>

      {/* Main Content */}
      <main className="ml-0 md:ml-64 p-5 flex-grow">
        <section className="mb-10">
          <h1 className="text-4xl font-bold mb-4">Hi, I am Ayush Rawal</h1>
          <h2 className="text-2xl font-bold mb-4">Welcome to my portfolio</h2>
          <p className="text-lg mr-20">
            I am a passionate web developer with experience in creating dynamic
            and responsive websites.
          </p>
        </section>
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Project 1', 'Project 2', 'Project 3'].map((project, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-xl font-bold">{project}</h3>
                <p className="text-sm">Description of {project.toLowerCase()}.</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-bold mb-4">Contact</h2>
          <p className="text-lg">
            Feel free to reach out to me via email or through my social media
            channels.
          </p>
        </section>
      </main>
    </div>
  );
};

export default App;
