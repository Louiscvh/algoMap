import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import router from './router/router.mjs';
import cors from 'cors';

const port =  4001;

const app = express();
app.use(router);
app.use(cors());

const server = http.createServer(app);

server.listen(port, () => {
	console.log(`listening on *:${port}`);
});

const io = new Server(server);

let clients = [];

io.on('connection', (socket) => {
	socket.on('joinRoom', (roomId, userName) => {
		if(userName) {
			console.log(userName + ' a rejoins la room ' + roomId)
		}
		socket.join(roomId)
	});

	socket.on('sendMessage', (msg) => {
		socket.to(msg.roomId).emit('receive_message', msg);
	
		// console.log(msg.message) //  message
		const specificMessage = msg.message;

		if(specificMessage.includes('#')) {
			console.log('message clé');
			const regex = /#(\d+)/gm; // get value after the #

			const hours = specificMessage.match(regex);
			console.log('hours:', hours); // [hours]

			const extractedHours = parseInt(hours[0].replace(/#/g, '')); // ex: replace # by nothing and convert string to number
			console.log('extractedHours:', extractedHours);

		}
	});

	socket.on('disconnect', () => {
		console.log('🔥: A user disconnected');
	});
});
