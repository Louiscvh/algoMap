import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import styled from "styled-components"

const serverUrl = 'http://localhost:4001/';
const socket = io(serverUrl, { transports: ['websocket', 'polling', 'flashsocket'] });

const ChatStyle = styled.div`
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
    z-index: 1;
    background-color: white;
    border-radius: 8px;
    padding: 1rem;

    #chat {
        height: 200px;
        overflow-y: scroll;
        background-color: white;
        padding: 0.5rem;
    }
    form {
      display: flex;
      gap: 0.5rem;
      input {
          width: 100%;
          background-color: #F1F1F1;
          border-radius: 150px;
          border: none;
          padding: 0.5rem;
          padding-left: 1rem;
        }

        button {
          padding: 0.5rem 1rem;
          border-radius: 150px;
          border: none;
          cursor: pointer;
          will-change: background-color;
          transition: background-color 0.3s ease;
          &:hover {
            background-color: #E2E2E2;
          }
        }
    }
`
export default function Chat({currentUserName, roomId, setRdvHours}) {
  const [messages, setMessages] = useState([])
  const [currentText, setCurrentText] = useState("")
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.emit('joinRoom', roomId, currentUserName)
    socket.on('receive_message', (data) => {
      setMessages(messages => [...messages, data])
    });
	socket.on('changeHours', newHours => {
		console.log('newHours:', newHours);
		setRdvHours(newHours)
	})
  }, [currentUserName, roomId, setRdvHours]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages])

  /**
   * Send a message to chat
   * @param {String} message 
   */
  const sendMessage = async(e) => {
    e.preventDefault()
    if(currentText.trim()) {
      const currentMessage = {
        user: currentUserName,
        roomId,
        message: currentText
      }
      setMessages(messages => [...messages, currentMessage])
      socket.emit('sendMessage', currentMessage);

      setCurrentText('')
    }
  }

  return (
    <ChatStyle>
      <div>
        <h2>Chat</h2>
        <div id="chat">
            {messages.map((message, index) => (
              <div key={index}> 
                <h4>{message.user}</h4>
                <p>{message.message}</p>
              </div>
            ))}
            <div ref={lastMessageRef} />
        </div> 
          
        <form onSubmit={(e) => sendMessage(e)}>
            <input type="text" value={currentText} onChange={(e) => setCurrentText(e.target.value)}></input>
            <button type='submit'>Envoyer</button>
        </form>
      </div>
    </ChatStyle>
  );
}
