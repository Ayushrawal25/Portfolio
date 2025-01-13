// App.jsx
import React, { useState, useEffect } from "react";
import Lottie from "react-lottie-player";
import "./index.css";
import LoadingAnimation from "./LoadingAnimation.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCamera } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { useInView } from "react-intersection-observer";

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

const Section = ({ id, children }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <section
      id={id}
      ref={ref}
      className={`transition-opacity duration-1000 ${
        inView ? "fade-in" : "fade-out"
      }`}
    >
      {children}
    </section>
  );
};

const SeparatorLine = () => {
  return (
    <div className="w-[95%] md:w-[85%] lg:w-[75%] max-w-[800px] h-[2px] mx-auto my-8">
      <div className="h-full bg-gradient-to-r from-[#ff2e63] via-[#8e44ad] to-[#4834d4]"></div>
    </div>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#05091d] backdrop-blur-3xl text-white z-50">
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
    <div className="flex bg-[#02071f] min-h-screen">
      {/* Sidebar */}
      <div
        className={`w-72 bg-[#1c325b00] text-[#faf8f9] h-screen flex flex-col items-center p-5 fixed left-0 top-0 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0 z-50`}
      >
        {/* Profile Section */}
        <div className="ml-3 mb-10 mt-11"></div>
        <img
          src="/profile_pic.png"
          alt="Profile"
          className="w-max h-28 rounded-full absolute top-14 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
        <div className="text-center mt-5 mb-5">
          <h2 className="text-3xl font-serif text-[#ffffff] pop-up delay-1">
            Ayush Rawal
          </h2>
          <p className="text-xl text-[#ff9fb2] pop-up delay-2">
            <Typewriter
              texts={["Web Developer", "Creative Coder", "Tech Enthusiast"]}
            />
          </p>
        </div>
        {/* Social Icons */}
        <div className="flex gap-10 mb-5 pop-up delay-3">
          <FontAwesomeIcon icon={faEnvelope} />
          <FontAwesomeIcon icon={faLinkedin} />
          <FontAwesomeIcon icon={faGithub} />
          <FontAwesomeIcon icon={faInstagram} />
        </div>
        {/* Navigation Links */}
        <nav className="flex flex-col w-full pop-up delay-4">
          <a
            href="#home"
            className="text-white py-3 border-b border-white hover:text-red-400 transition-colors"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-white py-3 border-b border-white hover:text-red-400 transition-colors"
          >
            About
          </a>
          <a
            href="#resume"
            className="text-white py-3 border-b border-white hover:text-red-400 transition-colors"
          >
            Resume
          </a>
          <a
            href="#Skills"
            className="text-white py-3 border-b border-white hover:text-red-400 transition-colors"
          >
            Skills
          </a>
          <a
            href="#contact"
            className="text-white py-3 border-b border-white hover:text-red-400 transition-colors"
          >
            Contact
          </a>
        </nav>
        <button className="mt-auto bg-[#191054] text-[#ffffff] p-3 rounded-lg cursor-pointer hover:bg-[#0e1c2b] transition-colors pop-up delay-5">
          Download CV
        </button>
      </div>

      {/* Overlay for blur effect */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100 z-40" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Hamburger Button */}
      <button
        className="lg:hidden fixed top-5 right-5 z-50 bg-[#041219] text-white py-2.5 px-3 shadow-lg"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? "✖" : "☰"}
      </button>

      {/* Main Content */}
      <main
        className={`
          ml-0 lg:ml-72 p-5 flex-grow bg-[#052049] transition-all duration-300
          ${isMenuOpen ? "blur-[2px] scale-[0.98]" : "blur-0 scale-100"}
          lg:blur-0 lg:scale-100
        `}
      >
        {/* Home Section */}
        <Section id="home">
          <div className="mt-7 mb-5 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 pop-up delay-3">
                Ayush Rawal
              </h1>
              <h2 className="text-lg md:text-xl text-[#ff9db2] mb-4 pop-up delay-2">
                Web Developer
              </h2>
              <p className="text-sm md:text-lg text-white mb-6 pop-up delay-3">
                I am a passionate web developer with experience in creating
                dynamic and responsive websites. I love to build web
                applications that solve real-world problems and enhance user
                experiences.
              </p>
              <div className="flex gap-4 justify-center md:justify-start pop-up delay-4">
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                  View Work
                </button>
                <button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
                  Contact Me
                </button>
              </div>
            </div>
            <div className="md:w-1/2 mt-5 md:mt-0 flex justify-center pop-up delay-5">
              <img
                src="./file3.png"
                alt="Illustration"
                className="w-100 h-120 md:w-70 md:h-70"
              />
            </div>
          </div>
          <p className="text-white italic text-center mb-5 mt-4 pop-up delay-6">
            "Hello, its nice meeting you."
          </p>
        </Section>

        <SeparatorLine />

        {/* About Me Section */}
        <Section id="about">
          <h2 className="text-3xl font-bold mb-4 pop-up delay-1">
            {"<about/>"}
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-3/5">
              <p className="text-lg text-white mb-4 pop-up delay-2">
                Hello! My name is Ayush and I am a Computer Engineer. I am
                currently pursuing a postgraduate degree in Software
                Engineering, furthering my knowledge and skills in the field...
              </p>
              <div className="flex flex-wrap gap-2 text-white mb-4 pop-up delay-3">
                {[
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "React",
                  "Next.js",
                  "Vue.js",
                  "TailwindCSS",
                  "Node.js",
                  "Express",
                  "MongoDB",
                  "GitHub",
                  "TypeScript",
                ].map((tech, index) => (
                  <span key={index} className="bg-gray-700 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-lg text-white mb-4 pop-up delay-4">
                Want to know more about my journey? You can download my CV by
                clicking the button below.
              </p>
              <button className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 pop-up delay-5 mb-5">
                <FontAwesomeIcon icon={faCamera} className="mr-2" />
                CV
              </button>
            </div>
            <div className="md:w-2/5 flex items-center justify-center pop-up delay-3">
              <img
                src="./file1.png"
                alt="Profile"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </Section>

        <SeparatorLine />

        {/* Contact Section */}
        <Section id="contact">
          <div>
            <h2 className="text-3xl font-bold mb-4 pop-up delay-1">Contact</h2>
            <p className="text-lg pop-up delay-2">
              Feel free to reach out to me via email or through my social media
              channels.
            </p>
          </div>
        </Section>
      </main>
    </div>
  );
};

export default App;
