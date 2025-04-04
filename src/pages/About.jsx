import React, { useEffect, useState, useRef } from "react";
import { Sidebar } from "../components/ui/Sidebar";
import { Instagram, Facebook, Linkedin, Youtube, Twitter, ChevronLeft, ChevronRight } from "lucide-react";
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

// Simple Text Component (without line - removed the line as requested)
const SimpleText = ({ children }) => {
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

  // Updated gradient background - pure orange gradient
  const backgroundGradient = `linear-gradient(135deg, 
    #FF9800, #FF5722, #FF9800)`;

  return (
    <div className="relative min-h-screen font-poppins">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />
      
      {/* Gradient background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" style={{ background: backgroundGradient }} />
      
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
                <SimpleText>Turning Concepts</SimpleText>
                <SimpleText>into Reality</SimpleText>
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
                className="card bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 relative group"
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
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href="#" className="bg-white/80 rounded-full p-2 hover:bg-orange-500 hover:text-white transition-all duration-300">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="bg-white/80 rounded-full p-2 hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <Linkedin size={18} />
                  </a>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="card bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 relative group"
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
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href="#" className="bg-white/80 rounded-full p-2 hover:bg-orange-500 hover:text-white transition-all duration-300">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="bg-white/80 rounded-full p-2 hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <Linkedin size={18} />
                  </a>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="card bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 relative group"
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
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href="#" className="bg-white/80 rounded-full p-2 hover:bg-orange-500 hover:text-white transition-all duration-300">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="bg-white/80 rounded-full p-2 hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <Linkedin size={18} />
                  </a>
                </div>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6" data-aos="fade-up" data-aos-delay="300">
              <motion.div 
                whileHover={{ y: -10 }}
                className="card bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 relative group"
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
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href="#" className="bg-white/80 rounded-full p-2 hover:bg-orange-500 hover:text-white transition-all duration-300">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="bg-white/80 rounded-full p-2 hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <Linkedin size={18} />
                  </a>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="card bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 relative group"
              >
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">Ved Thorat</h3>
                  <p className="text-orange-600 font-medium">AI Head</p>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href="#" className="bg-white/80 rounded-full p-2 hover:bg-orange-500 hover:text-white transition-all duration-300">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="bg-white/80 rounded-full p-2 hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <Linkedin size={18} />
                  </a>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="card bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 relative group"
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
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href="#" className="bg-white/80 rounded-full p-2 hover:bg-orange-500 hover:text-white transition-all duration-300">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="bg-white/80 rounded-full p-2 hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <Linkedin size={18} />
                  </a>
                </div>
              </motion.div>
            </div>
            
            <div className="flex justify-center mt-6" data-aos="fade-up" data-aos-delay="400">
              <motion.div 
                whileHover={{ y: -10 }}
                className="card bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 w-full md:w-1/3 relative group"
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
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href="#" className="bg-white/80 rounded-full p-2 hover:bg-orange-500 hover:text-white transition-all duration-300">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="bg-white/80 rounded-full p-2 hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <Linkedin size={18} />
                  </a>
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
                  currentDomain === "ai" ? "bg-orange-500 !text-black scale-105" : ""
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
                  currentDomain === "webdev" ? "bg-orange-500 !text-black scale-105" : ""
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
                  currentDomain === "appdev" ? "bg-orange-500 !text-black scale-105" : ""
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
                  currentDomain === "cloud" ? "bg-orange-500 !text-black scale-105" : ""
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
                  currentDomain === "rd" ? "bg-orange-500 !text-black scale-105" : ""
                }`}
                onClick={() => setCurrentDomain("rd")}
              >
                <FaFlask className="text-3xl mb-2" />
                <span>R&D</span>
              </motion.div>
            </motion.div>

            {currentDomain && (
              <div className="mt-16 relative" data-aos="fade-up">
                <h3 className="text-2xl font-bold text-center mb-6">
                  {currentDomain === "ai" && "AI Team"}
                  {currentDomain === "webdev" && "Web Development Team"}
                  {currentDomain === "appdev" && "App Development Team"}
                  {currentDomain === "cloud" && "Cloud Team"}
                  {currentDomain === "rd" && "Research & Development Team"}
                </h3>
                
                <div className="flex items-center justify-center mb-6">
                  <button
                    className="bg-black text-orange-500 hover:bg-orange-500 hover:text-black p-3 rounded-full shadow-lg mr-4 transform transition-all duration-300 focus:outline-none flex items-center justify-center"
                    onClick={() => navigateCards("prev")}
                    disabled={currentIndex === 0}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  
                  <div className="overflow-hidden w-full max-w-4xl">
                    <div
                      ref={cardsEl}
                      className="flex transition-transform duration-500 ease-in-out"
                    ></div>
                  </div>
                  
                  <button
                    className="bg-black text-orange-500 hover:bg-orange-500 hover:text-black p-3 rounded-full shadow-lg ml-4 transform transition-all duration-300 focus:outline-none flex items-center justify-center"
                    onClick={() => navigateCards("next")}
                    disabled={currentIndex >= totalItems - visibleCards}
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
                
                <div className="flex justify-center items-center mt-4">
                  <div
                    ref={indicatorsContainer}
                    className="flex space-x-2"
                  ></div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" data-aos="fade-up">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-aos="fade-up" data-aos-delay="200">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="p-6 bg-white/30 backdrop-blur-sm rounded-xl shadow-lg border border-white/10"
              >
                <h3 className="text-2xl font-bold text-orange-500 mb-3">Innovation</h3>
                <p className="text-gray-800">
                  We're committed to exploring new ideas and technologies, pushing boundaries and thinking outside the box. 
                  InnovSphere encourages creative problem-solving and cutting-edge solutions.
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="p-6 bg-white/30 backdrop-blur-sm rounded-xl shadow-lg border border-white/10"
              >
                <h3 className="text-2xl font-bold text-orange-500 mb-3">Collaboration</h3>
                <p className="text-gray-800">
                  We believe in the power of teamwork. By bringing together diverse skills and perspectives, 
                  we create a supportive environment where knowledge is shared freely.
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="p-6 bg-white/30 backdrop-blur-sm rounded-xl shadow-lg border border-white/10"
              >
                <h3 className="text-2xl font-bold text-orange-500 mb-3">Excellence</h3>
                <p className="text-gray-800">
                  We strive for technical excellence in everything we do. Quality code, robust solutions,
                  and attention to detail are hallmarks of our approach to technology.
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="p-6 bg-white/30 backdrop-blur-sm rounded-xl shadow-lg border border-white/10"
              >
                <h3 className="text-2xl font-bold text-orange-500 mb-3">Growth</h3>
                <p className="text-gray-800">
                  We're dedicated to continuous learning and skill development. InnovSphere is a place
                  where members can experiment, fail, learn, and ultimately grow into better technologists.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white pt-16 pb-8 mt-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 mb-8 md:mb-0">
              <div className="flex items-center mb-6">
                <img src="logo.png" alt="InnovSphere Logo" className="w-10 h-10 mr-3" />
                <h2 className="text-2xl font-bold text-orange-500">InnovSphere</h2>
              </div>
              <p className="text-gray-400 mb-8 pr-4">
                Empowering the next generation of tech innovators through collaboration, 
                learning, and hands-on project experience.
              </p>
              <div className="flex space-x-3">
                <SocialIcon icon={<Instagram size={20} />} tooltip="Instagram" hoverColor="bg-gradient-to-r from-purple-500 to-pink-500" />
                <SocialIcon icon={<Linkedin size={20} />} tooltip="LinkedIn" hoverColor="bg-blue-600" />
                <SocialIcon icon={<Twitter size={20} />} tooltip="Twitter" hoverColor="bg-sky-500" />
                <SocialIcon icon={<Youtube size={20} />} tooltip="YouTube" hoverColor="bg-red-600" />
              </div>
            </div>
            
            <FooterLinkSection 
              title="Quick Links"
              links={[
                { label: "Home", href: "#" },
                { label: "About Us", href: "#" },
                { label: "Events", href: "#" },
                { label: "Projects", href: "#" },
                { label: "Gallery", href: "#" },
              ]}
            />
            
            <FooterLinkSection 
              title="Our Domains"
              links={[
                { label: "Artificial Intelligence", href: "#" },
                { label: "Web Development", href: "#" },
                { label: "App Development", href: "#" },
                { label: "Cloud Computing", href: "#" },
                { label: "Research & Development", href: "#" },
              ]}
            />
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500 mb-4 md:mb-0">
                © {new Date().getFullYear()} InnovSphere. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-sm text-gray-500 hover:text-orange-500 transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="text-sm text-gray-500 hover:text-orange-500 transition-colors duration-300">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll progress bar */}
        <div className="fixed bottom-0 left-0 h-1 bg-orange-500 z-50" style={{ width: `${scrollProgress * 100}%` }}></div>
      </footer>
    </div>
  );
};

export default AboutPage;
