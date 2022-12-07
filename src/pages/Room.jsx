import React from 'react'
import Restaurants from '../components/Restaurants';
import Map from '../components/Map';
import Users from '../components/Users';
import { useState, useEffect } from 'react';
import Distance from '../components/Distance';
import Chat from '../components/Chat';
import { useParams } from 'react-router-dom';

const RESTAURANTS_DATAS = [
  {
      name: "Restaurant 1 (Sorbone)",
      lat: 48.8510502823,
      lon: 2.3442733454214
  },
  {
      name: "Restaurant 2 (Hotel de ville)",
      lat: 48.856389,
      lon: 2.352222
  },
  {
      name: "Restaurant 3 (Pont)",
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
  let { userName, roomId } = useParams();

  return (
    <>
        <Restaurants restaurants={RESTAURANTS_DATAS}/>
        <Map 
            restaurantsDatas={RESTAURANTS_DATAS} 
            usersDatas={USER_DATAS} 
            setDistance={setDistance} 
            currentUserName={userName} 
            setUsers={setUsers}/>
        <Users users={users} roomId={roomId} />
        <Distance distance={distance}/> 
        <Chat currentUserName={userName}/>
    </>
  )
}
