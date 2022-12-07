import React from 'react';
import styled from "styled-components"

const TimeStyle = styled.div`
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

export default function Time (distance) {
	const time = distance.distance / 83.3 // 5 km/h = 83.3 m/min
	return (
		<TimeStyle>
			<h2>Votre temps de trajet</h2>
			<p>{Math.round(time)} min{time > 1 ? "s" : ""}</p>
		</TimeStyle>
	);
};