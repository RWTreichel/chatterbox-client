// YOUR CODE HERE:

// var message = {
//   username: 'Cody',
//   text: 'booga booga! (testing)',
//   roomname: ''
// };

var app = {};

app.init = function() {
  // var username = prompt('Please enter your username: ');
  // app.users = [username];
  // $('#buddyList').append('<span class="username">' + username + '</span>');

  $('.username').on('click', app.addFriend);
  $('#send .submit').on('submit', app.handleSubmit);
};

app.send = function(message) {
  $.ajax({
    url: "https://api.parse.com/1/classes/chatterbox",
    type: "POST",
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('Message sent.');
    },
    error: function(data) {
      console.log('Error: Message not sent.');
    }
  });
};

app.fetch = function() {
  $.ajax({
    //url: "https://api.parse.com/1/classes/chatterbox",
    type: "GET",
    contentType: 'application/json',
    success: function (data) {
      console.log('Messages retrieved.');
    },
    error: function(data) {
      console.log('Error: Message not retrieved.');
    }
  });
};

app.clearMessages = function() {
  $('#chats').children().remove();
};

app.addMessage = function(message) {
  $('#chats').append('<p><a href=# class="username">' + message.username + ':</a> ' + message.text + '</p>');
  if($('#roomSelect').find('#' + message.roomname).length === -1){

  }
};

app.addRoom = function(roomName) {
  $('#roomSelect').append('<option id="' + roomName + '"">' + roomName + '</option>');
};

app.addFriend = function(){
  // var user = this.innerHTML;
  // $('#friendList').append('<span class="username">' + user + '</span>');
};

app.handleSubmit = function(){

};

// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'https://api.parse.com/1/classes/chatterbox',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message');
//   }
// });