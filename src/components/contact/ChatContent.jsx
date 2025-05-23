import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

const ChatContent = ({ messages }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Scroll vers le bas quand de nouveaux messages sont ajoutés
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section 
      ref={containerRef}
      id="contact-content" 
      className="p-6 mx-auto my-4 max-w-2xl"
      style={{ maxHeight: '60vh', overflowY: 'auto' }}
    >
      {messages.map(message => (
        <ChatMessage
          key={message.id}
          message={message.text}
          isUser={message.isUser}
        />
      ))}
    </section>
  );
};

export default ChatContent;
