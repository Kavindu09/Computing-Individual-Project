import { useState } from 'react';
import ChatBot from './components/ChatBot';  // Ensure correct import path
import './App.css';  // Ensure that CSS is imported

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false); // State to control chat window visibility

  // Toggle chat window visibility
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <div className="header">
        <h1>Welcome to the Student Visa Chatbot</h1>
        <p>Click the icon to chat with us!</p>
      </div>

      {/* Floating Chat Icon */}
      <div className="chat-icon" onClick={toggleChat}>
        💬 {/* You can replace this with any icon of your choice */}
      </div>

      {/* ChatBot Component */}
      {isChatOpen && (
        <div className="chat-window">
          <ChatBot />
        </div>
      )}
    </>
  );
}

export default App;
