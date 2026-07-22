import { Outlet } from 'react-router-dom';

import SideBar from '../components/sidebar/SideBar';
import Header from '../components/dashboard/header/Header';

import { Div } from './styles';

export default function RootPage() {
  return (
    <Div>
      <SideBar />
      <Outlet />
    </Div>
  );
}
