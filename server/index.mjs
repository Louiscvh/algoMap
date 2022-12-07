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


io.on('connection', (socket) => {
	socket.on('joinRoom', (roomId) => {
		console.log(socket.id + ' avez rejoins la room ' + roomId)
		socket.join(roomId)
	});

	socket.on('sendMessage', (msg) => {
		socket.to(msg.roomId).emit('receive_message', msg);
	});

	socket.on('disconnect', () => {
		console.log('🔥: A user disconnected');
	});
});
