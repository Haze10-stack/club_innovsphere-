import React, { useState } from "react";
import { HiX } from "react-icons/hi";
import { FaLinkedin, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const WaveText = ({ text, onClick }) => {
  const letterVariants = {
    initial: { y: 0 },
    hover: (i) => ({
      y: [0, -10, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "loop",
        delay: i * 0.05,
      },
    }),
  };

  return (
    <motion.div
      className="block text-black hover:text-orange-600 transition-colors duration-300"
      initial="initial"
      whileHover="hover"
      onClick={onClick}
    >
      {text.split("").map((letter, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          style={{ display: "inline-block" }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const StaggeredFadeIn = ({ text, onClick }) => {
  return (
    <motion.div
      className="block text-black hover:text-orange-600 transition-colors duration-300"
      onClick={onClick}
    >
      {text.split("").map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: i * 0.03,
            ease: "easeOut",
          }}
          style={{ display: "inline-block" }}
          whileHover={{
            scale: 1.1,
            color: "#ea580c",
            transition: { duration: 0.2 },
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [animationType, setAnimationType] = useState("staggeredFade"); // Default to staggered fade

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleAnimationType = () => {
    setAnimationType(animationType === "wave" ? "staggeredFade" : "wave");
  };

  const menuItems = [
    "Home",
    "Projects",
    "Events",
    "Domains",
    "About",
    "Contactus",
  ];

  // Animation variants for the entire menu list
  const menuContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger the children animations
        delayChildren: 0.2, // Delay the start of children animations
      },
    },
  };

  // Animation variants for each menu item
  const menuItemVariants = {
    hidden: { opacity: 0, x: 50 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");
      `}</style>

      <button
        onClick={toggleSidebar}
        className="fixed top-6 right-6 z-50 p-2 focus:outline-none bg-transparent"
        aria-label="Toggle sidebar"
        style={{ boxShadow: "none" }}
      >
        {!isSidebarOpen && (
          <img
            src="images/menu.png"
            alt="Menu"
            className="w-10 h-10 opacity-80 hover:opacity-100 transition-opacity duration-300"
            style={{ filter: "none" }}
          />
        )}
      </button>

      {isSidebarOpen && (
        <motion.div
          className="fixed inset-y-0 right-0 w-3/4 md:w-1/2 bg-orange-300 z-50 flex overflow-hidden shadow-lg font-inter"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <button
            onClick={toggleSidebar}
            className="absolute top-6 right-6 text-black bg-transparent p-2 rounded-full hover:bg-black hover:text-white transition-all duration-300"
            style={{ boxShadow: "none", border: "none", outline: "none" }}
          >
            <HiX className="w-8 h-8" />
          </button>

          <button
            onClick={toggleAnimationType}
            className="absolute top-6 right-20 text-xs md:text-sm text-black bg-white/30 px-3 py-1 rounded-full hover:bg-black hover:text-white transition-all duration-300"
            style={{ boxShadow: "none", border: "none", outline: "none" }}
          >
            {animationType === "wave" ? "Fade Mode" : ":p"}
          </button>

          <div className="w-1/3 p-10 md:p-16 flex flex-col">
            <h2 className="text-xl font-medium md:text-2xl text-white mb-6 md:mb-8">
              Social
            </h2>

            <div className="space-y-4 md:space-y-6 text-lg md:text-xl">
              <a
                href="#"
                className="block text-black hover:text-orange-600 transition-all duration-300 flex items-center"
              >
                <FaLinkedin className="mr-2" /> LinkedIn
              </a>
              <a
                href="#"
                className="block text-black hover:text-orange-600 transition-all duration-300 flex items-center"
              >
                <FaInstagram className="mr-2" /> Instagram
              </a>
              <a
                href="#"
                className="block text-black hover:text-orange-600 transition-all duration-300 flex items-center"
              >
                <FaYoutube className="mr-2" /> YouTube
              </a>
              <a
                href="#"
                className="block text-black hover:text-orange-600 transition-all duration-300 flex items-center"
              >
                <FaGithub className="mr-2" /> GitHub
              </a>
            </div>

            <div className="mt-auto">
              <h2 className="text-xl md:text-2xl font-light text-white mb-3 md:mb-4">
                Get in touch
              </h2>
              <a
                href="mailto:innovsphere@example.com"
                className="text-black hover:text-orange-600 transition-all duration-300 border-b border-black"
              >
                innovsphere@example.com
              </a>
            </div>
          </div>

          <div className="w-2/3 p-10 md:p-16 flex flex-col">
            <h2 className="text-xl md:text-2xl font-medium text-white mb-6 md:mb-8">
              Menu
            </h2>

            <motion.div
              className="space-y-4 md:space-y-6 text-5xl md:text-7xl font-medium"
              variants={menuContainerVariants}
              initial="hidden"
              animate="show"
            >
              {menuItems.map((item, index) => (
                <motion.div key={index} variants={menuItemVariants}>
                  <Link
                    to={
                      item.toLowerCase() === "home"
                        ? "/"
                        : `/${item.toLowerCase().replace(/\s+/g, "-")}`
                    }
                    className="block"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {animationType === "wave" ? (
                      <WaveText text={item} />
                    ) : (
                      <StaggeredFadeIn text={item} />
                    )}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Sidebar;
