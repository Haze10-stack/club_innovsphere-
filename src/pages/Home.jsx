import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Linkedin, Youtube, Twitter, MessageCircle } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Spline from '@splinetool/react-spline';
import TypewriterHeading from '../components/ui/TypewriterHeading';
import { Sidebar } from '../components/ui/Sidebar';
import FocusCards from '../components/ui/FocusCards';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { SplashCursor } from '@/components/ui/splash-cursor';
import AnimatedText from '../components/ui/AnimatedText'; // Ensure this is imported

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Observer);
}

// Loading Screen Component
const LoadingScreen = ({ progress, isComplete }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-orange-100"
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: isComplete ? 0 : 1,
        pointerEvents: isComplete ? 'none' : 'auto'
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative w-24 h-24 mb-8">
        <motion.div 
          className="absolute inset-0 border-4 border-orange-500 rounded-full"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: progress >= 1 ? 1 : 0.8, 
            opacity: progress >= 1 ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <img src="logo.png" alt="Innovsphere Logo" className="w-16 h-16" />
        </motion.div>
      </div>
      <motion.div
        className="text-xl font-medium text-orange-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {progress < 1 ? 'Loading...' : 'Welcome to Innovsphere'}
      </motion.div>
    </motion.div>
  );
};

// Social Icon Component for Footer
const SocialIcon = ({ icon, tooltip, hoverColor }) => {
  return (
    <div className="relative group">
      <motion.a 
        href="#" 
        className="w-10 h-10 rounded-full bg-gray-800/50 flex items-center justify-center text-white hover:text-white transition-all duration-300 backdrop-blur-sm border border-white/5 overflow-hidden"
        whileHover={{ y: -5 }}
        initial={{ y: 0 }}
      >
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${hoverColor}`}></div>
        <div className="relative z-10">
          {icon}
        </div>
      </motion.a>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1 mb-2 px-2 py-1 bg-white rounded text-xs font-medium text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {tooltip}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
      </div>
    </div>
  );
};

// Footer Link Section Component
const FooterLinkSection = ({ title, links }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 mb-8 md:mb-0">
      <h3 className="text-lg font-semibold text-orange-500 mb-4 relative">
        {title}
        <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-orange-500 -mb-2"></span>
      </h3>
      <ul>
        {links.map((link, index) => (
          <li key={index} className="mb-2">
            <a 
              href={link.href} 
              className="text-gray-400 hover:text-orange-500 transition-all duration-300 inline-block hover:translate-x-1 text-sm group"
            >
              <span className="opacity-0 group-hover:opacity-100 mr-1 transition-opacity duration-300">›</span>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
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
        using the latest technologies including React, Next.js, and Tailwind CSS.
        We focus on creating intuitive user experiences with clean code architecture.
      </p>
    ),
  },
  {
    title: "Mobile Applications",
    src: "/images/mobile-apps.jpg",
    description: "Native and cross-platform mobile solutions",
    content: () => (
      <p>
        We develop mobile applications for iOS and Android platforms using
        React Native and Flutter. Our apps feature smooth animations, offline capabilities,
        and integrate seamlessly with backend services.
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
        followed by creating high-fidelity prototypes and user testing.
        We deliver design systems that ensure consistency across all touchpoints.
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
        Our cloud expertise spans AWS, Google Cloud, and Azure platforms. We design
        serverless architectures, implement CI/CD pipelines, and ensure your
        applications scale efficiently with your business needs.
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
        understand user behavior, track KPIs, and make data-driven decisions
        to optimize your products and services.
      </p>
    ),
  },
];

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const overlayRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const [textColor, setTextColor] = useState("black");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle Spline loading event
  const handleSplineLoad = () => {
    setSplineLoaded(true);
    // Simulate additional resource loading
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + 0.1;
        if (newProgress >= 1) {
          clearInterval(progressInterval);
          // Add a small delay before finishing the loading screen
          setTimeout(() => {
            setPageLoaded(true);
          }, 500);
          return 1;
        }
        return newProgress;
      });
    }, 200);
  };

  useEffect(() => {
    // Start simulating initial loading progress
    let initialLoadingInterval = null;
    
    if (!splineLoaded) {
      initialLoadingInterval = setInterval(() => {
        setLoadingProgress(prev => {
          // Only go up to 0.7 before Spline loads, to indicate progress while waiting
          return prev < 0.7 ? prev + 0.05 : prev;
        });
      }, 300);
    }
    
    // Initialize animations once page is fully loaded
    if (pageLoaded) {
      // Make pageLoaded state available globally for AnimatedText component
      window.pageLoaded = true;
      
      AOS.init({
        duration: 1000,
        once: true,
        mirror: false,
        startEvent: 'DOMContentLoaded' // Use DOMContentLoaded instead of load
      });

      const handleScroll = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        const progress = Math.min(Math.max(currentScroll / maxScroll, 0), 1);

        requestAnimationFrame(() => {
          setScrollProgress(progress);
        });

        // Update text color and dark mode state based on scroll position
        if (projectsSectionRef.current) {
          const projectsPosition = projectsSectionRef.current.getBoundingClientRect().top;
          if (projectsPosition <= window.innerHeight * 0.8) {
            setTextColor("orange");
            setIsDarkMode(true);
          } else {
            setTextColor("black");
            setIsDarkMode(false);
          }
        }
      };

      window.addEventListener("scroll", handleScroll);

      // GSAP black overlay animation
      if (overlayRef.current && projectsSectionRef.current) {
        gsap.fromTo(overlayRef.current,
          { backgroundColor: 'rgba(0,0,0,0)' },
          {
            backgroundColor: 'rgba(0,0,0,0.9)',
            scrollTrigger: {
              trigger: projectsSectionRef.current,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 0.2,
            },
          }
        );
      }

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }

    return () => {
      if (initialLoadingInterval) {
        clearInterval(initialLoadingInterval);
      }
    };
  }, [pageLoaded, splineLoaded]);

  const dynamicBgColor = `linear-gradient(to bottom, 
  rgb(255, 235, 204) ${100 - scrollProgress * 100}%, 
  rgb(255, 165, 0) ${scrollProgress * 100}%)`;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen progress={loadingProgress} isComplete={pageLoaded} />
      
      <Sidebar />
      <div
        className="w-screen min-h-screen font-poppins transition-all duration-500 ease-in-out"
        style={{ background: dynamicBgColor }}
      >
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />

        {/* Gradient background */}
        <div
          className="fixed top-0 left-0 w-full h-full bg-gradient-to-br 
          from-orange-100 
          via-orange-200 
          to-orange-300 
          pointer-events-none
          transition-all duration-500 ease-in-out"
        />

        {/* Black overlay for GSAP animation */}
        <div
          ref={overlayRef}
          className="fixed top-0 left-0 w-full h-full pointer-events-none z-5"
          style={{ backgroundColor: 'rgba(0,0,0,0)' }}
        />

        <nav className="fixed top-3 left-6 right-16 z-50" data-aos="fade-down">
          <div className="w-full max-w-1280 mx-auto px-4 py-3 flex justify-between items-center transition-colors duration-300">
            <div className={`flex items-center text-2xl font-bold ${isDarkMode ? "text-orange-500" : "text-black"} hover:text-glow transition-all duration-300`}>
              <img src="logo.png" alt="Innovsphere Logo" className="w-10 h-10 mr-3" />
              Innovsphere
            </div>
          </div>
        </nav>

        {/* Spline 3D Component with onLoad handler */}
        <div className="absolute inset-0 z-10">
          <Spline 
            scene="https://prod.spline.design/gImeFpcqbQM4mXYa/scene.splinecode" 
            onLoad={handleSplineLoad}
          />
        </div>

        <div
          className="relative z-20 w-screen min-h-screen flex items-center justify-center pt-16"
          data-aos="fade-up"
          style={{ 
            pointerEvents: 'none',
            opacity: pageLoaded ? 1 : 0, // Hide content until loaded
            transition: 'opacity 0.5s ease-in-out'
          }}
        >
          <div className="text-center max-w-7xl px-4 pointer-events-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-24 mb-8 lg:gap-32">
              <div className="col-span-1">
                <AnimatedText>Innovation</AnimatedText>
              </div>
              <div className="col-span-1">
                <AnimatedText>Research</AnimatedText>
              </div>
              <div className="col-span-1">
                <AnimatedText>Teamwork</AnimatedText>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes lineFormation {
              0% {
                width: 0;
                opacity: 0;
              }
              100% {
                width: 100%;
                opacity: 1;
              }
            }

            @keyframes letterAppear {
              0% {
                opacity: 0;
                transform: translateY(-100px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .letter-span {
              display: inline-block;
              animation-fill-mode: forwards;
            }

            .letter-line {
              position: absolute;
              bottom: 0;
              left: 0;
              height: 3px;
              background-color: currentColor;
              animation: lineFormation 1.5s forwards;
            }
        `}</style>
        </div>

        {/* Project Spotlight section */}
        <div
          ref={projectsSectionRef}
          className="w-screen min-h-screen flex flex-col items-center justify-center py-16 relative z-30"
          id="projects"
        >
          <div className="text-center mb-16 mt-32" data-aos="fade-down">
            <TypewriterHeading
              text="Project Spotlight"
              className="text-4xl md:text-7xl font-bold mb-8 text-white"
            />
          </div>

          <FocusCards cards={projectCards} />
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-black/80 to-gray-900/80 py-16 relative z-30">
        <div className="max-w-7xl mx-auto px-4">
          {/* Footer Top Section */}
          <div className="flex flex-wrap justify-between mb-12">
            {/* Brand Section */}
            <div className="w-full md:w-1/3 mb-10 md:mb-0 pr-4" data-aos="fade-right" data-aos-delay="100">
              <div className="flex items-center mb-6">
                <img src="logo.png" alt="Innovsphere Logo" className="w-10 h-10 mr-3" />
                <span className="text-2xl font-bold text-orange-500">InnovSphere</span>
              </div>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                Connecting, Supporting and Empowering Students in their academic and professional journey. 
                We build innovative solutions using cutting-edge technologies.
              </p>
              <div className="flex space-x-4">
                <SocialIcon icon={<Instagram size={18} />} tooltip="Instagram" hoverColor="bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500" />
                <SocialIcon icon={<Facebook size={18} />} tooltip="Facebook" hoverColor="bg-blue-600" />
                <SocialIcon icon={<Twitter size={18} />} tooltip="Twitter" hoverColor="bg-blue-400" />
                <SocialIcon icon={<Linkedin size={18} />} tooltip="LinkedIn" hoverColor="bg-blue-700" />
                <SocialIcon icon={<Youtube size={18} />} tooltip="YouTube" hoverColor="bg-red-600" />
              </div>
            </div>

            {/* Quick Links */}
            <div className="w-full md:w-2/3 flex flex-wrap">
              <FooterLinkSection 
                title="Support" 
                links={[
                  { label: "Mentorship", href: "#" },
                  { label: "Career Guidance", href: "#" },
                  { label: "Academic Help", href: "#" },
                  { label: "Mental Wellness", href: "#" },
                  { label: "Peer Connect", href: "#" }
                ]}
              />
              
              <FooterLinkSection 
                title="Resources" 
                links={[
                  { label: "Study Materials", href: "#" },
                  { label: "Interview Prep", href: "#" },
                  { label: "Skill Workshops", href: "#" },
                  { label: "Community Forums", href: "#" },
                  { label: "Events", href: "#" }
                ]}
              />
              
              <FooterLinkSection 
                title="About Us" 
                links={[
                  { label: "Our Mission", href: "#" },
                  { label: "Team", href: "#" },
                  { label: "Join as Mentor", href: "#" },
                  { label: "Contact", href: "#" },
                  { label: "Privacy Policy", href: "#" }
                ]}
              />
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-orange-800/20 pt-8 mt-8" data-aos="fade-up" data-aos-delay="200">
            <div className="flex flex-wrap items-center justify-between">
              <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
                <h3 className="text-lg font-semibold text-white mb-2">Stay Updated</h3>
                <p className="text-gray-400 text-sm">Subscribe to our newsletter for the latest updates and innovations.</p>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="bg-gray-800 text-white px-4 py-2 rounded-l-md flex-1 focus:outline-none focus:ring-2 focus:ring-orange-500" 
                  />
                  <button className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-4 py-2 rounded-r-md transition-colors duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-500 text-sm mt-12 pt-6 border-t border-gray-800">
            <p>&copy; {new Date().getFullYear()} InnovSphere. All rights reserved.</p>
          </div>
        </div>
        
        {/* Footer Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-orange-500 rounded-full opacity-5 blur-3xl"></div>
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-500 rounded-full opacity-5 blur-3xl"></div>
        </div>
        
        <style jsx>{`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.05); opacity: 0.8; }
            100% { transform: scale(1); opacity: 0.5; }
          }
          .social-icon:hover svg {
            transform: scale(1.2);
            transition: transform 0.3s ease;
          }
        `}</style>
      </footer>
    </>
  );
};

export default LandingPage;
