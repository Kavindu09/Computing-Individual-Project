import { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSubmit = async () => {
    if (!userMessage) return;

    // Add the user's message to the chat history
    const newChatHistory = [...chatHistory, { user: userMessage }];
    setChatHistory(newChatHistory);
    setUserMessage('');

    try {
      // Send the message to the Node.js backend
      const response = await axios.post('http://localhost:5000/chat', {
        message: userMessage,
      });

      // Add the bot's response to the chat history
      setChatHistory([
        ...newChatHistory,
        { user: userMessage, bot: response.data.message },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <div>
        {chatHistory.map((entry, index) => (
          <div key={index}>
            {entry.user && <p><strong>You:</strong> {entry.user}</p>}
            {entry.bot && <p><strong>Bot:</strong> {entry.bot}</p>}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
};

export default ChatBot;
