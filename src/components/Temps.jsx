import React from 'react';
import styled from "styled-components"

const TempsStyle = styled.div`
    position: absolute;
    bottom: 5rem;
    left: 0.5rem;
    z-index: 1;
    background-color: white;
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    gap: 1rem;
    align-items: center;
`

const Temps = (distance) => {
	const trajet = Object.values(distance)
	console.log(trajet)
	const temps = trajet / 83.3 // 5 km/h = 83.3 m/min
	console.log('temps:', temps)

	return (
		<TempsStyle>
			<h2>Temps de trajet</h2>
			<p>{Math.round(temps)} min</p>
		</TempsStyle>
	);
};

export default Temps;