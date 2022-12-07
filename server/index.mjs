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

// (async () => {

// setup command listeners once client is connected
io.on('connection', (socket) => {
	// console.log('socket:', socket)
	console.log('new client connected');

	socket.on('ping', (msg) => {
		console.log('message: ' + msg);
		const responseMessage = 'message du serveur';
		socket.emit('serverResponse', responseMessage);
	});
});

// })();