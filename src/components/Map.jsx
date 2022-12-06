import React from 'react'
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { personIcon, rdvIcon, restaurantIcon } from '../mapIcons';
import L from 'leaflet'
const { useRef } = React;

const MapStyled = styled.div`
  position: relative;
  z-index: 0;
    .leaflet-container  {
      width: 100vw;
      height: 100vh;
    }
`
export default function Map({restaurantsDatas, usersDatas}) {
  var fromLatLng = L.latLng([48.858519522442, 2.3471194010479]);
  var toLatLng = L.latLng([48.856389, 2.352222]);
  
  var dis = fromLatLng.distanceTo(toLatLng);
  console.log(Math.round(dis), "meters");
  const markerRef = useRef();

  const updatePosition = () => {
    console.log('prout')
    const marker = markerRef.current
    console.log(marker.getLatLng())
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
        <Marker icon={rdvIcon} position={[48.852969, 2.349903]} onDragend={updatePosition} ref={markerRef} draggable={true}>
            <Popup>
              Rdv point
            </Popup>
          </Marker>
      </MapContainer>
    </MapStyled>
  )
}
