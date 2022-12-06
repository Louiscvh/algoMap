
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

import { Routes, Route, useParams, BrowserRouter } from 'react-router-dom';
import Router from './router/Router';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
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
