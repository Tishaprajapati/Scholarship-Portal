/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Chatbot.css';
import { CHATBOT_URL } from '@/utiles/constant';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [showChatbot, setShowChatbot] = useState(false); // State for toggling chatbot visibility

  const handleSend = async () => {
    if (!userMessage.trim()) return;

    const newMessages = [...messages, { content: userMessage, sender: 'user' }];
    setMessages(newMessages);
    setUserMessage('');

    try {
      const response = await axios.post(
        `${CHATBOT_URL}`,
        { message: userMessage }, // Payload (body)
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      // Axios automatically parses JSON, so access data.message directly
      const data = response.data;

      // Log the chatbot's response to the console
      console.log('Chatbot message:', data.message);

      // Add the chatbot's response to the chat
      setMessages([...newMessages, { content: data.message, sender: 'bot' }]);
    } catch (error) {
      console.error('Error fetching message:', error);
      setMessages([...newMessages, { content: 'Error fetching message.', sender: 'bot' }]);
    }
  };

  const handleToggleChatbot = () => {
    setShowChatbot((prevState) => !prevState); // Toggle chatbot visibility
  };

  return (
    <div>
      {/* Show Button if Chatbot is Hidden */}
      {!showChatbot && (
        <button onClick={handleToggleChatbot} className="popup-button">
          AI Chatbot
        </button>
      )}

      {/* Show Chatbot if showChatbot is true */}
      {showChatbot && (
        <div className="chatbot-popup">
          <div className="chat-container">
            <div className="chat-window">
              <div className="chat-log">
                {messages.map((msg, index) => (
                  <div key={index} className={`chat-message ${msg.sender}`}>
                    {msg.content}
                  </div>
                ))}
              </div>
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                placeholder="Type your message here..."
              />
              <button onClick={handleSend}>Send</button>
            </div>
            <button onClick={handleToggleChatbot} className="close-chat">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
