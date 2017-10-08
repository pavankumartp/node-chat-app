const path = require('path');
var express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {messageGenerator, messageLocationGenerator}= require('./utils/message.js');

var app = express();
var server= http.createServer(app);
var io = socketIO(server);

const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT||3000;

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('new connection established');

  socket.emit('newMessage', messageGenerator('admin', 'Welcome to the chat group'));


  socket.broadcast.emit('newMessage', messageGenerator('admin', 'A new user has joined') );

 socket.on('createMessage', (message)=>{
    console.log('Create Message', message);
    io.emit('newMessage', messageGenerator(message.from, message.text));
  })

  socket.on('createLocationMessage', (location)=>{
    io.emit('newLocationMessage', messageLocationGenerator('Admin', location.latitude, location.longitude));
  });

  socket.on('disconnect', ()=>{
    console.log('client disconnected');
  })
});




server.listen(port,()=>{
      console.log(`server started on port ${port}`);
    });
