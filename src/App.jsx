// App.jsx
// App.jsx
import React, { useState, useEffect } from "react";
import Lottie from "react-lottie-player";
import "./index.css";
import DeveloperAnimation from "./DeveloperAnimation.json";
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

// In your Section component, modify it to:
const Section = ({ id, children, className = "" }) => {
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
      } ${className} ${id !== "home" ? "pt-24" : ""}`} // Added conditional padding-top
    >
      {children}
    </section>
  );
};

const SeparatorLine = () => {
  return (
    <div className="w-[95%] md:w-[85%] lg:w-[90%] max-w-[875px] h-[2px] mx-auto my-8">
      <div className="h-full bg-gradient-to-r from-[#001829] via-[#0a2942] to-[#001829]"></div>
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
      <div className="fixed inset-0 flex items-center justify-center bg-[#001829] backdrop-blur-3xl text-white z-50">
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
    <div className="min-h-screen bg-[#001829]">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-[#001829] h-16 flex items-center justify-between px-6 z-50">
        {/* Logo Section */}
        <div className="flex items-center">
          <span className="text-[#7497b6] text-xl font-mono">{"<AR/>"}</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8">
          <a
            href="#home"
            className="text-white hover:text-[#7497b6] transition-colors"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-white hover:text-[#7497b6] transition-colors"
          >
            About
          </a>
          <a
            href="#skills"
            className="text-white hover:text-[#7497b6] transition-colors"
          >
            Skills & Experience
          </a>
          <a
            href="#projects"
            className="text-white hover:text-[#7497b6] transition-colors"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-white hover:text-[#7497b6] transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Menu Button for Mobile */}
        <button
          className="lg:hidden fixed top-4 right-4 z-50 bg-[#001829] rounded-lg p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed top-4 right-4 bg-[#001829] transition-transform duration-300 lg:hidden rounded-lg shadow-lg ${
            isMenuOpen
              ? "transform translate-x-0"
              : "transform translate-x-full"
          }`}
        >
          <div className="flex flex-col p-4 w-64 space-y-2">
            <a
              href="#home"
              className="text-white py-2 px-4 hover:bg-[#0a2942] rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className="text-white py-2 px-4 hover:bg-[#0a2942] rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#skills"
              className="text-white py-2 px-4 hover:bg-[#0a2942] rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Skills & Experience
            </a>
            <a
              href="#projects"
              className="text-white py-2 px-4 hover:bg-[#0a2942] rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-white py-2 px-4 hover:bg-[#0a2942] rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 px-5 pb-5">
        {/* Home Section */}
        <Section id="home" className="h-screen overflow-hidden">
          {" "}
          {/* Added overflow-hidden */}
          <div className="max-w-6xl mx-auto px-4 h-full flex items-center">
            <div className="flex flex-col md:flex-row items-center justify-between w-full">
              {" "}
              {/* Left Side - Text Content */}
              <div className="md:w-1/2 text-left space-y-6">
                <h1 className="text-6xl md:text-6xl font-bold text-white pop-up delay-1">
                  Ayush Rawal
                </h1>
                <h2 className="text-xl md:text-3xl text-[#7497b6] pop-up delay-2">
                  Web Developer
                </h2>
                <p className="text-base md:text-xl text-white max-w-xl pop-up delay-3">
                  I am a passionate web developer with experience in creating
                  dynamic and responsive websites. I love to build web
                  applications that solve real-world problems and enhance user
                  experiences.
                </p>
                <div className="flex gap-4 pop-up delay-4">
                  <button className="view-work-btn bg-[#868EBB] text-white py-2 px-6 rounded-md hover:bg-[#7497b6] transition-all duration-300">
                    View Work
                  </button>
                  <button className="contact-btn bg-transparent text-white py-2 px-6 rounded-md border border-[#7497b6] hover:bg-[#7497b6]/10 transition-all duration-300">
                    Contact Me
                  </button>
                </div>
              </div>
              {/* Right Side - Illustration */}
              <div className="md:w-1/2 flex justify-center items-center">
                <Lottie
                  loop
                  play
                  animationData={DeveloperAnimation}
                  style={{
                    width: "100%",
                    maxWidth: 500,
                    margin: 0, // Added this
                    display: "block", // Added this
                  }}
                />
              </div>
            </div>
          </div>
        </Section>
        <SeparatorLine />
        {/* About Section */}
        {/* About Section */}
        <Section id="about">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-white pop-up delay-1">
              {"<about/>"}
            </h2>
            <div className="flex flex-col md:flex-row gap-12 items-center">
              {" "}
              {/* Added items-center */}
              <div className="md:w-3/5">
                <div className="space-y-6 text-lg">
                  <p className="text-white pop-up delay-2">
                    Hello! I'm Ayush, a passionate software engineer based in
                    India. My journey in technology began during my early
                    college years, where I discovered my love for creating
                    solutions through code.
                  </p>

                  <p className="text-white pop-up delay-3">
                    Currently pursuing my B.Tech in Information Technology, I've
                    been focusing on web development and software engineering.
                    What excites me most about technology is its potential to
                    solve real-world problems and make a positive impact on
                    people's lives.
                  </p>

                  <p className="text-white pop-up delay-4">
                    Beyond coding, I'm deeply interested in open-source
                    contributions and staying up-to-date with the latest
                    technological trends. I believe in the power of community
                    and knowledge sharing, which drives me to actively
                    participate in tech communities and collaborative projects.
                  </p>
                </div>

                <div className="mt-8 pop-up delay-5">
                  <button className="bg-[#7497b6] text-white py-3 px-6 rounded-md hover:bg-[#5990a6] transition-colors flex items-center">
                    <FontAwesomeIcon icon={faCamera} className="mr-2" />
                    Download CV
                  </button>
                </div>
              </div>
              <div className="md:w-2/5 flex justify-center pop-up delay-3">
                <img
                  src="./file1.png"
                  alt="Profile"
                  className="w-full h-auto max-w-md object-contain" // Adjusted image sizing
                  style={{
                    minHeight: "400px", // Minimum height
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </div>
        </Section>
        <SeparatorLine />
        {/* Skills & Education Section */}
        <Section id="skills">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-white pop-up delay-1">
              Skills & Experience<span className="text-[#7497b6]">.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column - Skills */}
              <div className="pop-up delay-2 space-y-16">
                {/* Programming Languages Section */}
                <div className="relative">
                  {/* Dot overlapping the line */}
                  <div className="absolute left-0 top-0 w-4 h-4 bg-[#001829] z-10">
                    <div className="w-3 h-3 bg-[#7497b6] rounded-full"></div>
                  </div>
                  {/* Continuous line */}
                  <div className="absolute left-1.5 top-0 bottom-0 w-[1px] bg-[#7497b6] opacity-20"></div>

                  <div className="pl-8">
                    <h3 className="text-[#7497b6] text-lg mb-8">
                      Programming Languages
                    </h3>
                    <div className="grid grid-cols-3 gap-8">
                      {[
                        { name: "C++", icon: "devicon-cplusplus-plain" },
                        { name: "Python", icon: "devicon-python-plain" },
                        { name: "HTML", icon: "devicon-html5-plain" },
                        { name: "CSS", icon: "devicon-css3-plain" },
                        {
                          name: "JavaScript",
                          icon: "devicon-javascript-plain",
                        },
                        { name: "C", icon: "devicon-c-plain" },
                      ].map((lang, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center transition-transform hover:-translate-y-1"
                        >
                          <i
                            className={`${lang.icon} text-4xl text-white mb-3`}
                          ></i>
                          <span className="text-gray-300 text-sm">
                            {lang.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Frameworks/Libraries Section */}
                <div className="relative">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-[#001829] z-10">
                    <div className="w-3 h-3 bg-[#7497b6] rounded-full"></div>
                  </div>
                  <div className="absolute left-1.5 top-0 bottom-0 w-[1px] bg-[#7497b6] opacity-20"></div>

                  <div className="pl-8">
                    <h3 className="text-[#7497b6] text-lg mb-8">
                      Frameworks/Libraries
                    </h3>
                    <div className="grid grid-cols-3 gap-8">
                      {[
                        { name: "ReactJS", icon: "devicon-react-original" },
                        { name: "Bootstrap", icon: "devicon-bootstrap-plain" },
                        { name: "Tailwind", icon: "devicon-tailwindcss-plain" },
                      ].map((framework, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center transition-transform hover:-translate-y-1"
                        >
                          <i
                            className={`${framework.icon} text-4xl text-white mb-3`}
                          ></i>
                          <span className="text-gray-300 text-sm">
                            {framework.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tools Section */}
                <div className="relative">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-[#001829] z-10">
                    <div className="w-3 h-3 bg-[#7497b6] rounded-full"></div>
                  </div>
                  <div className="absolute left-1.5 top-0 bottom-0 w-[1px] bg-[#7497b6] opacity-20"></div>

                  <div className="pl-8">
                    <h3 className="text-[#7497b6] text-lg mb-8">Tools</h3>
                    <div className="grid grid-cols-3 gap-8">
                      {[
                        { name: "MySQL", icon: "devicon-mysql-plain" },
                        { name: "VS Code", icon: "devicon-vscode-plain" },
                        { name: "Git", icon: "devicon-git-plain" },
                        { name: "GitHub", icon: "devicon-github-original" },
                        { name: "ViteJS", icon: "devicon-vitejs-plain" },
                      ].map((tool, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center transition-transform hover:-translate-y-1"
                        >
                          <i
                            className={`${tool.icon} text-4xl text-white mb-3`}
                          ></i>
                          <span className="text-gray-300 text-sm">
                            {tool.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Education */}
              <div className="pop-up delay-3 space-y-16">
                {[
                  {
                    title: "BVPCSI",
                    role: "Technical Executive",
                    period: "Nov'23 - present",
                    description:
                      "Organized various events and helped my team to prepare quizzes for some events.",
                  },
                  {
                    title: "Web Development Training, Internshala",
                    period: "2022 - 2023",
                    description:
                      "Persued a course in Web Development from Internshala to advance in the field of software development",
                  },
                  // {
                  //   title: "Secondary (10th)",
                  //   period: "2018 - 2019",
                  //   description:
                  //     "Completed my secondary education with excellent academic performance.",
                  // },
                ].map((edu, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-0 top-0 w-4 h-4 bg-[#001829] z-10">
                      <div className="w-3 h-3 bg-[#7497b6] rounded-full"></div>
                    </div>
                    <div className="absolute left-1.5 top-0 bottom-0 w-[1px] bg-[#7497b6] opacity-20"></div>

                    <div className="pl-8">
                      <h4 className="text-2xl font-bold text-white mb-1">
                        {edu.title}
                      </h4>
                      <p className="text-[#7497b6] text-lg mb-0">{edu.role}</p>
                      <p className="text-[#7497b6] text-lg mb-3">
                        {edu.period}
                      </p>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
        <SeparatorLine />
        <Section id="education">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-5xl font-bold mb-16 text-white pop-up delay-1">
              Education
            </h2>
            <div className="flex flex-col md:flex-row gap-20">
              {/* Left Side - Illustration */}
              <div className="md:w-1/2 flex items-center justify-center pop-up delay-2">
                <div className="relative">
                  {/* Main Laptop Illustration */}
                  <div className="w-full max-w-[600px]">
                    <img
                      src="/laptop-illustration.svg"
                      alt="Education Illustration"
                      className="w-full h-auto"
                    />
                  </div>

                  {/* Floating Elements */}
                  {/* <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 text-[#7497b6] animate-float-1">
                      ♦
                    </div>
                    <div className="absolute top-20 right-20 text-[#FFD700] animate-float-2">
                      ♥
                    </div>
                    <div className="absolute bottom-20 left-20 text-[#7497b6] animate-float-3">
                      ▼
                    </div>
                    <div className="absolute top-1/2 right-10 text-[#7497b6] animate-float-4">
                      •
                    </div>
                    <div className="absolute bottom-10 right-1/2 text-[#7497b6] animate-float-5">
                      🔊
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Right Side - Education Cards */}
              <div className="md:w-1/2 space-y-8 pop-up delay-3">
                {/* Education Card 1 */}
                <div className="education-card bg-[#1a1a2e00] rounded-xl p-6 hover:bg-[#1a1a2e]/80 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <img
                      src="/college-logo.png"
                      alt="College Logo"
                      className="w-12 h-12 rounded-lg"
                    />
                    <div>
                      <h3 className="text-[#7497b6] text-xl font-semibold mb-1">
                        Bharati Vidyapeeth's College of Engineering, New Delhi
                      </h3>
                      <h4 className="text-white mb-2">
                        Bachelor of Technology
                      </h4>
                      <p className="text-gray-400 mb-3">
                        November 2021 - June 2025
                      </p>
                      <ul className="space-y-2 text-gray-300">
                        <li>• Major: Information Technology</li>
                        <li>• Minor: AI/ML</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Education Card 2 */}
                <div className="education-card bg-[#1a1a2e00] rounded-xl p-6 hover:bg-[#1a1a2e]/80 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <img
                      src="/polkadot-logo.png"
                      alt="Polkadot Logo"
                      className="w-12 h-12 rounded-lg"
                    />
                    <div>
                      <h3 className="text-[#7497b6] text-xl font-semibold mb-1">
                        Matrix Computers
                      </h3>
                      <p className="text-gray-400 mb-3">May 2024 - June 2024</p>
                      <p className="text-gray-300">
                        • Completed a course in Data Structures and Algorithms
                        using C++. • Gained problem-solving skills and applied
                        coding logics to solve problems.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
        <SeparatorLine />
        {/* Projects Section */}
        <Section id="projects">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-white pop-up delay-1">
              Projects<span className="text-[#7497b6]">.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Project Cards */}
              {[1, 2, 3].map((project, index) => (
                <div
                  key={index}
                  className="bg-[#0a2942] rounded-lg overflow-hidden shadow-lg pop-up delay-2"
                >
                  <img
                    src={`./project${project}.jpg`}
                    alt={`Project ${project}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Project Title {project}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Brief description of the project and the technologies
                      used.
                    </p>
                    <div className="flex gap-2">
                      <a
                        href="#"
                        className="text-[#7497b6] hover:text-white transition-colors"
                      >
                        View Project
                      </a>
                      <span className="text-[#7497b6]">|</span>
                      <a
                        href="#"
                        className="text-[#7497b6] hover:text-white transition-colors"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
        <SeparatorLine />
        {/* Contact Section */}
        <Section id="contact">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-white pop-up delay-1">
              Contact<span className="text-[#7497b6]">.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-lg text-white pop-up delay-2">
                  Feel free to reach out to me for any questions or
                  opportunities. I'm always open to discussing new projects,
                  creative ideas, or opportunities to be part of your visions.
                </p>
                <div className="space-y-4 pop-up delay-3">
                  <div className="flex items-center text-white">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="mr-4 text-[#7497b6]"
                    />
                    <span>email@example.com</span>
                  </div>
                  <div className="flex items-center text-white">
                    <FontAwesomeIcon
                      icon={faGithub}
                      className="mr-4 text-[#7497b6]"
                    />
                    <span>github.com/username</span>
                  </div>
                  <div className="flex items-center text-white">
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      className="mr-4 text-[#7497b6]"
                    />
                    <span>linkedin.com/in/username</span>
                  </div>
                </div>
              </div>
              <div className="pop-up delay-4">
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-3 rounded-md bg-[#0a2942] text-white border border-[#7497b6] focus:outline-none focus:border-[#5990a6]"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 rounded-md bg-[#0a2942] text-white border border-[#7497b6] focus:outline-none focus:border-[#5990a6]"
                  />
                  <textarea
                    placeholder="Message"
                    rows="4"
                    className="w-full p-3 rounded-md bg-[#0a2942] text-white border border-[#7497b6] focus:outline-none focus:border-[#5990a6]"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-[#7497b6] text-white py-3 rounded-md hover:bg-[#5990a6] transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
};

export default App;
