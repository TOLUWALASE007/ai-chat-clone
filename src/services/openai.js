import OpenAI from 'openai';

// Initialize OpenAI client only when API key is available
let openai = null;

const initializeOpenAI = (apiKey) => {
  if (!apiKey) {
    openai = null;
    return;
  }
  
  openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // Note: In production, API calls should be made from backend
  });
};

export const sendMessageToOpenAI = async (message, conversationHistory = [], apiKey) => {
  if (!apiKey) {
    return {
      success: false,
      error: 'API key is required. Please add your OpenAI API key in settings.'
    };
  }

  // Initialize OpenAI client with the provided API key
  initializeOpenAI(apiKey);

  try {
    // Prepare conversation messages
    const messages = [
      {
        role: 'system',
        content: 'You are a helpful AI assistant. Provide clear, accurate, and helpful responses.'
      },
      ...conversationHistory,
      {
        role: 'user',
        content: message
      }
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
      stream: false
    });

    return {
      success: true,
      message: response.choices[0].message.content,
      usage: response.usage
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    if (error.response?.status === 401) {
      return {
        success: false,
        error: 'Invalid API key. Please check your OpenAI API key.'
      };
    } else if (error.response?.status === 429) {
      return {
        success: false,
        error: 'Rate limit exceeded. Please try again later.'
      };
    } else if (error.response?.status === 500) {
      return {
        success: false,
        error: 'OpenAI service is currently unavailable. Please try again later.'
      };
    } else {
      return {
        success: false,
        error: 'An error occurred while processing your request. Please try again.'
      };
    }
  }
};

export const validateApiKey = async (apiKey) => {
  if (!apiKey) {
    return { 
      valid: false, 
      error: 'API key is required' 
    };
  }

  try {
    initializeOpenAI(apiKey);
    await openai.models.list();
    return { valid: true };
  } catch (error) {
    return { 
      valid: false, 
      error: error.message 
    };
  }
}; 