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

    #chat {
        height: 200px;
        overflow-y: scroll;
        background-color: white;
        padding: 0.5rem;
    }
`
export default function Chat({currentUserName}) {
  const [messages, setMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState("")

  useEffect(() => {
    socket.on('serverMessage', (data) => {
        setMessages([...messages, {user: currentUserName, message: data}])
    });
  }, [socket, messages]);

  console.log(messages)
  /**
   * Send a message to chat
   * @param {String} message 
   */
  const sendMessage = (e) => {
    e.preventDefault()
    socket.emit('sendMessage', currentMessage);
    setCurrentMessage('')
  }

  return (
    <ChatStyle>
      <div>
        <h2>Chat</h2>
        {messages.length ? 
            <div id="chat">
                {messages.map((message, index) => (
                    <div key={index}> 
                        <h4>{message.user}</h4>
                        <p>{message.message}</p>
                    </div>
                ))}
            </div> 
            : 
            <p>Pas de messages</p>
        }
        <form onSubmit={(e) => sendMessage(e)}>
            <input type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)}></input>
            <button type='submit'>Envoyer</button>
        </form>
      </div>
    </ChatStyle>
  );
}
