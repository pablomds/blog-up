import MobilePrivateNavBar from './MobilePrivateNavBar';
import DesktopPrivateSideBar from './DesktopPrivateSideBar';

const PrivateNavBar = () => {
  const navLinks: any[] = [
    { label: "", link: "/my-profil" },
    { label: "Search", link: "/search" },
    { label: "Lastest", link: "/lastest" },
    { label: "Create", link: "/create-post" },
    { label: "Logout", link: "/logout" }
  ];
  return (
    <>
      <DesktopPrivateSideBar navLinks={navLinks} />
      <MobilePrivateNavBar navLinks={navLinks} />
    </>
  );
}

export default PrivateNavBar