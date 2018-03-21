const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const app= express();
const publicPath = path.join(__dirname, '../build');
console.log(publicPath);

var server=http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection',(socket)=>{
  console.log('New User Connected');
    socket.on('message',(message)=>{
        var text=message.data.text
        socket.broadcast.emit('newMessage',text);
    })
  socket.on('disconnect',()=>{
    console.log('Disconnected');
  })
});
server.listen(3000,()=>{
  console.log('Server is up at port 3000');
});
