import Restaurants from './components/Restaurants';
import Map from './components/Map';
import Users from './components/Users';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const AppStyle = styled.main`
  display: flex;
  justify-content: space-between;
`
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const RESTAURANTS_DATAS = [
  {
      name: "Restaurant 1 (Sorbone)",
      lat: 48.8510502823,
      lon: 2.3442733454214
  },
  {
      name: "Restaurant 2 (Hotel de ville)",
      lat: 48.856389,
      lon: 2.352222
  },
  {
      name: "Restaurant 3 (Pont)",
      lat: 48.85277,
      lon: 2.3575
  },
];

const USER_DATAS = [
  {
      name: "Nico",
      lat: 48.8527749863,
      lon: 2.3353216052055
  },
  {
      name: "Alex",
      lat: 48.858519522442,
      lon: 2.3471194010479
  },
  {
      name: "Chachat",
      lat: 48.8593,
      lon: 2.3561
  },
];

export default function App() {
  return (
    <>
      <GlobalStyle />
      <AppStyle>
        <Restaurants restaurants={RESTAURANTS_DATAS}/>
        <Map restaurantsDatas={RESTAURANTS_DATAS} usersDatas={USER_DATAS}/>
        <Users users={USER_DATAS}/>
      </AppStyle>
    </>

  );
}
