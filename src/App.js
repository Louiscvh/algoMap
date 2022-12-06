import Restaurants from './components/Restaurants';
import Map from './components/Map';
import Users from './components/Users';
import styled from 'styled-components';

const AppStyle = styled.main`
  display: flex;
  justify-content: space-between;
`
export default function App() {
  return (
    <AppStyle>
      <Restaurants />
      <Map />
      <Users />
    </AppStyle>
  );
}
