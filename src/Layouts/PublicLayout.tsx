import NavBar from '../Components/Global/NavBar/NavBar'

import LandingPage from '../Pages/Public/LandingPage'
import AboutPage from '../Pages/Public/AboutPage'

const PublicLayout = () => {
  return (
    <div className="overflow-y-scroll hide-scrollbar h-screen">
      <NavBar />
      <LandingPage />
      <AboutPage />
    </div>
  );
};

export default PublicLayout