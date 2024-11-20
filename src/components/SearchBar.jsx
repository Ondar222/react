import React, { useState, useEffect } from 'react';
import usersData from '../data/users.json';

const SearchBar = ({ users, onSearch, messages }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Crucial for selecting


  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [searchTerm, users]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    onSearch && onSearch(user); // Call the onSearch function (if provided)
    setSearchTerm(""); // Clear search bar
  };



  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Поиск пользователей"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="search-results">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.name}
              className="search-result"
              onClick={() => handleUserSelect(user)}
            >
              {user.name}
            </div>
          ))
        ) : (
          <div className="no-results">Пользователи не найдены</div>
        )}
      </div>
      {selectedUser && (
        <div className="selected_user_messages">
          {messages[selectedUser?.name] && (
            <ul>
              {messages[selectedUser?.name].map((message, index) => (
                <li key={index}>
                  <strong>{message.user}:</strong> {message.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
