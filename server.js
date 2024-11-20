const express = require('express');
   const http = require('http');
   const socketIo = require('socket.io');

   const app = express();
   const server = http.createServer(app);
   const io = socketIo(server);

   let channels = {}; // Для хранения каналов и участников

   io.on('connection', (socket) => {
       console.log('A user connected');

       socket.on('create_channel', (channelName) => {
           if (!channels[channelName]) {
               channels[channelName] = { messages: [], users: [] };
           }
           socket.join(channelName);
           io.to(channelName).emit('user_joined', socket.id);
       });

       socket.on('send_message', (channelName, message) => {
           channels[channelName].messages.push(message);
           io.to(channelName).emit('receive_message', message);
       });

       socket.on('join_channel', (channelName) => {
           socket.join(channelName);
           socket.emit('previous_messages', channels[channelName]?.messages || []);
       });

       socket.on('disconnect', () => {
           console.log('User disconnected');
       });
   });

   const PORT = process.env.PORT || 5173;

   server.listen(PORT, () => {
       console.log(`Server is running on port ${PORT}`);
   });