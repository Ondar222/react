import React, { useState } from 'react';

const ChatRoom = ({ channel, messages, users, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(users[0]?.name || '');

  const handleSend = () => {
    if (newMessage) {
      onSendMessage({
        text: newMessage,
        user: selectedUser, 
        timestamp: new Date(),
      });
      setNewMessage('');
    }
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <div className="chat-room">
      <h2>Чат: {channel}</h2>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message-container">
            <strong>{message.user}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <select value={selectedUser} onChange={handleUserChange}>
          {users.map((user) => (
            <option key={user.name} value={user.name}>
              {user.name}
            </option>
            
          ))}
        </select>

        
        <input
          type="text"
          placeholder="Введите сообщение..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Отправить</button>
      </div>
    </div>
  );
};

export default ChatRoom;