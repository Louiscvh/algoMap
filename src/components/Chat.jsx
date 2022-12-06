import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styled from "styled-components"

const socket = io();

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

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const sendPing = () => {
    socket.emit('ping');
  }

  return (
    <ChatStyle>
      <p>Connected: { '' + isConnected }</p>
      <p>Last pong: { lastPong || '-' }</p>
      <button onClick={ sendPing }>Send ping</button>
    </ChatStyle>
  );
}
