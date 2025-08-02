import React from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const Sidebar = ({ onNewChat, conversations, onSelectConversation, onDeleteConversation, activeConversationId }) => {
  return (
    <div className="sidebar">
      <div className="mb-4">
        <button
          onClick={onNewChat}
          className="new-chat-button"
        >
          <PlusIcon className="w-5 h-5" />
          New Chat
        </button>
      </div>
      
      <div className="space-y-2">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
              activeConversationId === conversation.id
                ? 'bg-chat-input border border-chat-accent'
                : 'hover:bg-chat-input'
            }`}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm text-chat-text truncate">
                {conversation.title || 'New Conversation'}
              </p>
              <p className="text-xs text-chat-text-secondary">
                {conversation.messageCount} messages
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteConversation(conversation.id);
              }}
              className="p-1 text-chat-text-secondary hover:text-red-400 transition-colors"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      
      {conversations.length === 0 && (
        <div className="text-center text-chat-text-secondary text-sm mt-8">
          No conversations yet
        </div>
      )}
    </div>
  );
};

export default Sidebar; 