// App.jsx
import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import Lottie from "react-lottie-player";
import "./index.css";
import EducationAnimation from "./EducationAnimation.json";
import DeveloperAnimation from "./DeveloperAnimation1.json";
import LoadingAnimation from "./LoadingAnimation.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCamera } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { TypeAnimation } from "react-type-animation";
import { IoIosLink } from "react-icons/io";
import { AiFillGithub } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { useInView } from "react-intersection-observer";
import project1image from "./assets/PgLife.jpg";
import project2image from "./assets/FRAS.png";

//projects component
const projects = [
  {
    id: 1,
    image: project1image,
    title: "PGLife",
    //description: "Brief description of the project and the technologies used.",
    // projectLink: "https://example.com/project1",
    githubLink: "https://github.com/username/project1",
    techStack: [
      "devicon-html5-plain-wordmark colored",
      "devicon-php-plain colored",
      "devicon-css3-plain colored",
      "devicon-javascript-plain colored",
    ],
  },
  {
    id: 2,
    image: project2image,
    title: "Face Recognition Attendance System",
    //description: "Brief description of the project and the technologies used.",
    // projectLink: "https://example.com/project2",
    githubLink: "https://github.com/username/project2",
    techStack: [
      "devicon-python-plain",
      "devicon-firebase-line-wordmark colored",
      "devicon-opencv-plain-wordmark colored",
      "devicon-numpy-plain colored",
    ],
  },
  // Add more projects as needed
];

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
      } ${className} ${id !== "home" ? "pt-20" : ""}`}
    >
      {children}
    </section>
  );
};

const SeparatorLine = () => {
  return (
    <div className="w-[95%] md:w-[97%] lg:w-[95%] max-w-[1100px] h-[2px] mx-auto my-8">
      <div className="h-full bg-gradient-to-r from-[#201506] via-[#dc6c3c] to-[#060b20]"></div>
    </div>
  );
};

const App = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Listen for scroll to remove intro effect
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowIntro(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // Using environment variable
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // Using environment variable
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_USER_ID // Using environment variable
      )
      .then((response) => {
        console.log("Email sent successfully!", response);
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#060b20] backdrop-blur-3xl text-white z-50">
        <Lottie
          loop
          play
          animationData={LoadingAnimation}
          style={{ width: 300, height: 300 }}
        />
      </div>
    );
  }

  return (
    // <>
    //   {showIntro && (
    //     <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#05091d]/80 backdrop-blur-xl transition-all duration-700">
    //       <div className="text-center transform transition-all duration-700">
    //         <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
    //           Hi there! I am
    //         </h1>
    //         <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-4">
    //           Ayush Rawal
    //         </h1>
    //       </div>
    //     </div>
    //   )}
    <div className="min-h-screen bg-[#060b20]">
      {/* <div
          className={`min-h-screen bg-[#05091d] transition-all duration-700 ${
            showIntro ? "blur-sm" : "blur-0"
          }`}
        > */}
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-[#05091d] h-16 flex items-center justify-between px-6 z-50">
        {/* Logo Section */}
        <div className="flex items-center">
          <a
            href="#home"
            className="text-[#ea8d46] text-xl ml-4 font-mono hover:text-[#9e5e2e] transition-colors"
          >
            {"<AR/>"}
          </a>
        </div>
        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center mr-9 space-x-8">
          <a
            href="#home"
            className="text-white text-xl hover:text-[#7497b6] transition-colors"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-white text-xl hover:text-[#7497b6] transition-colors"
          >
            About
          </a>
          <a
            href="#skills"
            className="text-white text-xl hover:text-[#7497b6] transition-colors"
          >
            Skills & Experience
          </a>
          <a
            href="#projects"
            className="text-white text-xl hover:text-[#7497b6] transition-colors"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-white text-xl hover:text-[#7497b6] transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Menu Button for Mobile */}
        <button
          className="lg:hidden fixed top-4 right-4 z-50 bg-[#c2872900] rounded-lg p-2"
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
          className={`fixed top-4 right-4 bg-[#eb9c2e00] transition-transform duration-300 lg:hidden rounded-lg shadow-lg ${
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
      <main className="pt-10 px-5 pb-5">
        {/* Home Section */}
        <Section
          id="home"
          className="flex items-center justify-between px-4 md:px-8 min-h-screen md:h-auto pt-20 md:pt-10"
        >
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 py-10 md:py-0">
              {/* Left Side - Text Content */}
              <div className="md:w-1/2 text-left space-y-6 mt-16 md:mt-0">
                {" "}
                {/* Added margin-top for mobile */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white pop-up delay-1">
                  Hi there! I am
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white pop-up delay-1 gradient-text">
                  Ayush Rawal
                </h1>
                <h2 className="text-2xl md:text-3xl text-[#a9632d] pop-up delay-2">
                  <TypeAnimation
                    sequence={[
                      "Web Developer",
                      1000,
                      "Creative Coder",
                      1000,
                      "Tech Enthusiast",
                      1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </h2>
                <p className="text-base md:text-xl text-white max-w-xl pop-up delay-3">
                  I am a passionate web developer with experience in creating
                  dynamic and responsive websites. I love to build web
                  applications that solve real-world problems and enhance user
                  experiences.
                </p>
                <div className="flex gap-4 pop-up delay-4">
                  <button
                    onClick={() =>
                      document
                        .getElementById("projects")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                    className="view-work-btn bg-[#05091e] text-white py-2 px-6 rounded-md hover:bg-[#314b61] transition-all duration-300"
                  >
                    View Work
                  </button>
                  <a
                    href="https://linkedin.com/in/ayushrawal2507"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-btn bg-transparent text-white py-2 px-6 rounded-md border border-[#7497b6] hover:bg-[#7497b6]/10 transition-all duration-300"
                  >
                    Contact Me
                  </a>
                </div>
              </div>

              {/* Right Side - Illustration */}
              <div className="md:w-1/2 flex justify-center items-center">
                <div className="relative flex md:flex-row flex-col items-center gap-8">
                  <Lottie
                    loop
                    play
                    animationData={DeveloperAnimation}
                    style={{
                      width: "100%",
                      maxWidth: 500,
                      margin: 0,
                      display: "block",
                    }}
                  />

                  <div className="social-links md:absolute md:right-[-4rem] md:top-1/2 md:transform md:-translate-y-1/2 flex md:flex-col flex-row items-center md:gap-6 gap-4 mt-4 md:mt-0">
                    <a
                      href="https://github.com/Ayushrawal25"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon-link"
                    >
                      <FaGithub className="text-2xl text-[#dc6c3c] hover:text-[#a9632d] transition-all duration-300" />
                    </a>
                    <a
                      href="https://linkedin.com/in/ayushrawal2507"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon-link"
                    >
                      <FaLinkedin className="text-2xl text-[#dc6c3c] hover:text-[#a9632d] transition-all duration-300" />
                    </a>
                    <a
                      href="https://leetcode.com/yourusername"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon-link"
                    >
                      <SiLeetcode className="text-2xl text-[#dc6c3c] hover:text-[#a9632d] transition-all duration-300" />
                    </a>
                    <a
                      href="mailto:ayushrawal25@gmail.com"
                      className="social-icon-link"
                    >
                      <FaEnvelope className="text-2xl text-[#dc6c3c] hover:text-[#a9632d] transition-all duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>{" "}
        <SeparatorLine />
        {/* About Section */}
        <Section id="about" className="pt-8 pb-8">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl ml-5 font-bold mb-8 text-white pop-up delay-1">
              About
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

                <a
                  href="https://drive.google.com/uc?export=download&id=1kIHolM2up9PgN8TZ2FEr5NlWYKAMQ8YX"
                  className="bg-[#d98a3c] text-white py-3 px-6 rounded-md hover:bg-[#0f0f38] transition-colors mt-7 flex items-center"
                  style={{
                    display: "inline-block",
                    textDecoration: "none",
                  }}
                >
                  <FontAwesomeIcon icon={faCamera} className="mr-2" />
                  Download CV
                </a>
              </div>
              <div className="md:w-2/5 flex justify-center pop-up delay-3">
                <img
                  src="./Home_page.png"
                  alt="Profile"
                  className="w-full h-full max-w-lg object-contain" // Adjusted image sizing
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
        <Section id="skills" className="pt-8 pb-8">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-white pop-up delay-1">
              Skills & Experience<span className="text-[#7497b6]">.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column - Skills */}
              <div className="pop-up delay-2 space-y-16">
                {/* Programming Languages Section */}
                <div className="relative">
                  {/* Line starts from dot position */}
                  <div className="absolute left-1.5 top-0 bottom-0 w-[1px] bg-[#dc6c3c] opacity-20"></div>

                  <div className="flex items-center mb-8">
                    <div className="relative w-4 h-4 bg-[#00182900] z-10 mt-1">
                      <div className="w-3 h-3 bg-[#dc6c3c] rounded-full"></div>
                    </div>
                    <h3 className="text-[#dc6c3c] text-lg ml-4">
                      Programming Languages
                    </h3>
                  </div>

                  <div className="pl-8">
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
                  {/* Line starts from dot position */}
                  <div className="absolute left-1.5 top-0 bottom-0 w-[1px] bg-[#dc6c3c] opacity-20"></div>

                  <div className="flex items-center mb-8">
                    <div className="relative w-4 h-4 bg-[#00182900] z-10 mt-1">
                      <div className="w-3 h-3 bg-[#dc6c3c] rounded-full"></div>
                    </div>
                    <h3 className="text-[#dc6c3c] text-lg ml-4">
                      Frameworks/Libraries
                    </h3>
                  </div>

                  <div className="pl-8">
                    <div className="grid grid-cols-3 gap-8">
                      {[
                        { name: "ReactJS", icon: "devicon-react-original" },
                        {
                          name: "Bootstrap",
                          icon: "devicon-bootstrap-plain",
                        },
                        {
                          name: "Tailwind",
                          icon: "devicon-tailwindcss-plain",
                        },
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
                  {/* Line starts from dot position */}
                  <div className="absolute left-1.5 top-0 bottom-0 w-[1px] bg-[#dc6c3c] opacity-20"></div>

                  <div className="flex items-center mb-8">
                    <div className="relative w-4 h-4 bg-[#00182900] z-10 mt-1">
                      <div className="w-3 h-3 bg-[#dc6c3c] rounded-full"></div>
                    </div>
                    <h3 className="text-[#dc6c3c] text-lg ml-4">Tools</h3>
                  </div>

                  <div className="pl-8">
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

              {/* Right Column - Experience */}
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
                    title: "Web Development Training",
                    role: "Internshala",
                    period: "2022 - 2023",
                    description:
                      "Persued a course in Web Development from Internshala to advance in the field of software development",
                  },
                  {
                    title: "iNeuron Tech-A-Thon 2.0",
                    role: "Participant",
                    period: "2022",
                    description:
                      "Developed a blogging website that allows users to create their profile and publish their blogs.",
                  },
                ].map((exp, index) => (
                  <div key={index} className="relative">
                    {/* Line starts from dot position */}
                    <div className="absolute left-1.5 top-0 bottom-0 w-[1px] bg-[#dc6c3c] opacity-20"></div>

                    <div className="flex items-start">
                      <div className="relative w-4 h-4 bg-[#00182900] z-10 mt-2">
                        <div className="w-3 h-3 bg-[#dc6c3c] rounded-full"></div>
                      </div>

                      <div className="ml-4">
                        <h4 className="text-2xl font-bold text-white mb-1">
                          {exp.title}
                        </h4>
                        <p className="text-[#dc6c3c] text-lg mb-0">
                          {exp.role}
                        </p>
                        <p className="text-[#dc6c3c] text-lg mb-3">
                          {exp.period}
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
        <SeparatorLine />
        <Section id="education" className="pt-8 pb-8">
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
                    <Lottie
                      loop
                      play
                      animationData={EducationAnimation}
                      style={{
                        width: "100%",
                        maxWidth: 500,
                        margin: 0, // Added this
                        display: "block", // Added this
                      }}
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
                      src="/CollegeLogo.png"
                      alt="College Logo"
                      className="w-20 h-12 rounded-lg"
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
                {/* Education Card 2 */}
                <div className="education-card bg-[#1a1a2e00] rounded-xl p-6 hover:bg-[#1a1a2e]/80 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <img
                      src="/cchs.png"
                      alt="College Logo"
                      className="w-20 h-20 rounded-lg"
                    />
                    <div>
                      <h3 className="text-[#7497b6] text-xl font-semibold mb-1">
                        Cambridge Court High School,Jaipur
                      </h3>
                      <h4 className="text-white mb-2">
                        Senior Secondary Education(XII)
                      </h4>
                      <p className="text-gray-400 mb-3">2020 - 2021</p>
                      <p className="text-gray-300">
                        •Higher Secondary Education in PCM.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Education Card 3 */}
                <div className="education-card bg-[#1a1a2e00] rounded-xl p-6 hover:bg-[#1a1a2e]/80 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <img
                      src="/cchs.png"
                      alt="College Logo"
                      className="w-20 h-20 rounded-lg"
                    />
                    <div>
                      <h3 className="text-[#7497b6] text-xl font-semibold mb-1">
                        Cambridge Court High School,Jaipur
                      </h3>
                      <h4 className="text-white mb-2">
                        Secondary Education(X)
                      </h4>
                      <p className="text-gray-400 mb-3">2018 - 2019</p>
                      <p className="text-gray-300">
                        •Completed Secondary Education with focus on Academic
                        Excellence.
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
        <Section id="projects" className="pt-8 pb-8">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-white pop-up delay-1">
              Projects
              {/* /*<span className="text-[#7497b6]">.</span>*/}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="relative group overflow-hidden rounded-xl"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[250px] object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001829] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <div className="flex gap-2 mb-3">
                      {project.techStack.map((tech, index) => (
                        <i
                          key={index}
                          className={`${tech} text-2xl text-white`}
                        />
                      ))}
                    </div>
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#7497b6] transition-colors"
                      >
                        <IoIosLink size="1.5rem" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
        <SeparatorLine />
        {/* Contact Section */}
        <Section id="contact" className="pt-8 pb-8">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-white pop-up delay-1">
              Contact
              {/* <span className="text-[#7497b6]">.</span> */}
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
                      className="mr-4 text-[#dc6c3c]"
                    />
                    <span>ayushrawal25@gamil.com</span>
                  </div>
                  <div className="flex items-center text-white">
                    <FontAwesomeIcon
                      icon={faGithub}
                      className="mr-4 text-[#dc6c3c]"
                    />
                    <span>Ayushrawal25</span>
                  </div>
                  <div className="flex items-center text-white">
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      className="mr-4 text-[#dc6c3c]"
                    />
                    <span>ayushrawal2507</span>
                  </div>
                </div>
              </div>
              <div className="pop-up delay-4">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full p-3 rounded-md bg-[#0a2942] text-white border border-[#dc6c3c] focus:outline-none focus:border-[#a9632d]"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-3 rounded-md bg-[#0a2942] text-white border border-[#dc6c3c] focus:outline-none focus:border-[#a9632d]"
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows="4"
                    className="w-full p-3 rounded-md bg-[#0a2942] text-white border border-[#dc6c3c] focus:outline-none focus:border-[#a9632d]"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full p-3 rounded-md bg-[#0a2942] text-white border border-[#dc6c3c] focus:outline-none focus:border-[#a9632d]"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Section>
      </main>
      {/* Footer */}
      <div className="text-center py-4 text-gray-400 text-sm border-t border-[#7497b6]/20">
        © 2025 Ayush Rawal. All Rights Reserved.
      </div>
    </div>
    // </div>
    // </>
  );
};

export default App;
