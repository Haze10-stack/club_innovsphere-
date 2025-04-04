import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Spline from "@splinetool/react-spline";
import TypewriterHeading from "../components/ui/TypewriterHeading";
import { Sidebar } from "../components/ui/Sidebar";
import FocusCards from "../components/ui/FocusCards";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import "../App.css";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Observer);
}

const AnimatedText = ({ children }) => {
  const textRef = useRef(null);
  const [textColor, setTextColor] = useState("black");

  useEffect(() => {
    if (textRef.current) {
      // Initial setup
      gsap.set(textRef.current, {
        strokeDasharray: 2000,
        strokeDashoffset: 2000,
        fill: "transparent",
      });

      // Animation
      gsap.to(textRef.current, {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power2.inOut",
      });

      // Hover animations
      const handleMouseEnter = () => {
        gsap.to(textRef.current, {
          fill: "white",
          stroke: "white",
          duration: 0.7,
          ease: "power2.inOut",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(textRef.current, {
          fill: "transparent",
          stroke: textColor,
          duration: 0.7,
          ease: "power2.inOut",
        });
      };

      const element = textRef.current;
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);

      // Update text color based on scroll position
      const updateTextColor = () => {
        const scrollPosition = window.scrollY;
        const projectsSection = document.getElementById("projects");

        if (
          projectsSection &&
          scrollPosition >= projectsSection.offsetTop - 600
        ) {
          setTextColor("orange");
          gsap.to(textRef.current, {
            stroke: "orange",
            duration: 0.2,
            ease: "power1.out",
          });
        } else {
          setTextColor("black");
          gsap.to(textRef.current, {
            stroke: "black",
            duration: 0.2,
            ease: "power1.out",
          });
        }
      };

      window.addEventListener("scroll", updateTextColor);

      return () => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
        window.removeEventListener("scroll", updateTextColor);
      };
    }
  }, [textColor]);

  return (
    <svg
      width="100%"
      height="200"
      viewBox="-400 -100 1600 400"
      preserveAspectRatio="xMidYMid meet"
      className="overflow-visible pointer-events-auto"
      style={{ position: "relative", zIndex: 30 }}
    >
      <rect
        x="-400"
        y="-100"
        width="1600"
        height="400"
        fill="transparent"
        style={{ pointerEvents: "all" }}
      />
      <text
        ref={textRef}
        x="400"
        y="150"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="400"
        fontWeight="bold"
        fill="transparent"
        stroke={textColor}
        strokeWidth="5"
        style={{ cursor: "pointer" }}
      >
        {children}
      </text>
    </svg>
  );
};

const projectCards = [
  {
    title: "Web Development",
    src: "/images/web-dev.jpg",
    description: "Custom web solutions with modern frameworks",
    content: () => (
      <p>
        Our web development team builds responsive, high-performance websites
        using the latest technologies including React, Next.js, and Tailwind
        CSS. We focus on creating intuitive user experiences with clean code
        architecture.
      </p>
    ),
  },
  {
    title: "Mobile Applications",
    src: "/images/mobile-apps.jpg",
    description: "Native and cross-platform mobile solutions",
    content: () => (
      <p>
        We develop mobile applications for iOS and Android platforms using React
        Native and Flutter. Our apps feature smooth animations, offline
        capabilities, and integrate seamlessly with backend services.
      </p>
    ),
  },
  {
    title: "UI/UX Design",
    src: "/images/ui-design.jpg",
    description: "User-centered design that converts",
    content: () => (
      <p>
        Our design process begins with deep user research and wireframing,
        followed by creating high-fidelity prototypes and user testing. We
        deliver design systems that ensure consistency across all touchpoints.
      </p>
    ),
  },
  {
    title: "AI Solutions",
    src: "/images/ai-solutions.jpg",
    description: "Intelligent systems for business automation",
    content: () => (
      <p>
        We implement machine learning models and AI-powered features to automate
        processes, analyze data, and provide intelligent recommendations for
        your users and business operations.
      </p>
    ),
  },
  {
    title: "Cloud Services",
    src: "/images/cloud-services.jpg",
    description: "Scalable infrastructure for modern apps",
    content: () => (
      <p>
        Our cloud expertise spans AWS, Google Cloud, and Azure platforms. We
        design serverless architectures, implement CI/CD pipelines, and ensure
        your applications scale efficiently with your business needs.
      </p>
    ),
  },
  {
    title: "Data Analytics",
    src: "/images/data-analytics.jpg",
    description: "Turn data into actionable insights",
    content: () => (
      <p>
        We build custom dashboards and data visualization tools that help you
        understand user behavior, track KPIs, and make data-driven decisions to
        optimize your products and services.
      </p>
    ),
  },
];

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showSpline, setShowSpline] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const overlayRef = useRef(null);
  const projectsSectionRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
    });

    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = Math.min(Math.max(currentScroll / maxScroll, 0), 1);

      requestAnimationFrame(() => {
        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", handleScroll);

    const splineTimeout = setTimeout(() => {
      setShowSpline(true);
    }, 2000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(splineTimeout);
    };
  }, []);

  const dynamicBgColor = `linear-gradient(to bottom, 
    rgb(154, 69, 17) ${100 - scrollProgress * 100}%, 
    rgb(185, 56, 23) ${scrollProgress * 100}%)`;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#F4B57A] via-[#ff9c59] to-[#ffa472] flex flex-col">
        <Sidebar />
        <div className="flex-grow p-5 font-poppins max-w-5xl mx-auto relative z-10 text-black">
          <nav
            className="fixed top-3 left-6 right-16 z-50"
            data-aos="fade-down"
          >
            <div className="w-full max-w-1280 mx-auto px-4 py-3 flex justify-between items-center">
              <div className="flex items-center text-2xl font-bold text-black hover:text-glow transition-all duration-300">
                <img
                  src="logo.png"
                  alt="Innovsphere Logo"
                  className="w-10 h-10 mr-3"
                />
                InnovSphere
              </div>
            </div>
          </nav>
        </div>

        <div className="relative z-20 w-screen min-h-screen flex items-center justify-center pt-16">
          <div className="text-center max-w-7xl px-4 pointer-events-auto">
            {/* Spline Design */}
            <div className="absolute inset-0 z-10">
              <Spline scene="https://prod.spline.design/gImeFpcqbQM4mXYa/scene.splinecode" />
              {/* Hide the "Built with Spline" logo */}
            </div>

            {/* Innovation and Research Text */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mb-8 lg:gap-32 relative z-30">
              <div className="col-span-1">
                <AnimatedText>Innovation</AnimatedText>
              </div>
              <div className="col-span-1">
                {/* Empty space for Spline design in the middle */}
              </div>
              <div className="col-span-1">
                <AnimatedText>Research</AnimatedText>
              </div>
            </div>

            {/* Separate Paragraphs Below */}
            <div className="mt-16 text-center grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="col-span-1">
                <p className="text-black text-center md:text-xl font-bold">
                  Innovation is at the heart of everything we do. It drives us
                  to create groundbreaking solutions, push boundaries, and
                  deliver cutting-edge technologies that transform industries
                  and improve lives.
                </p>
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-1"></div>
              <div className="col-span-1">
                <p className="text-black text-center md:text-xl font-bold">
                  Research ensures we stay ahead of the curve. Through rigorous
                  analysis, experimentation, and collaboration, we uncover new
                  possibilities and refine our ideas to achieve excellence in
                  every project.
                </p>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>

        <div className="flex flex-col items-center justify-center py-16 relative z-30">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Image on the left */}
            <motion.div
              className="w-full md:w-1/2 flex justify-center"
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.img
                src="images/team.jpg"
                alt="Stylish Image"
                className="rounded-lg shadow-2xl w-full max-w-2xl h-auto transform hover:scale-105 transition-transform duration-300 border-4 border-orange-500"
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>

            {/* Text on the right */}
            <motion.div
              className="w-full md:w-1/2 p-6 text-center md:text-left"
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-orange-600 to-orange-400 bg-clip-text text-transparent mb-4">
                Welcome to InnovSphere
              </h2>
              <p className="text-lg text-gray-800 mb-6">
                InnovSphere bridges ideas and implementation by fostering
                innovation, collaboration, and technical excellence. We empower
                students through hands-on projects, workshops, and hackathons,
                helping them solve real-world challenges with cutting-edge tech.
              </p>
              <motion.button
                className="px-6 py-3 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        <div
          ref={projectsSectionRef}
          className="w-screen flex flex-col items-center justify-center py-16 relative z-30"
          id="projects"
        >
          <div className="text-center mb-16 mt-32" data-aos="fade-down">
            <TypewriterHeading
              text="Project Spotlight !!"
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-orange-600 to-orange-400 bg-clip-text text-transparent mb-4"
            />
          </div>

          <FocusCards cards={projectCards} />
        </div>
      </div>

      <footer className="bg-gradient-to-r from-[#ffa472] via-[#ff9c59] to-[#ffa472] py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3
            className="text-3xl mb-12 relative inline-block"
            data-aos="fade-down"
          >
            <span className="footer-title bg-gradient-to-r from-orange-400 via-orange-600 to-orange-400 bg-clip-text text-transparent font-bold">
              Follow Us
            </span>
          </h3>
          <div className="flex justify-center gap-12 flex-wrap">
            <a href="#" className="social-icon-wrapper group">
              <div className="social-icon instagram">
                <Instagram className="text-2xl text-white" />
              </div>
              <span className="social-tooltip">Instagram</span>
            </a>

            <a href="#" className="social-icon-wrapper group">
              <div className="social-icon facebook">
                <Facebook className="text-2xl text-white" />
              </div>
              <span className="social-tooltip">Facebook</span>
            </a>

            <a href="#" className="social-icon-wrapper group">
              <div className="social-icon linkedin">
                <Linkedin className="text-2xl text-white" />
              </div>
              <span className="social-tooltip">LinkedIn</span>
            </a>

            <a href="#" className="social-icon-wrapper group">
              <div className="social-icon youtube">
                <Youtube className="text-2xl text-white" />
              </div>
              <span className="social-tooltip">Youtube</span>
            </a>
          </div>
        </div>

        <style jsx>{`
          .social-icon-wrapper {
            position: relative;
            perspective: 1000px;
          }

          .social-icon {
            position: relative;
            width: 60px;
            height: 60px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.5s ease;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            overflow: hidden;
            cursor: pointer;
          }

          .instagram:hover {
            background: radial-gradient(
              circle at 30% 107%,
              #fdf497 0%,
              #fdf497 5%,
              #fd5949 45%,
              #d6249f 60%,
              #285aeb 90%
            );
            box-shadow: 0 0 20px rgba(214, 36, 159, 0.5);
            transform: translateY(-5px) rotateY(10deg);
          }

          .facebook:hover {
            background: #4267b2;
            box-shadow: 0 0 20px rgba(66, 103, 178, 0.5);
            transform: translateY(-5px) rotateY(-10deg);
          }

          .linkedin:hover {
            background: #0077b5;
            box-shadow: 0 0 20px rgba(0, 119, 181, 0.5);
            transform: translateY(-5px) rotateY(10deg);
          }

          .youtube:hover {
            background: #ff0000;
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
            transform: translateY(-5px) rotateY(-10deg);
          }

          .social-tooltip {
            position: absolute;
            bottom: -40px;
            left: 50%;
            transform: translateX(-50%) translateY(10px);
            background: rgba(255, 255, 255, 0.95);
            color: #000;
            padding: 8px 15px;
            border-radius: 5px;
            font-size: 0.875rem;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            white-space: nowrap;
            box-shadow: 0 5px 15px rgba(234, 121, 21, 0.2);
          }

          .social-tooltip::before {
            content: "";
            position: absolute;
            top: -5px;
            left: 50%;
            transform: translateX(-50%);
            border-width: 0 5px 5px 5px;
            border-style: solid;
            border-color: transparent transparent rgba(255, 255, 255, 0.95)
              transparent;
          }

          .social-icon-wrapper:hover .social-tooltip {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(0);
          }

          .social-icon:hover svg {
            transform: scale(1.2);
            animation: pulse 1s infinite;
          }

          @keyframes pulse {
            0% {
              transform: scale(1.2);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1.2);
            }
          }

          .footer-title {
            position: relative;
            background-size: 200% auto;
            animation: shine 3s linear infinite;
          }

          @keyframes shine {
            to {
              background-position: 200% center;
            }
          }
        `}</style>
      </footer>
    </>
  );
};

export default Home;
