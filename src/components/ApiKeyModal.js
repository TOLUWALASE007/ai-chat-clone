import React, { useState } from 'react';
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const ApiKeyModal = ({ isOpen, onClose, onSave, currentApiKey }) => {
  const [apiKey, setApiKey] = useState(currentApiKey || '');
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your OpenAI API key');
      return;
    }

    setIsValidating(true);
    setError('');

    try {
      // Import and validate the API key
      const { validateApiKey } = await import('../services/openai');
      const validation = await validateApiKey(apiKey);

      if (validation.valid) {
        onSave(apiKey);
        onClose();
      } else {
        setError('Invalid API key. Please check your OpenAI API key.');
      }
    } catch (err) {
      setError('Failed to validate API key. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-chat-sidebar border border-chat-border rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-chat-text">OpenAI API Key</h2>
          <button
            onClick={onClose}
            className="text-chat-text-secondary hover:text-chat-text"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-start space-x-2 mb-3">
            <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-chat-text-secondary">
              <p>Your API key is stored locally and never sent to our servers.</p>
              <p className="mt-1">Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-chat-accent hover:underline">OpenAI Platform</a></p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-chat-text mb-2">
            API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full p-3 bg-chat-input border border-chat-border rounded-lg text-chat-text placeholder-chat-text-secondary focus:outline-none focus:border-chat-accent"
            placeholder="sk-..."
            autoFocus
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 p-3 border border-chat-border rounded-lg text-chat-text hover:bg-chat-input transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isValidating}
            className="flex-1 p-3 bg-chat-accent text-white rounded-lg hover:bg-chat-accent-hover transition-colors disabled:opacity-50"
          >
            {isValidating ? 'Validating...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal; 