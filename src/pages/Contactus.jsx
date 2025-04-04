import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/ui/Sidebar";
import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";

import "aos/dist/aos.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
  });

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInterestToggle = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest)
      );
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formData, interests: selectedInterests });
    // Here you would normally send the data to your backend
    alert("Request sent successfully!");
  };

  const interests = [
    "Opensource",
    "App from scratch",
    "UX/UI design",
    "ROS",
    "Development",
    "Data Structures & Algorithms",
    "Cyber security",
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4B57A] via-[#ff9c59] to-[#ffa472] flex flex-col">
      <Sidebar />
      <div className="flex-grow p-5 font-poppins max-w-5xl mx-auto relative z-10 text-black">
        <nav className="fixed top-3 left-6 right-16 z-50" data-aos="fade-down">
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

        <motion.div
          className="w-full max-w-4xl"
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <br></br>
          <br></br>
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600"
            variants={itemVariants}
          >
            Contact Us !!
          </motion.h1>

          <motion.div className="mb-12" variants={itemVariants}>
            <p className="text-2xl text-black-100 mb-6">I'm interested in...</p>
            <div className="flex flex-wrap gap-3">
              {interests.map((interest) => (
                <motion.button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedInterests.includes(interest)
                      ? "bg-orange-500 text-black border-orange-500 shadow-lg shadow-orange-500/20"
                      : "bg-white/10 backdrop-blur-sm border-orange-500/50 text-black-100 hover:border-orange-400"
                  } transition-all duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {interest}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="group relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 backdrop-blur-sm border-b-2 border-orange-500/70 py-4 px-2 text-xl text-black-100 placeholder-orange focus:outline-none focus:border-orange-400 focus:border-b-2 transition-all duration-300"
                  required
                />
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-orange-500 to-orange-300 group-focus-within:w-full transition-all duration-500"></div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="group relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 backdrop-blur-sm border-b-2 border-orange-500/70 py-4 px-2 text-xl text-black-100 placeholder-orange focus:outline-none focus:border-orange-400 focus:border-b-2 transition-all duration-300"
                  required
                />
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-orange-500 to-orange-300 group-focus-within:w-full transition-all duration-500"></div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="group relative">
                <textarea
                  name="project"
                  placeholder="Tell us about your project"
                  value={formData.project}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 backdrop-blur-sm border-b-2 border-orange-500/70 py-4 px-2 text-xl text-black-100 placeholder-orange focus:outline-none focus:border-orange-400 focus:border-b-2 transition-all duration-300"
                  rows={4}
                  required
                />
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-orange-500 to-orange-300 group-focus-within:w-full transition-all duration-500"></div>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 text-orange-100"
              variants={itemVariants}
            >
              <div className="relative">
                <motion.button
                  type="button"
                  className="flex items-center text-orange-400 hover:text-orange-300 transition-colors group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                  <span className="ml-2">Add attachment</span>
                </motion.button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                className="px-8 py-3 bg-white/10 backdrop-blur-sm border-2 border-orange-500 text-orange-400 hover:bg-orange-500/10 hover:text-orange-300 hover:border-orange-400 rounded-md transition-all duration-300 text-xl relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Send request</span>
                <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>

      {/* Footer */}
      <footer
        className="bg-gradient-to-r  from-[#ffa472] 
               via-[#ff9c59] 
               to-[#ffa472] py-16"
      >
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
              <span className="social-tooltip">YouTube</span>
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
    </div>
  );
};

export default ContactUs;
