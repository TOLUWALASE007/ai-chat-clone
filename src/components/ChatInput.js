import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

const ChatInput = ({ onSendMessage, isLoading, disabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        <form onSubmit={handleSubmit}>
          <textarea
            ref={textareaRef}
            className="chat-input"
            placeholder="Send a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || disabled}
            rows={1}
            maxLength={4000}
          />
          <button
            type="submit"
            className="send-button"
            disabled={!message.trim() || isLoading || disabled}
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput; 