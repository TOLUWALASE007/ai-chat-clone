import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ApiKeyModal from './components/ApiKeyModal';
import { sendMessageToOpenAI } from './services/openai';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

function App() {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || '');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [error, setError] = useState('');
  const chatContainerRef = useRef(null);

  // Load conversations from localStorage on mount
  useEffect(() => {
    const savedConversations = localStorage.getItem('conversations');
    if (savedConversations) {
      const parsed = JSON.parse(savedConversations);
      setConversations(parsed);
      if (parsed.length > 0) {
        setActiveConversationId(parsed[0].id);
      }
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('conversations', JSON.stringify(conversations));
  }, [conversations]);

  // Load messages for active conversation
  useEffect(() => {
    if (activeConversationId) {
      const savedMessages = localStorage.getItem(`messages_${activeConversationId}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        setMessages([]);
      }
    } else {
      setMessages([]);
    }
  }, [activeConversationId]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (activeConversationId && messages.length > 0) {
      localStorage.setItem(`messages_${activeConversationId}`, JSON.stringify(messages));
    }
  }, [messages, activeConversationId]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const createNewConversation = () => {
    const newConversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messageCount: 0,
      createdAt: new Date().toISOString()
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
    setMessages([]);
    setError('');
  };

  const selectConversation = (conversationId) => {
    setActiveConversationId(conversationId);
    setError('');
  };

  const deleteConversation = (conversationId) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    localStorage.removeItem(`messages_${conversationId}`);
    
    if (activeConversationId === conversationId) {
      const remainingConversations = conversations.filter(conv => conv.id !== conversationId);
      if (remainingConversations.length > 0) {
        setActiveConversationId(remainingConversations[0].id);
      } else {
        setActiveConversationId(null);
        setMessages([]);
      }
    }
  };

  const updateConversationTitle = (conversationId, title) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, title, messageCount: conv.messageCount + 1 }
          : conv
      )
    );
  };

  const handleSendMessage = async (messageText) => {
    if (!apiKey) {
      setShowApiKeyModal(true);
      return;
    }

    if (!activeConversationId) {
      createNewConversation();
      // Wait for the new conversation to be created
      setTimeout(() => handleSendMessage(messageText), 100);
      return;
    }

    const userMessage = {
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString()
    };

    // Update conversation title if it's the first message
    if (messages.length === 0) {
      updateConversationTitle(activeConversationId, messageText.slice(0, 50) + (messageText.length > 50 ? '...' : ''));
    } else {
      updateConversationTitle(activeConversationId, conversations.find(c => c.id === activeConversationId)?.title || 'New Conversation');
    }

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError('');

    try {
      // Prepare conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await sendMessageToOpenAI(messageText, conversationHistory, apiKey);

      if (response.success) {
        const assistantMessage = {
          role: 'assistant',
          content: response.message,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        setError(response.error);
        // Remove the user message if the API call failed
        setMessages(prev => prev.slice(0, -1));
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveApiKey = (newApiKey) => {
    setApiKey(newApiKey);
    localStorage.setItem('openai_api_key', newApiKey);
    setShowApiKeyModal(false);
  };

  return (
    <div className="flex h-screen bg-chat-bg">
      <Sidebar
        onNewChat={createNewConversation}
        conversations={conversations}
        onSelectConversation={selectConversation}
        onDeleteConversation={deleteConversation}
        activeConversationId={activeConversationId}
      />
      
      <div className="main-content">
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-chat-border">
            <h1 className="text-xl font-semibold text-chat-text">
              {conversations.find(c => c.id === activeConversationId)?.title || 'AI Chat Clone'}
            </h1>
            <button
              onClick={() => setShowApiKeyModal(true)}
              className="p-2 text-chat-text-secondary hover:text-chat-text transition-colors"
              title="Settings"
            >
              <Cog6ToothIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="chat-container" ref={chatContainerRef}>
            {messages.length === 0 && !isLoading && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-chat-text-secondary">
                  <h2 className="text-2xl font-semibold mb-2">Welcome to AI Chat Clone</h2>
                  <p className="text-lg">Start a conversation by typing a message below.</p>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}

            {isLoading && (
              <ChatMessage
                message={{ role: 'assistant', content: '' }}
                isLoading={true}
              />
            )}

            {error && (
              <div className="p-4 border-b border-chat-border bg-red-900/20">
                <div className="max-w-3xl mx-auto">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              </div>
            )}
          </div>

          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            disabled={!apiKey}
          />
        </div>
      </div>

      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        onSave={handleSaveApiKey}
        currentApiKey={apiKey}
      />
    </div>
  );
}

export default App; 