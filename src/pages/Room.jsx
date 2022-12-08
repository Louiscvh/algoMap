import React from 'react'
import Restaurants from '../components/Restaurants';
import Map from '../components/Map';
import Users from '../components/Users';
import { useState, useEffect } from 'react';
import Distance from '../components/Distance';
import Time from '../components/Time';
import Chat from '../components/Chat';
import { useParams } from 'react-router-dom';
import { capitalizeFirstLetter } from '../App';
import io from 'socket.io-client';
import TravelTime from '../components/TravelTime';

const serverUrl = 'http://localhost:4001/';
const socket = io(serverUrl, { transports: ['websocket', 'polling', 'flashsocket'] });

const RESTAURANTS_DATAS = [
  {
      id: 1,
      name: "Restaurant de la Sorbone",
      lat: 48.8510502823,
      lon: 2.3442733454214
  },
  {
      id: 2,
      name: "Restaurant de l'Hotel de ville",
      lat: 48.856389,
      lon: 2.352222
  },
  {
      id: 3,
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
  const [rdvHours, setRdvHours] = useState(15)
  const [users, setUsers] = useState(USER_DATAS)
  const [currentPosition, setCurrentPosition] = useState([0, 0])
  let { userName, roomId } = useParams();
  const [userPoint, setUserPoint] = useState([48.8510502823, 2.3442733454214])
  const [currentRestaurant, setCurrentRestaurant] = useState({
    id: 1,
    name: "Restaurant de la Sorbone",
    lat: 48.8510502823,
    lon: 2.3442733454214
  })
  console.log(userPoint)
  useEffect(() => {
    const joinRoom = () => {
      if (userName && roomId) {
          socket.emit('joinRoom', roomId, null)
      }   
    }

    if(currentPosition.hasOwnProperty('lat')) {
      joinRoom()
      setUsers(current => [...current, {name: userName, lat: currentPosition?.lat, lon: currentPosition?.lng , point: userPoint}]);
    }
  }, [userName, setUsers, currentPosition?.lat, currentPosition?.lng, currentPosition, roomId])

  return (
    <>
        <Restaurants 
          restaurants={RESTAURANTS_DATAS} 
          userPoint={userPoint} 
          setUserPoint={setUserPoint} 
          setUsers={setUsers} 
          users={users}
          userName={userName}
          setCurrentRestaurant={setCurrentRestaurant}
          currentRestaurant={currentRestaurant}
          />
        <Map 
            restaurantsDatas={RESTAURANTS_DATAS} 
            usersDatas={users} 
            currentPosition={currentPosition}
            setCurrentPosition={setCurrentPosition}
            setDistance={setDistance}
            />
        <Users users={users} userName={userName}/>
        <TravelTime distance={distance} rdvHours={rdvHours}/>
        <Distance distance={distance}/> 
        <Time distance={distance}/> 
        <Chat currentUserName={capitalizeFirstLetter(userName)} roomId={roomId} setRdvHours={setRdvHours}/>
    </>
  )
}
