  var socket = io();

  function scrollToBottom(){

   var messages = jQuery('#messages');
   var newMessage = messages.children('li:last-child');
   var clientHeight = messages.prop('clientHeight');
   var scrollTop = messages.prop('scrollTop');
   var scrollHeight = messages.prop('scrollHeight');
   var newMessageHeight = newMessage.innerHeight();
   var lastMessageHeight = newMessage.prev().innerHeight();

  console.log(`clientHeight: ${clientHeight}, scrollTop: ${scrollTop}, scrollHeight: ${scrollHeight}, newMsg:${newMessageHeight},
                 lastMessageHeight: ${lastMessageHeight}` )

  //if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight ){
    messages.scrollTop(scrollHeight);
  //}

  }

  socket.on('connect', function(){
    console.log('connected to server');

  })
  socket.on('disconnect', function(){
    console.log('disconnected from server');
  })

  socket.on('newMessage', function(message){

   var formattedTime = moment(message.createdAt).format("h:mm a");
   var template = jQuery('#message-template').html();
   var html= Mustache.render(template, {
     text:message.text,
     from:message.from,
     createdAt:formattedTime
   });
   jQuery('#messages').append(html);
   scrollToBottom();

    // var formattedTime = moment(message.createdAt).format("h:mm a");
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} at ${formattedTime}: ${message.text}` );
    // jQuery('#messages').append(li);
  })

  socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format("h:mm a");

    var template = jQuery('#location-message-template').html();
    var html= Mustache.render(template, {
      url:message.url,
      from:message.from,
      createdAt:formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target = "_blank">My current location</a>');
    // li.text(`${message.from} at ${formattedTime}:`);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
  })

  socket.on('welcome', function(message){
    console.log(message);
  })

  socket.on('newUser', function(message){
    console.log(message);
  })

  jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function(){
     messageTextBox.val('');
  })


  });

  var locationButton = jQuery('#send-location');
  locationButton.on('click', function(){
    if (!navigator.geolocation){
      alert('Your browser does not support Geolocation');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){
      locationButton.removeAttr('disabled').text('Send location');

      socket.emit('createLocationMessage',{
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, function(){
      locationButton.removeAttr('disabled').text('Send location');
      alert('Unable to fetch geolocation');
    })


  })
