import { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";

const DesktopNavBar = ({ navLinks }: any) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`hidden md:block w-full h-[58px] z-50 fixed top-0 left-0 transition-all duration-300 ${
        isScrolled ? "bg-blog-up-black/50" : "bg-transparent"
      }`}
    >
      <div className="py-2 px-5 flex flex-row justify-between">
        <div className="font-inria-sans text-bold text-4xl">Blog Up</div>
        <div className="flex flex-row items-center gap-x-10">
          {navLinks.map((navItem: any, index: number) => (
            <Link
              key={index}
              to={navItem.link}
              className="font-inria-sans text-base cursor-pointer"
            >
              {navItem.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default DesktopNavBar;
