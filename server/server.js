const path = require('path');
var express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {messageGenerator}= require('./utils/message.js');

var app = express();
var server= http.createServer(app);
var io = socketIO(server);

const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT||3000;

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('new connection established');

  socket.emit('welcome', messageGenerator('admin', 'Welcome to the chat group'));


  socket.broadcast.emit('newUser', messageGenerator('admin', 'A new user has joined') );

 socket.on('createMessage', (message)=>{
    console.log('Create Message', message);
    socket.broadcast.emit('newMessage', messageGenerator(message.from, message.text));
  })

  socket.on('disconnect', ()=>{
    console.log('client disconnected');
  })
});




server.listen(port,()=>{
      console.log(`server started on port ${port}`);
    });
