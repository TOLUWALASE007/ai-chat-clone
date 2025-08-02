# AI Chat Clone

A modern, responsive ChatGPT clone built with React, Tailwind CSS, and OpenAI API. This application provides a beautiful chat interface similar to ChatGPT with conversation management, local storage, and a clean design.

## Features

- 🎨 **Modern UI**: Clean, responsive design with ChatGPT-like styling
- 💬 **Real-time Chat**: Send messages and receive AI responses
- 📁 **Conversation Management**: Create, switch between, and delete conversations
- 💾 **Local Storage**: Conversations and messages are saved locally
- 🔐 **Secure API Key**: API key is stored locally and never sent to external servers
- ⚡ **Auto-scroll**: Automatically scrolls to new messages
- 📱 **Responsive**: Works on desktop and mobile devices
- 🎯 **Error Handling**: Comprehensive error handling and user feedback
- 🔄 **Loading States**: Visual feedback during API calls

## Tech Stack

- **Frontend**: React 18.2.0
- **Styling**: Tailwind CSS 3.3.0
- **Icons**: Heroicons
- **API**: OpenAI GPT-3.5-turbo
- **Storage**: Local Storage (browser)

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- OpenAI API key

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd ai-chat-clone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Setup OpenAI API Key

1. **Get an API key:**
   - Visit [OpenAI Platform](https://platform.openai.com/api-keys)
   - Create a new API key
   - Copy the key (starts with `sk-`)

2. **Add the API key to the app:**
   - Click the settings icon (gear) in the top-right corner
   - Enter your API key in the modal
   - Click "Save"

## Usage

### Starting a New Conversation
- Click the "New Chat" button in the sidebar
- Or simply start typing a message

### Sending Messages
- Type your message in the input field at the bottom
- Press Enter or click the send button
- The AI will respond with helpful information

### Managing Conversations
- **Switch conversations**: Click on any conversation in the sidebar
- **Delete conversations**: Click the trash icon next to a conversation
- **Auto-save**: All conversations and messages are automatically saved

### Keyboard Shortcuts
- **Enter**: Send message
- **Shift + Enter**: New line in message

## Project Structure

```
ai-chat-clone/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ApiKeyModal.js
│   │   ├── ChatInput.js
│   │   ├── ChatMessage.js
│   │   └── Sidebar.js
│   ├── services/
│   │   └── openai.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## Components

### App.js
Main application component that manages state and coordinates between components.

### ChatMessage.js
Displays individual chat messages with user/assistant avatars and loading states.

### ChatInput.js
Handles message input with auto-resize textarea and send functionality.

### Sidebar.js
Manages conversation list with create, select, and delete functionality.

### ApiKeyModal.js
Secure modal for entering and validating OpenAI API key.

### openai.js
Service module for OpenAI API integration with error handling.

## Customization

### Colors
The app uses a custom color palette defined in `tailwind.config.js`:

- `chat-bg`: Main background color
- `chat-sidebar`: Sidebar background
- `chat-input`: Input field background
- `chat-accent`: Primary accent color
- `chat-text`: Primary text color

### Styling
All styles are defined using Tailwind CSS classes in `src/index.css`.

## Security Notes

- **API Key Storage**: API keys are stored in browser localStorage
- **No Backend**: All API calls are made directly from the frontend
- **Production Warning**: For production use, consider implementing a backend to handle API calls securely

## Troubleshooting

### Common Issues

1. **"Invalid API key" error:**
   - Verify your OpenAI API key is correct
   - Ensure you have sufficient credits in your OpenAI account

2. **Messages not saving:**
   - Check if localStorage is enabled in your browser
   - Clear browser cache and try again

3. **App not loading:**
   - Ensure all dependencies are installed: `npm install`
   - Check for any console errors

### API Limits
- OpenAI has rate limits and usage quotas
- Monitor your usage at [OpenAI Platform](https://platform.openai.com/usage)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section above
2. Review the console for error messages
3. Ensure your OpenAI API key is valid and has sufficient credits

---

**Note**: This is a demonstration project. For production use, implement proper security measures and consider using a backend service to handle API calls. 