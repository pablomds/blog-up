import { HashLink as Link } from 'react-router-hash-link'

const DesktopNavBar = ({ navLinks }: any) => {
  return (
    <nav className="hidden md:block w-full h-[58px]  z-50 fixed top-0 left-0">
      <div className="py-2 px-5 flex flex-row justify-between">
        <div className="font-inria-sans text-bold text-4xl">Blog Up</div>
        <div className="flex flex-row items-center gap-x-10">
          {navLinks.map((navItem: any, index: number) => {
            return (
              <Link
                key={index}
                to={navItem.link}
                className="font-inria-sans text-base cursor-pointer"
              >
                {navItem.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default DesktopNavBar