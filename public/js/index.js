var socket = io();
socket.on('connect', function(){
  console.log('connected to server');

})
socket.on('disconnect', function(){
  console.log('disconnected from server');
})

socket.on('newMessage', function(message){
  console.log('New Message', message);
})

socket.on('welcome', function(message){
  console.log(message);
})

socket.on('newUser', function(message){
  console.log(message);
})
