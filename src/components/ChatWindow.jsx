import React, { useState, useEffect } from 'react';

const ChatWindow = ({ messages, onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleSendMessage();
        }}
      />
      <button onClick={handleSendMessage}>Отправить</button>
    </div>
  );
};

export default ChatWindow;