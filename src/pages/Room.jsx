import React from 'react'
import Restaurants from '../components/Restaurants';
import Map from '../components/Map';
import Users from '../components/Users';
import { useState, useEffect } from 'react';
import Distance from '../components/Distance';
import Chat from '../components/Chat';
import { useParams } from 'react-router-dom';
import { capitalizeFirstLetter } from '../App';
import io from 'socket.io-client';

const serverUrl = 'http://localhost:4001/';
const socket = io(serverUrl, { transports: ['websocket', 'polling', 'flashsocket'] });

const RESTAURANTS_DATAS = [
  {
      name: "Restaurant de la Sorbone",
      lat: 48.8510502823,
      lon: 2.3442733454214
  },
  {
      name: "Restaurant de l'Hotel de ville",
      lat: 48.856389,
      lon: 2.352222
  },
  {
      name: "Restaurant du Pont",
      lat: 48.85277,
      lon: 2.3575
  },
];

const USER_DATAS = [
  {
      name: "Nico",
      lat: 48.8527749863,
      lon: 2.3353216052055,
      point: [48.856389, 2.352222]
  },
  {
      name: "Alex",
      lat: 48.858519522442,
      lon: 2.3471194010479,
      point: [48.8510502823, 2.3442733454214]
  },
  {
      name: "Chachat",
      lat: 48.8593,
      lon: 2.3561,
      point: [48.85277, 2.3575]
  },
];

export default function Room() {
  const [distance, setDistance] = useState(0)
  const [users, setUsers] = useState(USER_DATAS)
  const [currentPosition, setCurrentPosition] = useState([0, 0])
  let { userName, roomId } = useParams();

  const joinRoom = () => {
    if (userName && roomId) {
        socket.emit('joinRoom', roomId)
    }   
  }

  joinRoom()
   
  useEffect(() => {
    setUsers(current => [...current, {name: capitalizeFirstLetter(userName), lat: currentPosition?.lat, lon: currentPosition?.lng }]);
  }, [userName, setUsers])


  return (
    <>
        <Restaurants restaurants={RESTAURANTS_DATAS}/>
        <Map 
            restaurantsDatas={RESTAURANTS_DATAS} 
            usersDatas={USER_DATAS} 
            currentPosition={currentPosition}
            setCurrentPosition={setCurrentPosition}
            setDistance={setDistance} 
            />
        <Users users={users} />
        <Distance distance={distance}/> 
        <Chat currentUserName={capitalizeFirstLetter(userName)} roomId={roomId}/>
    </>
  )
}
