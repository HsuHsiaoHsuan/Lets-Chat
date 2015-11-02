var express = require("express");
var app = express();
var port = process.env.PORT || 5566;

app.use(express.static( __dirname + '/static' ));
app.use(function(req, res) {
    res.sendFile( __dirname + '/static/index.html');
});

var messages = [];
var io = require('socket.io').listen(app.listen(port));
io.sockets.on('connection', function(socket) {
  socket.emit('connected');

  socket.on('getAllMessages', function() {
    socket.emit('allMessages', message);
  });
  socket.on('createMessage', function(message) {
    messages.posh(message);
    io.sockets.emit('messageAdded', message);
  });
});

console.log('Server is on port ' + port);
