import Restaurants from './components/Restaurants';
import Map from './components/Map';
import Users from './components/Users';
import styled from 'styled-components';

const AppStyle = styled.main`
  display: flex;
  justify-content: space-between;
`

const MAP_DATAS = [
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

export default function App() {
  return (
    <AppStyle>
      <Restaurants restaurants={MAP_DATAS}/>
      <Map mapData={MAP_DATAS}/>
      <Users />
    </AppStyle>
  );
}
