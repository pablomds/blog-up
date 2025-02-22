import { ReactNode } from 'react';
import { Outlet } from 'react-router';

import LandingPage from '@/Pages/Public/LandingPage';
import AboutPage from '@/Pages/Public/AboutPage';
import ContactPage from '@/Pages/Public/ContactPage';

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