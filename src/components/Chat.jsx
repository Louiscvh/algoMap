import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styled from "styled-components"

const serverUrl = 'http://localhost:4001/';
const socket = io(serverUrl, { transports: ['websocket', 'polling', 'flashsocket'] });

const ChatStyle = styled.div`
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
    z-index: 1;
    background-color: lightgray;
    padding: 1rem;
`
export default function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [messages, setMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState("")

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

	socket.on('serverResponse', (res) => {
		console.log('réponse: ' + res);
	});

    socket.on('serverMessage', (res) => {
		console.log(res)
	});

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
      socket.off('serverMessage');
      socket.off('serverResponse');
    };
  }, []);

  const sendPing = () => {
	console.log('coucou')
    //socket.emit('ping');
	const message = 'ceci est un message';
	socket.emit('ping', message);
  }

  /**
   * Send a message to chat
   * @param {String} message 
   */
  const sendMessage = (e) => {
    e.preventDefault()
    console.log('ici', currentMessage)
    socket.emit('sendMessage', currentMessage);
  }

  return (
    <ChatStyle>
      <p>Connected: { '' + isConnected }</p>
      <p>Last pong: { lastPong || '-' }</p>
      <button onClick={ sendPing }>Send ping</button>
      <div>
        <h2>Chat</h2>
        {messages.length ? <div></div> : <p>Pas de messages</p>}
        <form onSubmit={(e) => sendMessage(e)}>
            <input type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)}></input>
            <button type='submit'>Envoyer</button>
        </form>
      </div>
    </ChatStyle>
  );
}
