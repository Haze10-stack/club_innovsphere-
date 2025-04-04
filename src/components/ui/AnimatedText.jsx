import React, { useState, useEffect, useRef } from 'react';
import 'aos/dist/aos.css';

import gsap from 'gsap';


const AnimatedText = ({ children }) => {
    const textRef = useRef(null);
    const [textColor, setTextColor] = useState("black");
  
    useEffect(() => {
      if (textRef.current) {
        // Initial setup
        gsap.set(textRef.current, {
          strokeDasharray: 2000,
          strokeDashoffset: 2000,
          fill: "transparent"
        });
  
        // Animation
        gsap.to(textRef.current, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "power2.inOut"
        });
  
        // Hover animations
        const handleMouseEnter = () => {
          gsap.to(textRef.current, {
            fill: "white",
            stroke: "white",
            duration: 0.7,
            ease: "power2.inOut"
          });
        };
  
        const handleMouseLeave = () => {
          gsap.to(textRef.current, {
            fill: "transparent",
            stroke: textColor,
            duration: 0.7,
            ease: "power2.inOut"
          });
        };
  
        const element = textRef.current;
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
  
        // Update text color based on scroll position - trigger earlier for faster color change
        const updateTextColor = () => {
          const scrollPosition = window.scrollY;
          const projectsSection = document.getElementById('projects');
  
          if (projectsSection && scrollPosition >= projectsSection.offsetTop - 600) { // Increased offset for earlier trigger
            setTextColor("orange");
            gsap.to(textRef.current, {
              stroke: "orange",
              duration: 0.2, // Faster transition
              ease: "power1.out"
            });
          } else {
            setTextColor("black");
            gsap.to(textRef.current, {
              stroke: "black",
              duration: 0.2, // Faster transition
              ease: "power1.out"
            });
          }
        };
  
        window.addEventListener('scroll', updateTextColor);
  
        return () => {
          element.removeEventListener('mouseenter', handleMouseEnter);
          element.removeEventListener('mouseleave', handleMouseLeave);
          window.removeEventListener('scroll', updateTextColor);
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
        style={{ position: 'relative', zIndex: 30 }}
      >
        <rect
          x="-400"
          y="-100"
          width="1600"
          height="400"
          fill="transparent"
          style={{ pointerEvents: 'all' }}
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
          style={{
            cursor: 'pointer'
          }}
        >
          {children}
        </text>
      </svg>
    );
  };
export default AnimatedText;
