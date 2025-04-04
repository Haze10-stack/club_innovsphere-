import React, { useEffect, useState } from "react";

import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";

import "aos/dist/aos.css";
import Sidebar from "@/components/ui/Sidebar";

const Projects = () => {
  const [loading, setLoading] = useState(true);
  const [currentProject, setCurrentProject] = useState("");
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const showFullScreen = (title, description, imageSrc) => {
    setCurrentProject(title);
    loadComments(title);
    document.getElementById("fullscreen-overlay").style.display = "flex";
  };

  const closeFullScreen = () => {
    document.getElementById("fullscreen-overlay").style.display = "none";
  };

  const addComment = () => {
    if (commentInput.trim() !== "") {
      const updatedComments = [...comments, commentInput];
      localStorage.setItem(currentProject, JSON.stringify(updatedComments));
      setComments(updatedComments);
      setCommentInput("");
    }
  };

  const loadComments = (project) => {
    const storedComments = JSON.parse(localStorage.getItem(project) || []);
    setComments(storedComments);
  };

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
      <br></br>

      {/* Showcase Section */}

      <div>
        <h1 className="text-6xl md:text-6xl text-center font-bold bg-gradient-to-r from-orange-400 via-orange-600 to-orange-400 bg-clip-text text-transparent">
          Explore Innovative Projects
        </h1>
        <p className="text-6xl md:text-3xl text-center font-bold bg-gradient-to-r from-orange-400 via-orange-600 to-orange-400 bg-clip-text text-transparent">
          A collection of groundbreaking tech projects.
        </p>
      </div>

      {/* Projects Section */}
      <div className="container mx-auto px-5">
        <section className="flex justify-center gap-8 mt-16">
          {[
            {
              title: "GitHub Project Manager",
              description:
                "A web tool for managing repositories, tracking issues, and monitoring pull requests.",
              image: "https://source.unsplash.com/400x300/?technology,code",
            },
            {
              title: "AI-Powered Chatbot",
              description:
                "An intelligent chatbot that interacts using AI and Natural Language Processing.",
              image: "https://source.unsplash.com/400x300/?technology,ai",
            },
            {
              title: "Portfolio Website",
              description:
                "A modern and interactive portfolio website to showcase professional work.",
              image: "https://source.unsplash.com/400x300/?website,design",
            },
          ].map((project, index) => (
            <div
              key={index}
              className="w-[30%] bg-white p-5 rounded-lg shadow-md cursor-pointer border-2 border-orange-500 min-h-[350px] hover:scale-105 hover:shadow-lg transition-transform"
              onClick={() =>
                showFullScreen(
                  project.title,
                  project.description,
                  project.image
                )
              }
            >
              <h3 className="text-2xl text-[#2C2C2C] mb-4">{project.title}</h3>
              <p className="text-lg text-[#2C2C2C]">{project.description}</p>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-cover rounded-lg mt-4 hover:scale-125 transition-transform"
              />
            </div>
          ))}
        </section>
      </div>

      {/* Fullscreen Overlay */}
      <div
        id="fullscreen-overlay"
        className="hidden fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      >
        <div className="bg-white p-6 rounded-lg text-center max-w-[800px] w-[90%]">
          <h2 id="fullscreen-title" className="text-3xl mb-2"></h2>
          <p id="fullscreen-description" className="text-lg mb-4"></p>
          <img
            id="fullscreen-image"
            src=""
            alt=""
            className="w-full h-auto rounded-lg mb-4"
          />
          <div
            id="comments-section"
            className="bg-white p-5 rounded-lg shadow-md mt-6"
          >
            <h3 className="text-2xl text-orange-500 mb-4">Comments</h3>
            <div id="comments-list" className="max-h-60 overflow-y-auto">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="bg-[#FFF3E0] p-3 rounded-lg mb-2 text-left border-l-4 border-orange-500"
                >
                  {comment}
                </div>
              ))}
            </div>
            <input
              type="text"
              id="comment-input"
              placeholder="Add a comment"
              className="w-[80%] p-2 border-2 border-orange-500 rounded-lg outline-none focus:border-[#e65100] focus:shadow-orange-200 mt-4"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button
              onClick={addComment}
              className="bg-orange-500 text-white px-5 py-2 rounded-lg mt-4 hover:bg-[#e65100] hover:scale-105 hover:shadow-md transition-all"
            >
              Add Comment
            </button>
          </div>
          <button
            onClick={closeFullScreen}
            className="bg-red-500 text-white px-5 py-2 rounded-lg mt-4 hover:bg-[#D32F2F] hover:scale-105 hover:shadow-md transition-all"
          >
            Close
          </button>
        </div>
      </div>

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

export default Projects;
