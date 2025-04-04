
import React, { useState, useEffect } from 'react';

const TypewriterHeading = ({ text, className }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  
  const typingSpeed = 150;
  const pauseDelay = 2000;
  const cursorBlinkSpeed = 530;
  
  
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, cursorBlinkSpeed);
    
    return () => clearInterval(cursorInterval);
  }, []);

 
  useEffect(() => {
    let timer;
    
    if (isTyping && displayText.length < text.length) {
      timer = setTimeout(() => {
        setDisplayText(text.substring(0, displayText.length + 1));
      }, typingSpeed);
    } else if (isTyping && displayText.length === text.length) {
      timer = setTimeout(() => {
        setIsTyping(false);
      }, pauseDelay);
    } else if (!isTyping && displayText.length > 0) {
      timer = setTimeout(() => {
        setDisplayText(displayText.substring(0, displayText.length - 1));
      }, typingSpeed / 2);
    } else if (!isTyping && displayText.length === 0) {
      timer = setTimeout(() => {
        setIsTyping(true);
      }, pauseDelay / 2);
    }
    
    return () => clearTimeout(timer);
  }, [displayText, isTyping, text]);

  return (
    <h2 className={className}>
      {displayText}
      <span className={`ml-1 inline-block w-2 h-14 bg-white ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
    </h2>
  );
};

export default TypewriterHeading;