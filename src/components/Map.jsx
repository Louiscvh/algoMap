import React, {useRef, useMemo, useState, useEffect} from 'react'
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { personIcon, rdvIcon, restaurantIcon } from '../mapIcons';
import L from 'leaflet'
import LocationMarker from './LocationMarker';

const MapStyled = styled.div`
  position: relative;
  z-index: 0;
    .leaflet-container  {
      width: 100vw;
      height: 100vh;
    }
`
export default function Map({restaurantsDatas, usersDatas, setDistance, currentUserName, setUsers}) {
  const [currentPosition, setCurrentPosition] = useState([0, 0])
  const [dragPoint, setDragPoint] = useState(currentPosition)
  
  useEffect(() => {
    if(currentPosition)
      setUsers(current => [...current, {name: currentUserName, lat: currentPosition?.lat, lon: currentPosition?.lng }]);
  }, [currentUserName, setUsers, usersDatas, currentPosition])

  /**
   * Choose the color of the line
   * @param {Int} index 
   * @returns 
   */
  const getStrokeColor = (index) => {
    switch (index) {
      case 0:
        return "red"
      case 1:
        return "blue"    
      case 2:
        return "green"
      default:
        break;
    }
  }

  return (
    <MapStyled>
      <MapContainer center={[48.852969, 2.349903]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {restaurantsDatas.map((restaurant, index) => (
          <Marker key={index} icon={restaurantIcon} position={[restaurant.lat, restaurant.lon]}>
            <Popup>
              {restaurant.name}
            </Popup>
          </Marker>
        ))}
        {usersDatas.map((user, index) => (
          <Marker key={index} icon={personIcon} position={[user.lat, user.lon]}>
            <Popup>
              {user.name}
            </Popup>
          </Marker>
        ))}
        <LocationMarker 
          currentPosition={currentPosition} 
          setCurrentPosition={setCurrentPosition} 
          setDistance={setDistance} 
          setDragPoint={setDragPoint}/>
        {usersDatas.map((user, index) => (
          <Polyline key={index} pathOptions={{ color: getStrokeColor(index), dashArray: '20, 20', dashOffset: '20'}} positions={[[user.lat, user.lon], user.point, dragPoint]} />
        ))}
      </MapContainer>
    </MapStyled>
  )
}
