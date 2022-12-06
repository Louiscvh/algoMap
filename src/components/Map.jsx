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

  const [position, setPosition] = useState(center)
  const [currentPosition, setCurrentPosition] = useState(null)
  const markerRef = useRef();

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const fromLatLng = L.latLng([48.858519522442, 2.3471194010479]);
        const toLatLng = L.latLng([markerRef.current.getLatLng().lat, markerRef.current.getLatLng().lng]);
        const distance = fromLatLng.distanceTo(toLatLng)
        setDragPoint(toLatLng)
        setDistance(distance)
      },
    }),
    [setDistance],
  )

  useEffect(() => {
    if(currentPosition)
      setUsers(current => [...current, {name: currentUserName, lat: currentPosition?.lat, lon: currentPosition?.lng }]);
  }, [currentUserName, setUsers, usersDatas, currentPosition])

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
        <LocationMarker setCurrentPosition={setCurrentPosition}/>
        <Polyline pathOptions={limeOptions} positions={polyline} />
      </MapContainer>
    </MapStyled>
  )
}
