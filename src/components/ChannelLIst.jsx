import React, { useState } from 'react';

const ChannelList = ({ channels, onJoinChannel, onCreateChannel }) => {
    const [newChannel, setNewChannel] = useState('');

    const handleCreateChannel = () => {
        if (newChannel) {
            onCreateChannel(newChannel);
            setNewChannel(''); // Сброс введенного имени канала
        }
    };

    return (
        <div className="channel-list">
            <h2>Каналы</h2>
            <input 
                type="text"
                placeholder="Создать новый канал"
                value={newChannel}
                onChange={(e) => setNewChannel(e.target.value)}
            />
            <button style={{width: "100%"}} onClick={handleCreateChannel}>Создать</button>
            <ul>
                {channels.map((channel, index) => (
                    <li key={index} onClick={() => onJoinChannel(channel)}>
                        {channel}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChannelList;