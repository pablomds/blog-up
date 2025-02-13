import DesktopNavBar from "@/Components/Global/NavBar/DesktopNavBar"
import MobileNavBar from "@/Components/Global/NavBar/MobileNavBar"

const NavBar = () => {
  const navLinks = [
    { label: "Home", link: "/#home" },
    { label: "About", link: "/#about" },
    { label: "Contact", link: "/#contact" },
    { label: "Login", link: "/login" },
    { label: "Sign Up", link: "/signup" },
  ];
  return (
    <>
      <DesktopNavBar navLinks={navLinks} />
      <MobileNavBar navLinks={navLinks} />
    </>
  );
};

export default NavBar