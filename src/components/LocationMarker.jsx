import React, {useState, useEffect, useRef} from 'react'
import { useMap, Marker } from 'react-leaflet';
import L from 'leaflet'
import { rdvIcon } from '../mapIcons';

export default function LocationMarker({currentPosition, setCurrentPosition, setDistance, setDragPoint, userPoint}) {
    const [position, setPosition] = useState([48.89999, 2.352222]);
    const map = useMap();
    const markerRef = useRef();

  const eventHandlers = {
      dragend() {
        console.log(currentPosition)
        const user = L.latLng([currentPosition?.lat, currentPosition?.lng]);
		    const restau = L.latLng(userPoint);
        console.log('restau:', restau)
        const rdv = L.latLng([markerRef.current.getLatLng().lat, markerRef.current.getLatLng().lng]);
        const distance = user.distanceTo(restau) + restau.distanceTo(rdv)
        console.log('distance:',distance)
        setDragPoint(rdv)
        setDistance(distance)
      },
    }

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        //setPosition(e.latlng);
        setCurrentPosition(e.latlng)
      });
    }, [map, setCurrentPosition]);

    return position === null ? null : (
      <Marker position={position} icon={rdvIcon}  eventHandlers={eventHandlers} ref={markerRef} draggable={true} />
    );
  }