'use strict';

module.exports.listen = (server, user) => {
	var io = require('socket.io').listen(server);

  	io.sockets.on('connection', (socket) => {				
  		console.log("User has been connected");
	    require('./inventory.js').sockets(socket, io, user);
	    require('./chaudron.js').sockets(socket, io, user);
	    io.emit('init', {
	    	user: user
	    });
	});

	io.sockets.on('disconnect', (socket) => {
		console.log("User has been disconnected");
	});

};