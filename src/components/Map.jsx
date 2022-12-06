import React, { useEffect } from 'react'
import * as Leaflet from 'leaflet';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapStyled = styled.div`
  position: relative;
  z-index: 0;
    .leaflet-container  {
      width: 100vw;
      height: 100vh;
    }
`

const persons = {
	"Nico": { "lat": 48.8527749863, "lon": 2.3353216052055 },
	"Alex": { "lat": 48.858519522442, "lon": 2.3471194010479 },
	"Chachat": { "lat": 48.8593, "lon": 2.3561 },
};

export default function Map({mapDatas}) {
    
  return (
    <MapStyled>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </MapStyled>
  )
}
