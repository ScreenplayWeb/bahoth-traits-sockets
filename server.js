/**
Betrayal at House on the Hill Player Aid (v_2.1 October 2020)  Created by Sean Doyle.*/
const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
//PAGE ROUTING
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.use(express.static(path.join(__dirname, '/public')));

//GAME VARIABLES
var players = [];
var setupComplete = false;


//SET SOCKET SERVER LISTENERS===========================
io.on('connection', function(socket) {
console.log('A player connected: ' + socket.id);
	
//If setup complete, send new visitors the game screen.
	if (setupComplete === true) {
		io.emit('start game',players);
	}
	
	socket.on('register players', function(newPlayers) {
		players = newPlayers;
		
		if (players.length > 0) {
			io.emit('start game',players);
		}
		setupComplete = true;
	});
	socket.on('update trait', function(selectedTD) {
		io.emit('update trait',selectedTD);
	});

	socket.on('reset game', function() {
		setupComplete = false;
		io.emit('reset game');
	});
});//end SOCKET SERVER LISTENERS

//Activate server
http.listen(process.env.PORT || 3000, function(){
	console.log("Waiting for guests at the mansion!");
});