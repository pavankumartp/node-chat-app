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
