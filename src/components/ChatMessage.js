import React from 'react';
import { UserIcon, SparklesIcon } from '@heroicons/react/24/outline';

const ChatMessage = ({ message, isLoading = false }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`chat-message ${isUser ? 'user-message' : 'assistant-message'}`}>
      <div className="message-content">
        <div className="message-avatar">
          {isUser ? (
            <div className="w-8 h-8 bg-chat-accent rounded-sm flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-white" />
            </div>
          ) : (
            <div className="w-8 h-8 bg-chat-accent rounded-sm flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
        <div className="message-text">
          {isLoading ? (
            <div className="loading-dots">
              <div className="loading-dot"></div>
              <div className="loading-dot" style={{ animationDelay: '0.2s' }}></div>
              <div className="loading-dot" style={{ animationDelay: '0.4s' }}></div>
            </div>
          ) : (
            <div className="whitespace-pre-wrap">
              {message.content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 