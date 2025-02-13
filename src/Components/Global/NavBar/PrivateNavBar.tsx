import { useSelector } from 'react-redux';
import { selectUser } from '@/Redux/Slices/userSlice';

import MobilePrivateNavBar from './MobilePrivateNavBar';
import DesktopPrivateSideBar from './DesktopPrivateSideBar';

const PrivateNavBar = () => {
  //Check if its make sense to call user selector here
  const username = useSelector(selectUser)
  const navLinks: any[] = [
    { label: "", link: "/my-profil" },
    { label: "Search", link: "/search" },
    { label: "Lastest", link: "/lastest" },
    { label: "Create", link: "/create-post" },
    { label: "Logout", link: "/logout" }
  ];
  return (
    <>
      <DesktopPrivateSideBar username={username.name} navLinks={navLinks} />
      <MobilePrivateNavBar username={username.name} navLinks={navLinks} />
    </>
  );
}

export default PrivateNavBar