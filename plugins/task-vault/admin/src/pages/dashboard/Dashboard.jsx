import Header from '../../components/dashboard/header/Header';
import Main from '../../components/dashboard/main/Main';

import { DashBoardDIV, Hr } from './styles';

export default function Dashboard() {
  return (
    <DashBoardDIV>
      <Header />
      <Hr />
      <Main />
    </DashBoardDIV>
  );
}
