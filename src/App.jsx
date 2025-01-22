// App.jsx
import React, { useState, useEffect } from "react";
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

// Projects Component
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

// Section Component with enhanced animations
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

// Separator Line Component
const SeparatorLine = () => {
  return (
    <div className="w-[95%] md:w-[97%] lg:w-[95%] max-w-[1100px] h-[2px] mx-auto my-8">
      <div className="h-full bg-gradient-to-r from-[#201506] via-[#dc6c3c] to-[#060b20]"></div>
    </div>
  );
};
const App = () => {
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
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
        />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#060b20]">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-[#05091d] h-16 flex items-center justify-between px-6 z-50">
        {/* Logo Section */}
        <div className="flex items-center">
          <a
            href="#home"
            className="text-[#ea8d46] text-xl ml-4 font-mono hover:text-[#9e5e2e] transition-all duration-500"
          >
            {"<AR/>"}
          </a>
        </div>
        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center mr-9 space-x-8">
          <a
            href="#home"
            className="text-white text-xl hover:text-[#7497b6] transition-all duration-500"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-white text-xl hover:text-[#7497b6] transition-all duration-500"
          >
            About
          </a>
          <a
            href="#skills"
            className="text-white text-xl hover:text-[#7497b6] transition-all duration-500"
          >
            Skills & Experience
          </a>
          <a
            href="#projects"
            className="text-white text-xl hover:text-[#7497b6] transition-all duration-500"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-white text-xl hover:text-[#7497b6] transition-all duration-500"
          >
            Contact
          </a>
        </div>

        {/* Menu Button for Mobile */}
        <button
          className="lg:hidden fixed top-4 right-4 z-50 bg-[#c2872900] rounded-lg p-2 transition-all duration-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6 text-white transition-all duration-500"
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
          className={`fixed top-4 right-4 bg-[#eb9c2e00] transition-all duration-500 lg:hidden rounded-lg shadow-lg ${
            isMenuOpen
              ? "transform translate-x-0"
              : "transform translate-x-full"
          }`}
        >
          <div className="flex flex-col p-4 w-64 space-y-2">
            {[
              "Home",
              "About",
              "Skills & Experience",
              "Projects",
              "Contact",
            ].map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase().replace(/ & /g, "-")}`}
                className="text-white py-2 px-4 hover:bg-[#0a2942] rounded-md transition-all duration-500 stagger-item"
                onClick={() => setIsMenuOpen(false)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item}
              </a>
            ))}
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
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white pop-up delay-1">
                  Hi there! I am
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white pop-up delay-2 gradient-text">
                  Ayush Rawal
                </h1>
                <h2 className="text-2xl md:text-3xl text-[#a9632d] pop-up delay-3">
                  <TypeAnimation
                    sequence={[
                      "Web Developer",
                      2000,
                      "Creative Coder",
                      2000,
                      "Tech Enthusiast",
                      2000,
                    ]}
                    wrapper="span"
                    speed={75}
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
                    className="view-work-btn bg-[#05091e] text-white py-2 px-6 rounded-md hover:bg-[#314b61] transition-all duration-500"
                  >
                    View Work
                  </button>
                  <a
                    href="https://linkedin.com/in/ayushrawal2507"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-btn bg-transparent text-white py-2 px-6 rounded-md border border-[#7497b6] hover:bg-[#7497b6]/10 transition-all duration-500"
                  >
                    Contact Me
                  </a>
                </div>
              </div>

              {/* Right Side - Illustration */}
              <div className="md:w-1/2 flex justify-center items-center">
                <div className="relative flex md:flex-row flex-col items-center gap-8 pop-up delay-4">
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
                    {[
                      {
                        icon: <FaGithub />,
                        href: "https://github.com/Ayushrawal25",
                      },
                      {
                        icon: <FaLinkedin />,
                        href: "https://linkedin.com/in/ayushrawal2507",
                      },
                      {
                        icon: <SiLeetcode />,
                        href: "https://leetcode.com/yourusername",
                      },
                      {
                        icon: <FaEnvelope />,
                        href: "mailto:ayushrawal25@gmail.com",
                      },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon-link stagger-item"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        {React.cloneElement(social.icon, {
                          className:
                            "text-2xl text-[#dc6c3c] hover:text-[#a9632d] transition-all duration-500",
                        })}
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
                  {[
                    "Hello! I'm Ayush, a passionate software engineer based in India. My journey in technology began during my early college years, where I discovered my love for creating solutions through code.",
                    "Currently pursuing my B.Tech in Information Technology, I've been focusing on web development and software engineering. What excites me most about technology is its potential to solve real-world problems and make a positive impact on people's lives.",
                    "Beyond coding, I'm deeply interested in open-source contributions and staying up-to-date with the latest technological trends. I believe in the power of community and knowledge sharing, which drives me to actively participate in tech communities and collaborative projects.",
                  ].map((paragraph, index) => (
                    <p
                      key={index}
                      className={`text-white pop-up stagger-item`}
                      style={{ animationDelay: `${(index + 1) * 0.3}s` }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <a
                  href="https://drive.google.com/uc?export=download&id=1kIHolM2up9PgN8TZ2FEr5NlWYKAMQ8YX"
                  className="bg-[#d98a3c] text-white py-3 px-6 rounded-md hover:bg-[#0f0f38] transition-all duration-500 mt-7 flex items-center inline-block pop-up delay-5"
                  style={{ textDecoration: "none" }}
                >
                  <FontAwesomeIcon icon={faCamera} className="mr-2" />
                  Download CV
                </a>
              </div>
              <div className="md:w-2/5 flex justify-center pop-up delay-4">
                <img
                  src="./Home_page.png"
                  alt="Profile"
                  className="w-full h-full max-w-lg object-contain hover:scale-105 transition-all duration-500"
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
              Skills & Experience<span className="text-[#7497b6]">.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column - Skills */}
              <div className="pop-up delay-2 space-y-16">
                {/* Programming Languages Section */}
                <div className="relative">
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
                          className="flex flex-col items-center transition-all duration-500 hover:-translate-y-2 stagger-item"
                          style={{ animationDelay: `${index * 0.1}s` }}
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
                          className="flex flex-col items-center transition-all duration-500 hover:-translate-y-2 stagger-item"
                          style={{ animationDelay: `${index * 0.1}s` }}
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
                          className="flex flex-col items-center transition-all duration-500 hover:-translate-y-2 stagger-item"
                          style={{ animationDelay: `${index * 0.1}s` }}
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
                  <div
                    key={index}
                    className="relative stagger-item"
                    style={{ animationDelay: `${index * 0.3}s` }}
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
              {/* Left Side - Illustration */}
              <div className="md:w-1/2 flex items-center justify-center pop-up delay-2">
                <div className="relative">
                  <div className="w-full max-w-[600px] transition-all duration-500 hover:scale-105">
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
                    />
                  </div>
                </div>
              </div>

              {/* Right Side - Education Cards */}
              <div className="md:w-1/2 space-y-8 pop-up delay-3">
                {[
                  {
                    logo: "/CollegeLogo.png",
                    logoClass: "w-20 h-12",
                    title:
                      "Bharati Vidyapeeth's College of Engineering, New Delhi",
                    degree: "Bachelor of Technology",
                    period: "November 2021 - June 2025",
                    details: [
                      "• Major: Information Technology",
                      "• Minor: AI/ML",
                    ],
                  },
                  {
                    logo: "/cchs.png",
                    logoClass: "w-20 h-20",
                    title: "Cambridge Court High School, Jaipur",
                    degree: "Senior Secondary Education(XII)",
                    period: "2020 - 2021",
                    details: ["•Higher Secondary Education in PCM."],
                  },
                  {
                    logo: "/cchs.png",
                    logoClass: "w-20 h-20",
                    title: "Cambridge Court High School, Jaipur",
                    degree: "Secondary Education(X)",
                    period: "2018 - 2019",
                    details: [
                      "•Completed Secondary Education with focus on Academic Excellence.",
                    ],
                  },
                ].map((edu, index) => (
                  <div
                    key={index}
                    className="education-card bg-[#1a1a2e00] rounded-xl p-6 hover:bg-[#1a1a2e]/80 transition-all duration-500 stagger-item"
                    style={{ animationDelay: `${index * 0.3}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={edu.logo}
                        alt="Institution Logo"
                        className={`${edu.logoClass} rounded-lg transition-all duration-500 hover:scale-105`}
                      />
                      <div>
                        <h3 className="text-[#7497b6] text-xl font-semibold mb-1">
                          {edu.title}
                        </h3>
                        <h4 className="text-white mb-2">{edu.degree}</h4>
                        <p className="text-gray-400 mb-3">{edu.period}</p>
                        <ul className="space-y-2 text-gray-300">
                          {edu.details.map((detail, idx) => (
                            <li
                              key={idx}
                              className="transition-all duration-500 hover:translate-x-2"
                            >
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
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
                <div
                  key={project.id}
                  className="relative group overflow-hidden rounded-xl transform transition-all duration-700 hover:scale-105 hover:z-10 stagger-item"
                  style={{
                    animationDelay: `${index * 0.2}s`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Background Overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>

                  {/* Project Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[250px] object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Content Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#001829] via-[#001829]/80 to-transparent 
                       opacity-0 group-hover:opacity-100 transition-all duration-700 
                       flex flex-col justify-end p-6 transform translate-y-4 group-hover:translate-y-0"
                  >
                    <h3 className="text-xl font-bold text-white mb-2 transform transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                      {project.title}
                    </h3>

                    {/* Tech Stack Icons */}
                    <div className="flex gap-2 mb-3 transform transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                      {project.techStack.map((tech, idx) => (
                        <i
                          key={idx}
                          className={`${tech} text-2xl text-white transition-all duration-500 hover:scale-110`}
                        />
                      ))}
                    </div>

                    {/* Project Link */}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#7497b6] transition-all duration-500 
                         transform translate-y-4 group-hover:translate-y-0
                         inline-flex items-center gap-2 hover:gap-3"
                      >
                        <IoIosLink size="1.5rem" />
                        <span className="text-sm opacity-0 group-hover:opacity-100 transition-all duration-500">
                          View Project
                        </span>
                      </a>
                    )}
                  </div>

                  {/* Focus Effect Overlay */}
                  <div
                    className="absolute inset-0 ring-2 ring-transparent group-hover:ring-[#7497b6]/30 
                         transition-all duration-700 rounded-xl"
                  ></div>
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
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column - Contact Info */}
              <div className="space-y-6">
                <p className="text-lg text-white pop-up delay-2">
                  Feel free to reach out to me for any questions or
                  opportunities. I'm always open to discussing new projects,
                  creative ideas, or opportunities to be part of your visions.
                </p>
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
                      className="flex items-center text-white group transition-all duration-500 hover:translate-x-2 stagger-item"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <FontAwesomeIcon
                        icon={contact.icon}
                        className="mr-4 text-[#dc6c3c] group-hover:scale-110 transition-all duration-500"
                      />
                      <span className="group-hover:text-[#dc6c3c] transition-all duration-500">
                        {contact.text}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div className="pop-up delay-4">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {[
                    { name: "name", type: "text", placeholder: "Name" },
                    { name: "email", type: "email", placeholder: "Email" },
                  ].map((field, index) => (
                    <input
                      key={index}
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full p-3 rounded-md bg-[#0a2942] text-white border border-[#dc6c3c] 
                       focus:outline-none focus:border-[#a9632d] transition-all duration-500
                       hover:border-[#a9632d] transform hover:-translate-y-1
                       stagger-item"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    />
                  ))}
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows="4"
                    className="w-full p-3 rounded-md bg-[#0a2942] text-white border border-[#dc6c3c] 
                     focus:outline-none focus:border-[#a9632d] transition-all duration-500
                     hover:border-[#a9632d] transform hover:-translate-y-1
                     stagger-item"
                    style={{ animationDelay: "0.4s" }}
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full p-3 rounded-md bg-[#0a2942] text-white border border-[#dc6c3c] 
                     focus:outline-none focus:border-[#a9632d] transition-all duration-500
                     hover:bg-[#dc6c3c]/10 hover:border-[#a9632d] transform hover:-translate-y-1
                     stagger-item"
                    style={{ animationDelay: "0.6s" }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <div
          className="text-center py-4 text-gray-400 text-sm border-t border-[#7497b6]/20
                transform transition-all duration-500 hover:text-white"
        >
          © 2024 Ayush Rawal. All Rights Reserved.
        </div>
      </main>
    </div>
  );
};

export default App;
