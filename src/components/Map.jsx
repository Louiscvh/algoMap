import React, {useRef, useMemo, useState} from 'react'
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { personIcon, rdvIcon, restaurantIcon } from '../mapIcons';
import L from 'leaflet'

const MapStyled = styled.div`
  position: relative;
  z-index: 0;
    .leaflet-container  {
      width: 100vw;
      height: 100vh;
    }
`
export default function Map({restaurantsDatas, usersDatas, setDistance}) {

  const [dragPoint, setDragPoint] = useState([48.858519522442, 2.3471194010479])
	const center = {
		lat: 48.852969,
		lng:  2.349903,
	};

  const polyline = [
    [48.858519522442, 2.3471194010479],
    dragPoint,
  ]

  const limeOptions = { color: 'red' }

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
        const fromLatLng = L.latLng([48.858519522442, 2.3471194010479]);
        const toLatLng = L.latLng([markerRef.current.getLatLng().lat, markerRef.current.getLatLng().lng]);
        const distance = fromLatLng.distanceTo(toLatLng)
        setDragPoint(toLatLng)
        console.log(distance)
        setDistance(distance)
        //setPosition(marker.getLatLng())
      },
    }),
    [setDistance],
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
        <Polyline pathOptions={limeOptions} positions={polyline} />
      </MapContainer>
    </MapStyled>
  )
}
