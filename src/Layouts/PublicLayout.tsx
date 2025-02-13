import LandingPage from '@/Pages/Public/LandingPage';
import AboutPage from '@/Pages/Public/AboutPage';
import ContactPage from '@/Pages/Public/ContactPage';

import NavBar from '@/Components/Global/NavBar/NavBar';

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