const path = require('path');
var express = require('express');
const http = require('http');
const socketIO = require('socket.io');


var app = express();
var server= http.createServer(app);
var io = socketIO(server);

const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT||3000;

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('new connection established');

  socket.emit('welcome',{
    from: 'Admin',
    text: 'Welcome to the chat group',
    createdAt: new Date().getTime()
  })

  socket.broadcast.emit('newUser', {
    from: 'Admin',
    text: 'A new user joined',
    createdAt: new Date().getTime()
  })

 socket.on('createMessage', (message)=>{
    console.log('Create Message', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  })

  socket.on('disconnect', ()=>{
    console.log('client disconnected');
  })
});




server.listen(port,()=>{
      console.log(`server started on port ${port}`);
    });
