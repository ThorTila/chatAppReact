const express = require('express'),
    http = require('http'),
    socketIo = require('socket.io'),
    UsersService = require('./UsersService'),
    MessagesService = require('./MessagesService'),
    app = express(),
    server = http.createServer(app),
    io = socketIo(server),
    userService = new UsersService(),
    messageService = new MessagesService();
    port = 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    socket.on('join', function(name){
        userService.addUser({
          id: socket.id,
          name
        });
        io.emit('update', {
          users: userService.getAllUsers()
        });
      });
      socket.on('disconnect', () => {
        userService.removeUser(socket.id);
        socket.broadcast.emit('update', {
          users: userService.getAllUsers()
        });
      });
      socket.on('message', function(message){
        const {name} = userService.getUserById(socket.id);
        socket.broadcast.emit('message', {
          text: message.text,
          from: name
        });
      });
  });

server.listen(port, function(){
  console.log('listening on *:' + port);
});