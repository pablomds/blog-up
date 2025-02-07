import NavBar from '../Components/Global/NavBar/NavBar';

import LandingPage from '../Pages/Public/LandingPage';
import AboutPage from '../Pages/Public/AboutPage';
import ContactPage from '../Pages/Public/ContactPage';

const PublicLayout = () => {

  return (
    <div className="bg-[#2C2C2C]">
      <NavBar />
      <LandingPage />
      <AboutPage />
      <ContactPage/>
    </div>
  );
};

export default PublicLayout