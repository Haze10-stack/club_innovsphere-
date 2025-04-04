import React, { useEffect, useState } from "react";

import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";

import "aos/dist/aos.css";
import Sidebar from "@/components/ui/Sidebar";
const Domains = () => {
  const [activeDomain, setActiveDomain] = useState(null);

  const handleDomainClick = (index) => {
    setActiveDomain(activeDomain === index ? null : index);
    console.log(`Selected Domain: ${domains[index].title}`);
  };

  const domains = [
    {
      icon: "assets/AI.svg",
      title: "AI",
      description: "Dive into AI, deep learning, and data science applications",
    },
    {
      icon: "assets/web_development.svg",
      title: "Web Development",
      description:
        "Create modern web applications using cutting edge technologies",
    },
    {
      icon: "assets/app_development.svg",
      title: "App Development",
      description: "Build innovative mobile applications for iOS and Android",
    },
    {
      icon: "assets/cc.svg",
      title: "Competitive Coding",
      description: "Enhance problem-solving and algorithmic thinking skills",
    },
    {
      icon: "assets/electronics.svg",
      title: "Electronics",
      description:
        "Explore hardware engineering, circuit design, and IoT development",
    },
    {
      icon: "assets/multimedia.svg",
      title: "Multimedia",
      description: "Master UI/UX principles and creative digital solutions",
    },
    {
      icon: "assets/database.svg",
      title: "Database",
      description: "Explore decentralized technologies and smart contracts",
    },
    {
      icon: "assets/R&D.svg",
      title: "R&D",
      description: "Learn about digital security and ethical hacking",
    },
    {
      icon: "assets/ar_vr.svg",
      title: "AR/VR",
      description:
        "Create immersive experiences using augmented and virtual reality",
    },
  ];

  return (
    <div className="font-poppins bg-gradient-to-b from-[#ff9c59] to-[#ffa472] text-white">
      <Sidebar />

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
      <header className="text-center py-24 bg-gradient-to-b from-[#F4B57A] to-[#ff9c59]">
        <h1 className="text-4xl md:text-6xl text-center font-bold bg-gradient-to-r from-orange-400 via-orange-600 to-orange-400 bg-clip-text text-transparent">
          Explore Our Domains
        </h1>
        <p className="text-2xl md:text-2xl text-center font-bold bg-gradient-to-r from-orange-400 via-orange-600 to-orange-400 bg-clip-text text-transparent">
          Discover the diverse areas we specialize in and find your passion
        </p>
        <a
          href="#"
          className="inline-block bg-[#E6512D] px-8 py-4 text-white rounded-full font-semibold mt-6 hover:scale-125 hover:bg-[#C4411F] transition-transform duration-300"
        >
          Join Our Community
        </a>
      </header>

      {/* Main Content */}
      <main className="flex justify-center">
        <div className="flex flex-wrap justify-evenly w-full max-w-7xl my-8 px-4">
          {/* Domain Cards */}
          {domains.map((domain, index) => (
            <div
              key={index}
              className="w-96 bg-[#E5D0AC] rounded-xl p-6 m-8 text-center shadow-md hover:w-[55%] hover:scale-110 hover:bg-[#FEF9E1] transition-all duration-400 group cursor-pointer"
              onClick={() => handleDomainClick(index)}
            >
              <div className={activeDomain === index ? "hidden" : "block"}>
                <img
                  src={domain.icon}
                  alt={domain.title}
                  className="w-16 h-16 mx-auto mb-4"
                />
                <h3 className="text-[#E6512D] text-xl my-4">{domain.title}</h3>
                <p className="text-[#64748b] text-sm leading-relaxed">
                  {domain.description}
                </p>
              </div>
              <div className={activeDomain === index ? "block" : "hidden"}>
                <h1 className="text-2xl text-[#E6512D]">Domain description</h1>
              </div>
            </div>
          ))}
        </div>
      </main>

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

export default Domains;
