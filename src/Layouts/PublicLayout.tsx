import Lenis from 'lenis'

import NavBar from '../Components/Global/NavBar/NavBar'

import LandingPage from '../Pages/Public/LandingPage'
import AboutPage from '../Pages/Public/AboutPage'

const PublicLayout = () => {

  new Lenis({
    autoRaf: true,
  });

  return (
    <>
      <NavBar />
      <LandingPage />
      <AboutPage />
    </>
  );
};

export default PublicLayout