'use strict';

const express = require('express');
const app = express();
const http = require('http');
const io = require('socket.io')(http);
const path = require('path');
const Chaudron = require('./core/controllers/ChaudronController.class.js');
const User = require('./core/controllers/UserController.class.js');

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, './public/views'));


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index');
});

var chaudron = new Chaudron();

var user = new User(chaudron);

const server = http.createServer(app);

require('./core/sockets/socket.js').listen(server, user);

server.listen(8080);