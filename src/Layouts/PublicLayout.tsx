import { ReactNode } from 'react';
import { Outlet } from 'react-router';

import NavBar from '@/Components/Global/NavBar/NavBar';

interface IPublicLayout {
  children?: ReactNode
}

const PublicLayout: React.FC<IPublicLayout> = (props) => {

  return (
    <>
      <NavBar />
      {props.children ? props.children : <Outlet />}
    </>
  );
};

export default PublicLayout