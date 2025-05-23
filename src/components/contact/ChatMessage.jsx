import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';

const ChatMessage = ({ message, isUser }) => {
  const messageRef = useRef(null);

  // Anime le message lorsqu'il est affiché
  useEffect(() => {
    if (messageRef.current) {
      anime({
        targets: messageRef.current,
        opacity: [0, 1],
        translateX: isUser ? [20, 0] : 0,
        translateY: !isUser ? [20, 0] : 0,
        duration: isUser ? 600 : 800,
        easing: isUser ? 'easeOutQuad' : 'easeOutExpo'
      });
    }
  }, [isUser]);

  return (
    <div 
      ref={messageRef}
      className={`chat ${isUser ? 'chat-end' : 'chat-start'} opacity-0`}
    >
      <div 
        className={`chat-bubble ${isUser ? 'chat-bubble-success' : 'chat-bubble-primary'}`}
        dangerouslySetInnerHTML={{ __html: message }}
      />
    </div>
  );
};

export default ChatMessage;
