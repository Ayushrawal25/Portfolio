// App.jsx - Part 1
import React, { useState, useEffect, useRef } from "react";
import * as emailjs from "@emailjs/browser";
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

// Custom hook for scroll animations
const useScrollAnimation = (threshold = 0.1) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: false,
  });
  return [ref, inView];
};

// Projects data
const projects = [
  {
    id: 1,
    image: project1image,
    title: "PGLife",
    githubLink: "https://github.com/Ayushrawal25/PgLife",
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
    githubLink:
      "https://github.com/Ayushrawal25/FaceRecognitionAttendanceSystem",
    techStack: [
      "devicon-python-plain",
      "devicon-firebase-line-wordmark colored",
      "devicon-opencv-plain-wordmark colored",
      "devicon-numpy-plain colored",
    ],
  },
];

const ProjectCard = ({ project, reference, inView }) => {
  return (
    <div
      ref={reference}
      className={`relative group overflow-hidden rounded-xl transform transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      {/* Project Image */}
      <div className="relative h-[250px] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#001829]/95 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
            {/* Project Title */}
            <h3 className="text-xl font-bold text-white mb-3 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-100">
              {project.title}
            </h3>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-3 mb-4">
              {project.techStack.map((tech, techIndex) => (
                <i
                  key={techIndex}
                  className={`${tech} text-2xl transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500`}
                  style={{ transitionDelay: `${150 + techIndex * 50}ms` }}
                />
              ))}
            </div>

            {/* GitHub Link */}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#dc6c3c] transition-colors duration-300"
              >
                <div className="flex items-center gap-2 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-300">
                  <FaGithub size="1.5rem" />
                  <span>View Code</span>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EducationCard = ({ education, reference, inView }) => {
  return (
    <div
      ref={reference}
      className={`education-card bg-[#1a1a2e00] rounded-xl p-6 
        hover:bg-[#1a1a2e]/80 transition-all duration-500 transform 
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
    >
      <div className="flex items-start gap-4">
        <img
          src={education.logo}
          alt="Institution Logo"
          className="w-20 h-20 rounded-lg transform transition-transform duration-300 group-hover:scale-105"
        />
        <div className="flex-1">
          <h3 className="text-[#7497b6] text-xl font-semibold mb-1">
            {education.school}
          </h3>
          <h4 className="text-white mb-2">{education.degree}</h4>
          <p className="text-gray-400 mb-3">{education.period}</p>
          <ul className="space-y-2 text-gray-300">
            {education.details.map((detail, i) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Enhanced Section component with animations
const Section = ({ id, children, className = "" }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-1000 ${
        inView
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 transform translate-y-20"
      } ${className}`}
      style={{ scrollMarginTop: "80px" }} // Add this line
    >
      {children}
    </section>
  );
};
// Separator Line component with animation
const SeparatorLine = () => {
  const [ref, inView] = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`w-[95%] md:w-[97%] lg:w-[95%] max-w-[1100px] h-[2px] mx-auto my-8 transition-all duration-1000 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="h-full bg-gradient-to-r from-[#201506] via-[#dc6c3c] to-[#060b20]"></div>
    </div>
  );
};

// Enhanced Typewriter component
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
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const projectRefs = projects.map(() => useInView({ threshold: 0.1 }));
  const educationData = [
    {
      logo: "/CollegeLogo.png",
      school: "Bharati Vidyapeeth's College of Engineering, New Delhi",
      degree: "Bachelor of Technology",
      period: "November 2021 - June 2025",
      details: ["• Major: Information Technology", "• Minor: AI/ML"],
    },
    {
      logo: "/cchs.png",
      school: "Cambridge Court High School, Jaipur",
      degree: "Senior Secondary Education(XII)",
      period: "2020 - 2021",
      details: ["•Higher Secondary Education in PCM."],
    },
    {
      logo: "/cchs.png",
      school: "Cambridge Court High School, Jaipur",
      degree: "Secondary Education(X)",
      period: "2018 - 2019",
      details: [
        "•Completed Secondary Education with focus on Academic Excellence.",
      ],
    },
  ];
  const educationRefs = educationData.map(() => useInView({ threshold: 0.1 }));
  const programmingRef = useInView({ threshold: 0.1 });
  const frameworksRef = useInView({ threshold: 0.1 });
  const toolsRef = useInView({ threshold: 0.1 });
  const experienceRefs = [
    useInView({ threshold: 0.1 }),
    useInView({ threshold: 0.1 }),
    useInView({ threshold: 0.1 }),
  ];

  // Initialize emailjs
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID);
  }, []);

  // Loading screen effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Intro effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowIntro(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Form handlers
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.log("FAILED...", err);
      });
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#060b20] backdrop-blur-3xl text-white z-50">
        <Lottie
          loop
          play
          animationData={LoadingAnimation}
          style={{ width: 300, height: 300 }}
          className="loading-animation"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060b20]">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-[#060b20]/90 backdrop-blur-md h-16 flex items-center justify-between px-6 z-50 transition-all duration-300">
        {" "}
        {/* Logo */}
        <div className="flex items-center">
          <a
            href="#home"
            className="text-[#ea8d46] text-xl ml-4 font-mono hover:text-[#9e5e2e] transition-all duration-300"
          >
            {"<AR/>"}
          </a>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center mr-9 space-x-8">
          {[
            { name: "Home", id: "home" },
            { name: "About", id: "about" },
            { name: "Skills & Experience", id: "skills" }, // Changed the id to match section
            { name: "Projects", id: "projects" },
            { name: "Contact", id: "contact" },
          ].map((item, index) => (
            <a
              key={item.name}
              href={`#${item.id}`}
              className="text-white text-xl hover:text-[#7497b6] transition-all duration-300 nav-link"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.name}
            </a>
          ))}
        </div>
        {/* Mobile Menu Button */}
        <button
          className={`lg:hidden fixed top-4 right-4 z-50 
    p-2 rounded-lg
    transition-all duration-300
    hover:scale-110
    active:scale-95
    ${isMenuOpen ? "bg-[#05091d]" : "bg-transparent"}`}
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
          className={`fixed top-0 right-0 h-full w-64 
    bg-[#05091d] 
    transform transition-transform duration-300 ease-in-out lg:hidden 
    ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
    z-40
    shadow-xl`} // Added shadow for depth
          style={{
            backgroundColor: "#05091d",
            backgroundImage: "none", // Ensure no background image
            opacity: 1, // Ensure full opacity
          }}
        >
          {/* Dark overlay for the rest of the screen */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black/80 lg:hidden -z-10"
              onClick={() => setIsMenuOpen(false)}
            />
          )}

          {/* Menu Items Container */}
          <div
            className="flex flex-col pt-20 p-4 space-y-4 bg-[#05091d]" // Added background color here too
            style={{
              backgroundColor: "#05091d",
              backgroundImage: "none",
            }}
          >
            {[
              { name: "Home", id: "home" },
              { name: "About", id: "about" },
              { name: "Skills & Experience", id: "skills" },
              { name: "Projects", id: "projects" },
              { name: "Contact", id: "contact" },
            ].map((item) => (
              <a
                key={item.name}
                href={`#${item.id}`}
                className="text-white py-3 px-4 
          hover:bg-[#0a2942] 
          rounded-md 
          transition-all duration-300
          active:scale-95
          block
          w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-0 px-5 pb-5">
        {/* Home Section */}
        <Section
          id="home"
          className="flex items-center justify-between px-4 md:px-8 min-h-screen md:h-auto pt-20 md:pt-10"
        >
          {/* Home Section Content */}
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 py-10 md:py-0">
              {/* Left Side - Text Content */}
              <div className="md:w-1/2 text-left space-y-6 mt-16 md:mt-0">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white pop-up delay-1">
                  Hi there! I am
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text pop-up delay-2">
                  Ayush Rawal
                </h1>
                <h2 className="text-2xl md:text-3xl text-[#a9632d] pop-up delay-3">
                  <TypeAnimation
                    sequence={[
                      "Web Developer",
                      1500,
                      "Creative Coder",
                      1500,
                      "Tech Enthusiast",
                      1500,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </h2>
                <p className="text-base md:text-xl text-white max-w-xl pop-up delay-4">
                  I am a passionate web developer with experience in creating
                  dynamic and responsive websites. I love to build web
                  applications that solve real-world problems and enhance user
                  experiences.
                </p>
                <div className="flex gap-4 pop-up delay-5">
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
                <div className="relative flex md:flex-row flex-col pop-up delay-4 items-center gap-8">
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
                    className="float-animation"
                  />

                  {/* Social Links */}
                  <div className="social-links md:absolute md:right-[-4rem] md:top-1/2 md:transform md:-translate-y-1/2 flex md:flex-col flex-row items-center md:gap-6 gap-4 mt-4 md:mt-0">
                    {[
                      {
                        icon: <FaGithub />,
                        href: "https://github.com/Ayushrawal25",
                        delay: "delay-1",
                      },
                      {
                        icon: <FaLinkedin />,
                        href: "https://linkedin.com/in/ayushrawal2507",
                        delay: "delay-2",
                      },
                      {
                        icon: <SiLeetcode />,
                        href: "https://leetcode.com/yourusername",
                        delay: "delay-3",
                      },
                      {
                        icon: <FaEnvelope />,
                        href: "mailto:ayushrawal25@gmail.com",
                        delay: "delay-4",
                      },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`social-icon-link pop-up ${social.delay}`}
                      >
                        <div className="text-2xl text-[#dc6c3c] hover:text-[#a9632d] transition-all duration-300">
                          {social.icon}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <SeparatorLine />

        {/* About Section */}
        <Section id="about" className="pt-8 pb-8">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl ml-5 font-bold mb-8 text-white pop-up delay-1">
              About
            </h2>
            <div className="flex flex-col md:flex-row gap-12 items-center">
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
                  className="bg-[#d98a3c] text-white py-3 px-6 rounded-md hover:bg-[#0f0f38] transition-all duration-300 mt-7 inline-flex items-center pop-up delay-5"
                >
                  <FontAwesomeIcon icon={faCamera} className="mr-2" />
                  Download CV
                </a>
              </div>
              <div className="md:w-2/5 flex justify-center pop-up delay-3">
                <img
                  src="./Home_page.png"
                  alt="Profile"
                  className="w-full h-full max-w-lg object-contain hover:scale-105 transition-all duration-300"
                  style={{
                    minHeight: "400px",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </div>
        </Section>

        <SeparatorLine />
        {/* Skills & Experience Section */}
        <Section id="skills" className="pt-8 pb-8">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-white pop-up delay-1">
              Skills & Experience
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column - Skills */}
              <div className="space-y-16">
                {/* Programming Languages */}
                <div
                  ref={programmingRef[0]}
                  className={`relative transition-all duration-700 ${
                    programmingRef[1]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-20"
                  }`}
                >
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
                          className="flex flex-col items-center transition-all duration-500 hover:-translate-y-2"
                          style={{ animationDelay: `${index * 100}ms` }}
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

                {/* Frameworks/Libraries */}
                <div
                  ref={frameworksRef[0]}
                  className={`relative transition-all duration-700 ${
                    frameworksRef[1]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-20"
                  }`}
                >
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
                        { name: "Bootstrap", icon: "devicon-bootstrap-plain" },
                        { name: "Tailwind", icon: "devicon-tailwindcss-plain" },
                      ].map((framework, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center transition-all duration-500 hover:-translate-y-2"
                          style={{ animationDelay: `${index * 100}ms` }}
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

                {/* Tools */}
                <div
                  ref={toolsRef[0]}
                  className={`relative transition-all duration-700 ${
                    toolsRef[1]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-20"
                  }`}
                >
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
                          className="flex flex-col items-center transition-all duration-500 hover:-translate-y-2"
                          style={{ animationDelay: `${index * 100}ms` }}
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
              <div className="space-y-16">
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
                  <div
                    key={index}
                    ref={experienceRefs[index][0]}
                    className={`relative transition-all duration-700 ${
                      experienceRefs[index][1]
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-20"
                    }`}
                  >
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
        {/* Education Section */}
        <Section id="education" className="pt-8 pb-8">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-5xl font-bold mb-16 text-white pop-up delay-1">
              Education
            </h2>
            <div className="flex flex-col md:flex-row gap-20">
              {/* Left Side - Animation */}
              <div className="md:w-1/2 flex items-center justify-center pop-up delay-2">
                <div className="relative">
                  <Lottie
                    loop
                    play
                    animationData={EducationAnimation}
                    style={{
                      width: "100%",
                      maxWidth: 500,
                      margin: 0,
                      display: "block",
                    }}
                    className="float-animation"
                  />
                </div>
              </div>

              {/* Right Side - Education Cards */}
              <div className="md:w-1/2 space-y-8">
                {educationData.map((edu, index) => (
                  <EducationCard
                    key={index}
                    education={edu}
                    reference={educationRefs[index][0]}
                    inView={educationRefs[index][1]}
                  />
                ))}
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
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  reference={projectRefs[index][0]}
                  inView={projectRefs[index][1]}
                />
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
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Side - Contact Info */}
              <div className="space-y-6">
                <p className="text-lg text-white pop-up delay-2">
                  Feel free to reach out to me for any questions or
                  opportunities. I'm always open to discussing new projects,
                  creative ideas, or opportunities to be part of your visions.
                </p>

                {/* Contact Details */}
                <div className="space-y-4 pop-up delay-3">
                  {[
                    {
                      icon: faEnvelope,
                      text: "ayushrawal25@gmail.com",
                      href: "mailto:ayushrawal25@gmail.com",
                    },
                    {
                      icon: faGithub,
                      text: "Ayushrawal25",
                      href: "https://github.com/Ayushrawal25",
                    },
                    {
                      icon: faLinkedin,
                      text: "ayushrawal2507",
                      href: "https://linkedin.com/in/ayushrawal2507",
                    },
                  ].map((contact, index) => (
                    <a
                      key={index}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-white hover:text-[#dc6c3c] transition-all duration-300 transform hover:-translate-x-2"
                      style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                    >
                      <FontAwesomeIcon
                        icon={contact.icon}
                        className="mr-4 text-[#dc6c3c]"
                      />
                      <span>{contact.text}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className="pop-up delay-4">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Name Input */}
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className="w-full p-3 rounded-md bg-[#0a2942] text-white border border-[#dc6c3c] 
                focus:outline-none focus:border-[#a9632d] transition-all duration-300
                transform group-hover:translate-y-[-2px]"
                      required
                    />
                    <div
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-[#dc6c3c] 
              transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className="w-full p-3 rounded-md bg-[#0a2942] text-white border border-[#dc6c3c] 
                focus:outline-none focus:border-[#a9632d] transition-all duration-300
                transform group-hover:translate-y-[-2px]"
                      required
                    />
                    <div
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-[#dc6c3c] 
              transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="relative group">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Message"
                      rows="4"
                      className="w-full p-3 rounded-md bg-[#0a2942] text-white border border-[#dc6c3c] 
                focus:outline-none focus:border-[#a9632d] transition-all duration-300
                transform group-hover:translate-y-[-2px] resize-none"
                      required
                    ></textarea>
                    <div
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-[#dc6c3c] 
              transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full p-3 rounded-md bg-[#0a2942] text-white border border-[#dc6c3c] 
              hover:bg-[#dc6c3c]/10 focus:outline-none focus:border-[#a9632d] 
              transition-all duration-300 transform hover:-translate-y-1
              relative overflow-hidden group"
                  >
                    <span className="relative z-10">Send Message</span>
                    <div
                      className="absolute inset-0 bg-[#dc6c3c] transform translate-y-full 
              group-hover:translate-y-0 transition-transform duration-300"
                    />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <div className="text-center py-4 text-gray-400 text-sm border-t border-[#7497b6]/20">
          <p className="pop-up delay-1">
            © 2025 Ayush Rawal. All Rights Reserved.
          </p>
        </div>
      </main>
    </div>
  );
};
export default App;
