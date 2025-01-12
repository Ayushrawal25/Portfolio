// src/App.jsx
import React, { useState, useEffect } from "react";
import Lottie from "react-lottie-player";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLink,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import LoadingAnimation from "./LoadingAnimation.json"; // Import animation JSON directly

const Typewriter = ({ texts, typingSpeed = 150, pauseTime = 2000 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[currentTextIndex];
      if (isDeleting) {
        if (currentCharIndex > 0) {
          setDisplayedText(currentText.substring(0, currentCharIndex - 1));
          setCurrentCharIndex(currentCharIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        if (currentCharIndex < currentText.length) {
          setDisplayedText(currentText.substring(0, currentCharIndex + 1));
          setCurrentCharIndex(currentCharIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      }
    };

    const typingInterval = setInterval(
      handleTyping,
      isDeleting ? typingSpeed / 2 : typingSpeed
    );

    return () => clearInterval(typingInterval);
  }, [
    currentCharIndex,
    isDeleting,
    texts,
    typingSpeed,
    pauseTime,
    currentTextIndex,
  ]);

  return (
    <span className="inline-block">
      {displayedText}
      <span className="blinking-cursor">|</span>
    </span>
  );
};

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Toggle menu visibility
  const toggleMenu = () => setIsOpen(!isOpen);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#020621] backdrop-blur-3xl text-white z-50">
        <Lottie
          loop
          play
          animationData={LoadingAnimation}
          style={{
            width: "50vw",
            height: "50vw",
            maxWidth: "500px",
            maxHeight: "500px",
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 md:w-56 lg:w-64 bg-[#1c325b] text-white h-screen flex flex-col items-center p-5 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0`}
      >
        <div className="relative text-center mb-5">
          <div className="bg-[#D3D9D4] px-4 py-7 rounded-lg mb-min mt-12"></div>
          <img
            src="/profile_pic.png"
            alt="Profile"
            className="w-24 h-24 md:w-32 md:h-32 absolute rounded-full top-9 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
          <h2 className="text-2xl mt-20">Ayush Rawal</h2>
          <p className="text-[#ff9db2] h-6">
            <Typewriter
              texts={["Web Developer", "Creative Coder", "Tech Enthusiast"]}
            />
          </p>
        </div>
        <div className="flex gap-8 mb-5">
          <FontAwesomeIcon icon={faEnvelope} />
          <FontAwesomeIcon icon={faLinkedin} />
          <FontAwesomeIcon icon={faGithub} />
          <FontAwesomeIcon icon={faInstagram} />
        </div>
        <nav className="flex flex-col w-full">
          <a
            href="#home"
            className="py-2 border-b border-white text-white hover:text-red-400"
          >
            Home
          </a>
          <a
            href="#about"
            className="py-2 border-b border-white text-white hover:text-red-400"
          >
            About
          </a>
          <a
            href="#resume"
            className="py-2 border-b border-white text-white hover:text-red-400"
          >
            Resume
          </a>
          <a
            href="#portfolio"
            className="py-2 border-b border-white text-white hover:text-red-400"
          >
            Portfolio
          </a>
          <a
            href="#contact"
            className="py-2 border-b border-white text-white hover:text-red-400"
          >
            Contact
          </a>
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
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Main Content */}
      <main className="ml-0 md:ml-30 p-5 flex-grow">
        <section
          id="home"
          className="mt-7 mb-10 flex flex-col md:flex-row items-center justify-between"
        >
          <div className="md:w-1/2 text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Ayush Rawal
            </h1>
            <h2 className="text-lg md:text-xl text-[#ff9db2] mb-4">
              Web Developer
            </h2>
            <p className="text-sm md:text-lg text-white mb-6">
              I am a passionate web developer with experience in creating
              dynamic and responsive websites. I love to build web applications
              that solve real-world problems and enhance user experiences.
            </p>
            <div className="flex gap-4">
              <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                View Work
              </button>
              <button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
                Contact Me
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mt-5 md:mt-0 flex justify-center">
            <img src="./HomePage.png" className="w-100 h-100 md:w-70 md:h-70" />
          </div>
        </section>
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["Project 1", "Project 2", "Project 3"].map((project, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-xl font-bold">{project}</h3>
                <p className="text-sm">
                  Description of {project.toLowerCase()}.
                </p>
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
