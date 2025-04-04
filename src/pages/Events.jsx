import React, { useState, useEffect, useRef } from "react";
import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";

import "aos/dist/aos.css";
import Sidebar from "@/components/ui/Sidebar";
const Events = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const navbarRef = useRef(null);
  const particlesCanvasRef = useRef(null);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Smooth scroll to section
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // Close mobile menu after clicking a link
    }
  };

  // Open event modal
  const openModal = (event) => {
    setModalContent(event);
    setIsModalOpen(true);
  };

  // Close event modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const navbar = navbarRef.current;
      if (navbar) {
        if (window.scrollY > 0) {
          navbar.classList.add("bg-white", "shadow-md");
          navbar.classList.remove("bg-transparent", "shadow-none");
        } else {
          navbar.classList.remove("bg-white", "shadow-md");
          navbar.classList.add("bg-transparent", "shadow-none");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = particlesCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];

    class Particle {
      constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = options.color;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.growing = true;
      }

      update(mouseX, mouseY) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction
        if (mouseX && mouseY) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            const force = (100 - distance) / 100;
            this.speedX -= Math.cos(angle) * force * 0.2;
            this.speedY -= Math.sin(angle) * force * 0.2;
          }
        }

        // Keep particles within bounds
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 107, 0, ${this.opacity})`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push(
          new Particle({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            color: `rgba(255, 107, 0, ${Math.random() * 0.5 + 0.2})`,
          })
        );
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Event data
  const events = [
    {
      id: 1,
      title: "Tech Summit 2024",
      date: "March 15, 2024",
      location: "Main Auditorium",
      description:
        "Join us for a day filled with cutting-edge technology discussions, hands-on workshops, and networking opportunities.",
      image:
        "https://source.unsplash.com/random/800x600/?tech-conference,technology",
    },
    {
      id: 2,
      title: "Innovation Workshop",
      date: "April 5, 2024",
      location: "Innovation Lab",
      description:
        "Hands-on workshop focusing on creative problem-solving and prototyping.",
      image: "https://source.unsplash.com/random/800x600/?innovation,workshop",
    },
    {
      id: 3,
      title: "24-Hour Hackathon",
      date: "May 20, 2024",
      location: "Tech Hub",
      description: "Code, create, and compete in our annual hackathon event.",
      image: "https://source.unsplash.com/random/800x600/?coding,hackathon",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#F4B57A] via-[#ff9c59] to-[#ffa472]">
      <Sidebar />
      <div className="p-5 font-poppins max-w-5xl mx-auto relative z-10 text-black">
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
      </div>
      <br></br>
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen bg-gradient-to-br from-[#F4B57A] via-[#ff9c59] to-[#ffa472]"
      >
        <br></br>
        <br></br>
        <div className="relative z-20 text-center p-6 bg-from-[#F4B57A] via-[#ff9c59] to-[#ffa472] backdrop-blur-sm rounded-lg border border-white/10">
          <h1 className="text-4xl md:text-6xl text-center font-bold bg-gradient-to-r from-orange-400 via-orange-600 to-orange-400 bg-clip-text text-transparent">
            Welcome to Innvosphere
          </h1>
          <br></br>
          <br></br>
          <p className="text-xl mb-8 animate-fade-in-up delay-300">
            Where Innovation Meets Excellence
          </p>
          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <span className="text-4xl font-bold">50+</span>
              <span className="block">Events</span>
            </div>
            <div className="text-center">
              <span className="text-4xl font-bold">1000+</span>
              <span className="block">Attendees</span>
            </div>
            <div className="text-center">
              <span className="text-4xl font-bold">20+</span>
              <span className="block">Speakers</span>
            </div>
          </div>
          <a
            href="#events"
            className="inline-block bg-[#E6512D] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#C4411F] transition-all"
          >
            Explore Events
          </a>
        </div>
      </section>

      {/* Events Section */}
      <section
        id="events"
        className="relative min-h-screen bg-gradient-to-br from-[#F4B57A] via-[#ff9c59] to-[#ffa472]"
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#E6512D] mb-12">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-[#FEF9E1] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#E6512D] mb-2">
                    {event.title}
                  </h3>
                  <p className="text-[#64748b] mb-4">
                    <i className="far fa-calendar-alt mr-2"></i>
                    {event.date}
                  </p>
                  <p className="text-[#64748b] mb-4">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    {event.location}
                  </p>
                  <p className="text-[#64748b] mb-4">{event.description}</p>
                  <button
                    className="bg-[#E6512D] text-white px-6 py-2 rounded-full hover:bg-[#C4411F] transition-colors"
                    onClick={() => openModal(event)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#FEF9E1] rounded-lg p-8 max-w-2xl w-full mx-4 relative">
            <button
              className="absolute top-4 right-4 bg-[#E6512D] text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#C4411F] transition-colors"
              onClick={closeModal}
            >
              <i className="fas fa-times"></i>
            </button>
            <img
              src={modalContent.image}
              alt={modalContent.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h3 className="text-3xl font-bold text-[#E6512D] mb-4">
              {modalContent.title}
            </h3>
            <div className="flex space-x-6 mb-6">
              <p className="text-[#64748b]">
                <i className="far fa-calendar-alt mr-2"></i>
                {modalContent.date}
              </p>
              <p className="text-[#64748b]">
                <i className="fas fa-map-marker-alt mr-2"></i>
                {modalContent.location}
              </p>
            </div>
            <p className="text-[#64748b]">{modalContent.description}</p>
          </div>
        </div>
      )}
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

export default Events;
