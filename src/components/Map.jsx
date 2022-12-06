import React from 'react'
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { personIcon, rdvIcon, restaurantIcon } from '../mapIcons';
import L from 'leaflet'
const { useRef, useMemo, useState } = React;

const MapStyled = styled.div`
  position: relative;
  z-index: 0;
    .leaflet-container  {
      width: 100vw;
      height: 100vh;
    }
`
export default function Map({restaurantsDatas, usersDatas}) {
	const center = {
		lat: 48.852969,
		lng:  2.349903,
	};

  var fromLatLng = L.latLng([48.858519522442, 2.3471194010479]);
  var toLatLng = L.latLng([48.856389, 2.352222]);

  const [position, setPosition] = useState(center)
  
  var dis = fromLatLng.distanceTo(toLatLng);
  console.log(Math.round(dis), "meters");
  const markerRef = useRef();

//   const updatePosition = () => {
//     console.log('prout')
//     const marker = markerRef.current
//     console.log(marker.getLatLng())
//   }

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
		  console.log("position du rdv: ", setPosition(marker.getLatLng()))
		  console.log("position du rdv: ", position)
        }
      },
    }),
    [],
  )

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
        <Marker icon={rdvIcon} position={position} eventHandlers={eventHandlers} ref={markerRef} draggable={true}>
            <Popup>
              Rdv point
            </Popup>
          </Marker>
      </MapContainer>
    </MapStyled>
  )
}
