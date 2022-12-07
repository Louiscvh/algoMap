import React, {useState, useEffect, useRef, useMemo} from 'react'
import { useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'
import { rdvIcon } from '../mapIcons';

export default function LocationMarker({currentPosition, setCurrentPosition, setDistance, setDragPoint}) {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

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
    [setDistance, setDragPoint],
  )

    useEffect(() => {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        setCurrentPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
        setBbox(e.bounds.toBBoxString().split(","));
      });
    }, [map, setCurrentPosition]);

    return position === null ? null : (
      <Marker position={position} icon={rdvIcon}  eventHandlers={eventHandlers} ref={markerRef} draggable={true} />
    );
  }
