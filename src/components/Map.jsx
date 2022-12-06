import React, { useEffect } from 'react'
import * as Leaflet from 'leaflet';
import styled from 'styled-components';

const MapStyled = styled.div`
    width: 800px;
    height: 600px;
`

const mapDatas = {
	"Restaurant 1 (Sorbone)": { "lat": 48.8510502823, "lon": 2.3442733454214 },
	"Restaurant 2 (Hotel de ville)": { "lat": 48.856389, "lon": 2.352222 },
	"Restaurant 3 (Pont)": { "lat": 48.85277, "lon": 2.3575 },
};

const persons = {
	"Nico": { "lat": 48.8527749863, "lon": 2.3353216052055 },
	"Alex": { "lat": 48.858519522442, "lon": 2.3471194010479 },
	"Chachat": { "lat": 48.8593, "lon": 2.3561 },
};

export default function Map() {

    useEffect(() => {
        const map = Leaflet.map('map').setView([48.852969, 2.349903], 14.5); // setView([long, lat], zoom);

        Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        const rdvIcon = Leaflet.icon({
            iconUrl: "https://cdn1.iconfinder.com/data/icons/color-bold-style/21/14_2-512.png",
            iconSize: [40, 40],
            iconAnchor: [25, 50],
            popupAnchor: [-3, -76],
        });

        Leaflet.marker([48.852969, 2.349903], { 
            icon: rdvIcon,
            draggable: true,
            autoPan: true
        }).addTo(map)

        const restaurantIcon = Leaflet.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448610.png",
            iconSize: [40, 40],
            iconAnchor: [25, 50],
            popupAnchor: [-3, -76],
        });

        for (const restaurant in mapDatas) {
            Leaflet.marker([mapDatas[restaurant].lat, mapDatas[restaurant].lon], { icon: restaurantIcon }).addTo(map);
        }

        

        // add markers for person
        const personIcon = Leaflet.icon({
            iconUrl: "https://www.asso-aep.org/wp-content/uploads/2018/06/marker_jaune.png",
            iconSize: [40, 40],
            iconAnchor: [25, 50],
            popupAnchor: [-3, -76],
        });

        for (const person in persons) {
            Leaflet.marker([persons[person].lat, persons[person].lon], { icon: personIcon }).addTo(map);
        }
    }, [])
  return (
    <MapStyled id='map'>Map</MapStyled>
  )
}
