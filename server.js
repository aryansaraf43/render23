const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

let messages = [];

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.emit('init', messages);

  socket.on('sendMessage', (msg) => {
    messages.push(msg);
    io.emit('newMessage', msg);
  });
});

server.listen(5000, () => console.log('Server running on port 5000'));
