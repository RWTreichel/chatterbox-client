
var app = {};

app.init = function() {
  $(document).on('click', '.username', function(e) {
    e.preventDefault();
    var friend = $(this).text();

    app.addFriend(friend);
  });

  $('#send .submit').on('click', app.handleSubmit);

  $('#setRoom .submit').on('click', function() {
    var room = $('#roomName').val();
    app.addRoom(room);
    $('#roomName').val('');
  });

  $('#roomSelect').on('change', function() {
    app.currentRoom = $(this).val();
    $('#roomSelect option[selected=selected]').removeAttr('selected');
    $('#roomSelect option[value=' + app.currentRoom + ']').attr('selected', 'selected');
    $('#chats p').remove();
  });
  
  app.fetch();
  app.addRoom("Main");
  $('#roomSelect option[value="Main"]').attr('selected', "selected");
  app.currentRoom = $('#roomSelect option:selected').val();
  app.friendList = [];
  setInterval(app.fetch, 5000);
};


app.send = function(message) {
  var msg = {
    username: app.username,
    text: message,
    room: app.currentRoom
  };

  $.ajax({
    url: "https://api.parse.com/1/classes/chatterbox",
    type: "POST",
    data: JSON.stringify(msg),
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
    url: "https://api.parse.com/1/classes/chatterbox",
    type: "GET",
    contentType: 'application/json',
    success: function (data) {
      var results = data.results;
      _.each(results, function(msgObj) {
        if (msgObj.room === app.currentRoom){
          app.addMessage(msgObj);
        }
      });
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
  var newMessage = $('#chats').append('<p><a href=# class="username">' + safe_tags_replace(message.username) + '</a>: ' 
    + safe_tags_replace(message.text) + '</p>');

  if (app.friendList.indexOf(message.username) !== -1) {
    newMessage.addClass('friend');
  }
};

app.addRoom = function(roomName) {
  if (roomName) {
    $('#roomSelect').append('<option value=' + roomName + '>' + roomName +'</option>');
  }
};

app.addFriend = function(friend){
  if (app.friendList.indexOf(friend) === -1) {
    app.friendList.push(friend);
  }
};

app.handleSubmit = function(){
  var message = $('#message').val();
  app.send(message);
  $('#message').val('');
};

var tagsToReplace = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
};

function replaceTag(tag) {
  return tagsToReplace[tag] || tag;
}

function safe_tags_replace(str) {
  if (typeof str === 'string') {
    return str.replace(/[&<>]/g, replaceTag);
  } else {
    return "";
  }
}

//app.send('<script>alert("butts");</script>BUTTS!<img src = "http://static.tumblr.com/1c3a644c67161c3ae298f01cacffafec/xxkaj0a/twvnajogy/tumblr_static_9wc4r1jmljk80o448cc0000cs.gif"><style type="text/css">body {color:green; background-color: yellow}</style><audio controls autoplay><source src="http://a.tumblr.com/tumblr_lxlw3oVWBz1qjlbuco1.mp3" type="audio/mp3"></audio>');
