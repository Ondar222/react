import React, { useEffect, useState } from 'react';
import data from './data/users.json'; 
import ChatRoom from './components/ChatRoom';

const UserProfile = () => {
  const [users, setUsers] = useState([]); // Состояние для хранения всех пользователей
  const [activeUser, setActiveUser] = useState(null); // Хранение текущего активного пользователя

  useEffect(() => {
    // Загружаем всех пользователей из JSON
    setUsers(data); // Сохраняем всех пользователей
  }, []);

  if (!users.length) {
    return <div>Загрузка...</div>; // Если пользователей еще нет, показываем загрузку
  }

  return (
    <div>
      <h1>Список пользователей</h1>
      {users.map((user, index) => (
        <div key={index} className="user-card">
          <h2>{user.name}</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <h3>Address:</h3>
          <p>{user.address.streetA}, {user.address.city}, {user.address.state}, {user.address.country}, {user.address.zipcode}</p>
          <h3>Company:</h3>
          <p>{user.company.name} - {user.company.catchPhrase}</p>
          <h3>Posts:</h3>
          {user.posts.map((post, postIndex) => (
            <div key={postIndex}>
              <p><strong>Sentence:</strong> {post.sentence}</p>
              <p>{post.paragraph}</p>
            </div>
          ))}

          {activeUser && (
            <>
              <h2>Выбранный пользователь для чата: {activeUser.name}</h2>
              <ChatRoom user={activeUser} />
            </>
          )}
        </div>
      ))}
      {activeUser && <ChatRoom user={activeUser} />}
    </div>
  );
};

export default UserProfile;