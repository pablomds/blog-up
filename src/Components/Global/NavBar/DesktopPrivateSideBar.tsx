import React from 'react';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { Search, CirclePlus, TrendingUp, LogOut } from 'lucide-react';

import { resetState } from '@/Redux/rootReducer';

import UsernameLogo from '@/Components/Global/NavBar/PrivateNavBar/UsernameLogo';

interface IDesktopPrivateSideBar {
  navLinks: any,
  username: string
}

const DesktopPrivateSideBar: React.FC<IDesktopPrivateSideBar> = ({ navLinks, username }) => {

  const dispatch = useDispatch()

  return (
    <div className="hidden md:block fixed top-0 left-0 h-screen w-1/12 z-10">
      <div className="w-[3px] h-full bg-blog-up-green absolute right-0" />
      <div className="h-full flex flex-col py-28 justify-between">
        <div className="flex flex-col h-1/2 justify-around items-center">
          <UsernameLogo link={navLinks[0].link} username={username} />
          <Link to={navLinks[1].link}>
            <div className="flex flex-col items-center">
              <Search className="h-6 w-6 xl:h-10 xl:w-10 text-blog-up-green hover:text-blog-up-gray" />
              <span className="font-inria-sans text-sm xl:text-base">
                {navLinks[1].label}
              </span>
            </div>
          </Link>
          <Link to={navLinks[2].link}>
            <div className="flex flex-col items-center">
              <TrendingUp className="h-6 w-6 xl:h-10 xl:w-10 text-blog-up-green hover:text-blog-up-gray" />
              <span className="font-inria-sans text-sm xl:text-base">
                {navLinks[2].label}
              </span>
            </div>
          </Link>
        </div>
        <div className="flex flex-col h-1/3 justify-around">
          <div className="flex flex-col items-center">
            <Link to={navLinks[3].link}>
              <div className="flex flex-col items-center">
                <CirclePlus className="h-6 w-6 xl:h-10 xl:w-10 text-blog-up-green hover:text-blog-up-gray" />
                <span className="font-inria-sans text-sm xl:text-base">
                  {navLinks[3].label}
                </span>
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <div
              onClick={() => dispatch(resetState())}
              className="flex flex-col items-center cursor-pointer"
            >
              <LogOut className="h-6 w-6 xl:h-10 xl:w-10 text-blog-up-green hover:text-blog-up-gray" />
              <span className="font-inria-sans text-sm xl:text-base">
                {navLinks[4].label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopPrivateSideBar