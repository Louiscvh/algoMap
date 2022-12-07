
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

import { Routes, Route, useParams, BrowserRouter } from 'react-router-dom';
import Router from './router/Router';

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const arrays_equal = (a,b) => !!a && !!b && !(a<b || b<a)

const GlobalStyle = createGlobalStyle`

  html, button, input {
    font-family: 'Poppins', sans-serif;
  }
  body {
    margin: 0;
    padding: 0;
  }

  p, h2, h4 {
    margin-block-start: 0em;
    margin-block-end: 0em;
  }
`;

export default function App() {

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}
