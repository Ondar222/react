import React, { useState, useEffect } from 'react';
import ChannelList from './components/ChannelList';
import ChatRoom from './components/ChatRoom';
import SearchBar from './components/SearchBar';
import './styles/chat.css';
import usersData from './data/users.json';


const App = () => {
  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState('');
  const [messages, setMessages] = useState({});
  const [users, setUsers] = useState(usersData);
  const [searchResults, setSearchResults] = useState(users);


  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);

  };

  const handleJoinChannel = (channel) => {
    setActiveChannel(channel);

  };

  const handleSendMessage = (message) => {
    
    if (activeChannel) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [activeChannel]: [...(prevMessages[activeChannel] || []), message],
      }));
    }
  };

  const handleCreateChannel = (channelName) => {
    if (!channelName.trim()) return; 
    setChannels((prevChannels) => [...prevChannels, channelName]);
    setActiveChannel(channelName);
    setMessages((prevMessages) => ({ ...prevMessages, [channelName]: [] }));
  };

  return (
    <div className="app">
      <ChannelList
        channels={channels}
        onJoinChannel={handleJoinChannel}
        onCreateChannel={handleCreateChannel}
      />
      {activeChannel && (
        <div className="chat-container">
          <SearchBar
            users={users}
            onSearch={handleUserSelect}
            messages={messages}
          />
          <ChatRoom
            channel={activeChannel} 
            messages={messages[activeChannel] || []}
            users={users}
            onSendMessage={handleSendMessage}
          />

        </div>
      )}
    </div>
  );
};

export default App;