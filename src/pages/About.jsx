import React, { useEffect, useState, useRef } from "react";
import { Sidebar } from "../components/ui/Sidebar";
import { Instagram, Facebook, Linkedin, Youtube, Twitter } from "lucide-react";
import { FaRobot, FaCode, FaMobileAlt, FaCloud, FaFlask } from "react-icons/fa";
import "aos/dist/aos.css";
import AOS from "aos";
import { motion } from "framer-motion";

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

// Animated Text Component
const AnimatedText = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(textRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <div className="relative" ref={textRef}>
      <h1 
        className={`text-4xl md:text-5xl font-bold mb-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {children}
      </h1>
      <div 
        className={`absolute bottom-0 left-0 h-1 bg-orange-500 transition-all duration-1000 ${
          isVisible ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
        style={{ transitionDelay: "0.3s" }}
      ></div>
    </div>
  );
};

const AboutPage = () => {
  const [currentDomain, setCurrentDomain] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const cardsEl = useRef(null);
  const indicatorsContainer = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const domainData = {
    ai: [
      "Yash Gunjal",
      "Mansi Barse",
      "Rajwardhan Mali",
      "Anshul Khaire",
      "Karan Rajput",
      "Vighnesh Gupta",
      "Mahendrakumar Suthar",
      "Jayesh Bairagi",
      "Swara Shetye",
      "Aaryan Shelar",
      "Krishna Yamsalwar",
    ],
    webdev: [
      "Smrutikant Parida",
      "Ajaya Nandiyawar",
      "Om Agarwal",
      "Aryan Gupta",
      "Madhur Biradar",
      "Vedant Nikam",
      "Ayush Sahare",
      "Krushna Kodgirwar",
      "Saurabh Gangurde",
      "Sahil Unhale",
    ],
    appdev: [
      "Pratik Paithankar",
      "Aditya Kale",
      "Anushka Dabhade",
      "Tanmay Patil",
    ],
    cloud: [
      "Shivanand Satao",
      "Omkar Patil",
      "Mustafa Nazir",
      "Samruddha Barhanpurkar",
    ],
    rd: [
      "Anshul Khaire",
      "Mrugesh Kulkarni",
      "Atharv Bhavsar",
      "Pranav Chinthala",
      "Anup Deshmukh",
      "Anand Nair",
      "Raghav Vyas",
    ],
  };

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
    });

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = Math.min(Math.max(currentScroll / maxScroll, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    const adjustVisibleCards = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
      updateCardsPosition();
    };

    window.addEventListener("resize", adjustVisibleCards);
    adjustVisibleCards(); // Initial call to set visible cards

    return () => {
      window.removeEventListener("resize", adjustVisibleCards);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (currentDomain) {
      loadCards(currentDomain);
    }
  }, [currentDomain]);

  const loadCards = (domain) => {
    const data = domainData[domain];
    setTotalItems(data.length);
    const cardsContainer = cardsEl.current;
    const indicatorsContainerEl = indicatorsContainer.current;

    // Clear previous cards and indicators
    cardsContainer.innerHTML = "";
    indicatorsContainerEl.innerHTML = "";

    data.forEach((item) => {
      const card = document.createElement("div");
      card.className = "domain-card p-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl m-2 transform transition-all duration-300 hover:scale-105";
      const title = document.createElement("h3");
      title.className = "text-xl font-medium text-gray-800";
      title.textContent = item;
      card.appendChild(title);
      cardsContainer.appendChild(card);
    });

    const maxIndex = Math.ceil(data.length / visibleCards);
    for (let i = 0; i < maxIndex; i++) {
      const indicator = document.createElement("div");
      indicator.className = "domain-indicator h-3 w-3 rounded-full bg-gray-300 mx-1 cursor-pointer transition-all duration-300 hover:bg-orange-500";
      if (i === 0) indicator.classList.add("active", "bg-orange-500", "scale-125");

      indicator.addEventListener("click", () => {
        setCurrentIndex(i * visibleCards);
        updateCardsPosition();
      });

      indicatorsContainerEl.appendChild(indicator);
    }

    setTimeout(() => {
      const firstCard = cardsContainer.querySelector(".domain-card");
      if (firstCard) {
        const style = getComputedStyle(firstCard);
        setCardWidth(
          firstCard.offsetWidth +
            parseInt(style.marginLeft || 0) +
            parseInt(style.marginRight || 0)
        );
        updateCardsPosition();
      }
    }, 0);
  };

  const updateCardsPosition = () => {
    if (cardsEl.current) {
      const translateX = -currentIndex * cardWidth;
      cardsEl.current.style.transform = `translateX(${translateX}px)`;

      const indicators = document.querySelectorAll(".domain-indicator");
      indicators.forEach((ind, index) => {
        ind.classList.toggle(
          "active",
          Math.floor(currentIndex / visibleCards) === index
        );
        ind.classList.toggle(
          "bg-orange-500",
          Math.floor(currentIndex / visibleCards) === index
        );
        ind.classList.toggle(
          "scale-125",
          Math.floor(currentIndex / visibleCards) === index
        );
      });
    }
  };

  const navigateCards = (direction) => {
    if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (
      direction === "next" &&
      currentIndex < totalItems - visibleCards
    ) {
      setCurrentIndex(currentIndex + 1);
    }
    updateCardsPosition();
  };

  const dynamicBgColor = `linear-gradient(to bottom, 
    rgb(255, 235, 204) ${100 - scrollProgress * 50}%, 
    rgb(255, 165, 0) ${scrollProgress * 100}%)`;

  return (
    <div className="relative min-h-screen font-poppins">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />
      
      {/* Gradient background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" style={{ background: dynamicBgColor }} />
      
      <Sidebar />
      <div className="relative z-10 p-5 max-w-6xl mx-auto">
        <nav className="fixed top-3 left-6 right-16 z-50" data-aos="fade-down">
          <div className="w-full max-w-1280 mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center text-2xl font-bold text-black hover:text-orange-500 transition-all duration-300">
              <img
                src="logo.png"
                alt="Innovsphere Logo"
                className="w-10 h-10 mr-3"
              />
              InnovSphere
            </div>
          </div>
        </nav>
        
        <div className="pt-24 md:pt-32">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-20">
            <div className="w-full md:w-1/2 mb-10 md:mb-0" data-aos="fade-right">
              <div className="mb-8">
                <AnimatedText>Turning Concepts</AnimatedText>
                <AnimatedText>into Reality</AnimatedText>
              </div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-lg md:text-xl leading-relaxed text-gray-800 font-medium"
              >
                InnovSphere bridges ideas and implementation by fostering innovation,
                collaboration, and technical excellence. We empower students through
                hands-on projects, workshops, and hackathons, helping them solve
                real-world challenges with cutting-edge tech.
              </motion.p>
            </div>
            <div className="w-full md:w-2/5" data-aos="fade-left">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="p-6 rounded-xl bg-white/30 backdrop-blur-sm shadow-xl border border-white/20"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Goal</h2>
                <p className="text-gray-700">
                  Our community thrives on knowledge-sharing, mentorship, and skill-building, 
                  turning creative ideas into impactful projects. Join us in shaping the future 
                  of tech, one line of code at a time!
                </p>
              </motion.div>
            </div>
          </div>
          
          <div className="my-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-aos="fade-up">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="200">
              <motion.div 
                whileHover={{ y: -10 }}
                className="card bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
              >
                <img
                  className="w-full h-64 object-cover object-center"
                  src="https://media.licdn.com/dms/image/v2/D4D03AQG6DLX5hwQRoQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1713120490950?e=1746662400&v=beta&t=140FukK7Mrs4iyWFnBq3pAqkwBlXvzqfXTO52v92bxA"
                  alt="Sanket Palkar"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">Sanket Palkar</h3>
                  <p className="text-orange-600 font-medium">President</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="card bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
              >
                <img
                  className="w-full h-64 object-cover object-center"
                  src="https://media.licdn.com/dms/image/v2/D5635AQFKd4xl4Ngkng/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1731788370758?e=1741842000&v=beta&t=YI6QgoTih2bBBTk1QYSjiJMJPYPGFCCEyb8grLD71B0"
                  alt="Pranit Chilbule"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">Pranit Chilbule</h3>
                  <p className="text-orange-600 font-medium">Tech Lead</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="card bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
              >
                <img
                  className="w-full h-64 object-cover object-center"
                  src="https://media.licdn.com/dms/image/v2/D4D03AQGyQdX3x5aWHA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1721134516870?e=1746662400&v=beta&t=QL73gTeVypgMQJ-jddwWclcF8-kJedelgPj6Ikox0vY"
                  alt="Rajnandini Dharashive"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">Rajnandini Dharashive</h3>
                  <p className="text-orange-600 font-medium">Tech Lead</p>
                </div>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6" data-aos="fade-up" data-aos-delay="300">
              <motion.div 
                whileHover={{ y: -10 }}
                className="card bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
              >
                <img
                  className="w-full h-64 object-cover object-center"
                  src="https://media.licdn.com/dms/image/v2/D4D03AQEici8HY24Yhg/profile-displayphoto-shrink_800_800/B4DZT5yOWSHYAw-/0/1739357487885?e=1746662400&v=beta&t=ZAIPbtTmruTxq3lbRIaOBKSfAcRiUv8kYClW1zWpRKE"
                  alt="Vikas Doifode"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">Vikas Doifode</h3>
                  <p className="text-orange-600 font-medium">Web Head</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="card bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
              >
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">Ved Thorat</h3>
                  <p className="text-orange-600 font-medium">AI Head</p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="card bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
              >
                <img
                  className="w-full h-64 object-cover object-center"
                  src="https://media.licdn.com/dms/image/v2/D4D03AQF9YDegRs2dKw/profile-displayphoto-shrink_800_800/B4DZUKaRmMHwAc-/0/1739636415273?e=1746662400&v=beta&t=VLY9MG6cYpNZjqZWf6oah_3MVx37x27lK2S9tAUZVWs"
                  alt="Mandar Deotale"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">Mandar Deotale</h3>
                  <p className="text-orange-600 font-medium">App Dev Head</p>
                </div>
              </motion.div>
            </div>
            
            <div className="flex justify-center mt-6" data-aos="fade-up" data-aos-delay="400">
              <motion.div 
                whileHover={{ y: -10 }}
                className="card bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 w-full md:w-1/3"
              >
                <img
                  className="w-full h-64 object-cover object-center"
                  src="https://media.licdn.com/dms/image/v2/D4D03AQHpe0pmWGEYSQ/profile-displayphoto-shrink_800_800/B4DZPBA4AXHUAc-/0/1734110053845?e=1746662400&v=beta&t=wHCiprPOLOzN9JMlaF94JgESyWgVhiZyFCYRsqF1nqM"
                  alt="Darshan Atkari"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">Darshan Atkari</h3>
                  <p className="text-orange-600 font-medium">Cloud Head</p>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="my-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-aos="fade-up">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center" data-aos="fade-up" data-aos-delay="200">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl bg-white/30 backdrop-blur-sm shadow-lg"
              >
                <p className="text-5xl font-bold text-orange-500 mb-2">5</p>
                <p className="text-xl font-medium">Technical Domains</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl bg-white/30 backdrop-blur-sm shadow-lg"
              >
                <p className="text-5xl font-bold text-orange-500 mb-2">30+</p>
                <p className="text-xl font-medium">Members</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl bg-white/30 backdrop-blur-sm shadow-lg"
              >
                <p className="text-5xl font-bold text-orange-500 mb-2">7+</p>
                <p className="text-xl font-medium">Non-Technical Domains</p>
              </motion.div>
            </div>
          </div>
          
          <div className="my-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8" data-aos="fade-up">Explore Domains</h2>
            <motion.div 
              className="flex justify-center flex-wrap gap-4 mt-5"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                className={`domain-option flex flex-col items-center justify-center bg-black border-2 border-orange-500 text-orange-500 font-bold py-3 px-6 rounded-lg cursor-pointer transition-all duration-300 hover:bg-orange-500 hover:text-black hover:scale-105 ${
                  currentDomain === "ai" ? "bg-orange-500 text-black scale-105" : ""
                }`}
                onClick={() => setCurrentDomain("ai")}
              >
                <FaRobot className="text-3xl mb-2" />
                <span>AI</span>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                className={`domain-option flex flex-col items-center justify-center bg-black border-2 border-orange-500 text-orange-500 font-bold py-3 px-6 rounded-lg cursor-pointer transition-all duration-300 hover:bg-orange-500 hover:text-black hover:scale-105 ${
                  currentDomain === "webdev" ? "bg-orange-500 text-black scale-105" : ""
                }`}
                onClick={() => setCurrentDomain("webdev")}
              >
                <FaCode className="text-3xl mb-2" />
                <span>Web Dev</span>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                className={`domain-option flex flex-col items-center justify-center bg-black border-2 border-orange-500 text-orange-500 font-bold py-3 px-6 rounded-lg cursor-pointer transition-all duration-300 hover:bg-orange-500 hover:text-black hover:scale-105 ${
                  currentDomain === "appdev" ? "bg-orange-500 text-black scale-105" : ""
                }`}
                onClick={() => setCurrentDomain("appdev")}
              >
                <FaMobileAlt className="text-3xl mb-2" />
                <span>App Dev</span>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                className={`domain-option flex flex-col items-center justify-center bg-black border-2 border-orange-500 text-orange-500 font-bold py-3 px-6 rounded-lg cursor-pointer transition-all duration-300 hover:bg-orange-500 hover:text-black hover:scale-105 ${
                  currentDomain === "cloud" ? "bg-orange-500 text-black scale-105" : ""
                }`}
                onClick={() => setCurrentDomain("cloud")}
              >
                <FaCloud className="text-3xl mb-2" />
                <span>Cloud</span>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                className={`domain-option flex flex-col items-center justify-center bg-black border-2 border-orange-500 text-orange-500 font-bold py-3 px-6 rounded-lg cursor-pointer transition-all duration-300 hover:bg-orange-500 hover:text-black hover:scale-105 ${
                  currentDomain === "rd" ? "bg-orange-500 text-black scale-105" : ""
                }`}
                onClick={() => setCurrentDomain("rd")}
              >
                <FaFlask className="text-3xl mb-2" />
                <span>R&D</span>
              </motion.div>
            </motion.div>

            <div
              className={`max-w-4xl mx-auto relative mt-12 ${
                currentDomain ? "" : "hidden"
              }`}
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <button
                className="domain-nav-btn absolute left-0 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-orange-600 transition-all duration-300 shadow-lg z-10"
                aria-label="Previous"
                onClick={() => navigateCards("prev")}
              >
                <span className="sr-only">Previous</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="domain-cards-wrapper overflow-hidden mx-12 relative">
                <div
                  className="domain-cards flex transition-transform duration-500 ease-out"
                  ref={cardsEl}
                >
                  {/* Cards will be added dynamically */}
                </div>
              </div>

              <button
                className="domain-nav-btn absolute right-0 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-orange-600 transition-all duration-300 shadow-lg z-10"
                aria-label="Next"
                onClick={() => navigateCards("next")}
              >
                <span className="sr-only">Next</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="flex justify-center mt-4" ref={indicatorsContainer}>
              {/* Indicators will be added dynamically */}
            </div>
          </div>
          
          <div className="my-20" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Testimonials</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white/40 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20"
              >
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-orange-500 text-xl font-bold">S</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Saisha Patil</h3>
                    <p className="text-gray-600 text-sm">Computer Science Student</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "InnovSphere's workshops completely transformed my approach to programming. The hands-on projects and supportive community helped me gain confidence and technical skills I couldn't get in regular classes."
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white/40 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20"
              >
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-orange-500 text-xl font-bold">A</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Aarav Mehta</h3>
                    <p className="text-gray-600 text-sm">IT Engineering Student</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Being part of InnovSphere's AI domain helped me apply theoretical concepts to real projects. The mentorship I received from senior members was invaluable and eventually led to my first internship."
                </p>
              </motion.div>
            </div>
          </div>
          
          <div className="my-20" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Contact Us</h2>
            
            <div className="bg-white/30 backdrop-blur-sm rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Subject"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-all duration-300 shadow-lg"
                  >
                    Send Message
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="relative z-10 bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-col md:flex-row justify-between mb-12">
            <div className="mb-10 md:mb-0 md:w-1/3">
              <div className="flex items-center text-2xl font-bold text-white mb-6">
                <img src="logo.png" alt="InnovSphere Logo" className="w-10 h-10 mr-3" />
                InnovSphere
              </div>
              <p className="text-gray-400 mb-6">
                Empowering students to innovate, collaborate, and excel in the ever-evolving tech landscape through hands-on learning and real-world projects.
              </p>
              <div className="flex space-x-3">
                <SocialIcon icon={<Instagram size={18} />} tooltip="Instagram" hoverColor="bg-gradient-to-tr from-purple-600 to-pink-500" />
                <SocialIcon icon={<Facebook size={18} />} tooltip="Facebook" hoverColor="bg-blue-600" />
                <SocialIcon icon={<Linkedin size={18} />} tooltip="LinkedIn" hoverColor="bg-blue-700" />
                <SocialIcon icon={<Youtube size={18} />} tooltip="YouTube" hoverColor="bg-red-600" />
                <SocialIcon icon={<Twitter size={18} />} tooltip="Twitter" hoverColor="bg-blue-400" />
              </div>
            </div>
            
            <div className="flex flex-wrap md:w-3/5">
              <FooterLinkSection 
                title="Quick Links" 
                links={[
                  { label: "Home", href: "/" },
                  { label: "About", href: "/about" },
                  { label: "Events", href: "/events" },
                  { label: "Projects", href: "/projects" },
                  { label: "Contact", href: "/contact" }
                ]}
              />
              
              <FooterLinkSection 
                title="Domains" 
                links={[
                  { label: "Artificial Intelligence", href: "/domains/ai" },
                  { label: "Web Development", href: "/domains/webdev" },
                  { label: "App Development", href: "/domains/appdev" },
                  { label: "Cloud Computing", href: "/domains/cloud" },
                  { label: "Research & Development", href: "/domains/research" }
                ]}
              />
              
              <FooterLinkSection 
                title="Resources" 
                links={[
                  { label: "Blog", href: "/blog" },
                  { label: "Workshops", href: "/workshops" },
                  { label: "Tutorials", href: "/tutorials" },
                  { label: "FAQs", href: "/faqs" },
                  { label: "Join Us", href: "/join" }
                ]}
              />
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} InnovSphere. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="/privacy" className="text-gray-400 hover:text-orange-500 text-sm transition-colors duration-300">Privacy Policy</a>
                <a href="/terms" className="text-gray-400 hover:text-orange-500 text-sm transition-colors duration-300">Terms of Service</a>
                <a href="/cookies" className="text-gray-400 hover:text-orange-500 text-sm transition-colors duration-300">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;