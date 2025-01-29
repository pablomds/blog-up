import React, { ReactNode } from 'react'

import NavBar from '../Components/Global/NavBar/NavBar'

import LandingPage from '../Pages/LandingPage'
import AboutPage from '../Pages/Public/AboutPage'

interface IPublicLayout {
    children?: ReactNode
}

const PublicLayout = (props: IPublicLayout) => {
  return (
    <div className="overflow-y-scroll hide-scrollbar h-screen">
      <NavBar />
      <LandingPage />
      <AboutPage />
    </div>
  );
};

export default PublicLayout