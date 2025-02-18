import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { Search, CirclePlus, TrendingUp, LogOut, Menu } from 'lucide-react';

import { resetState } from '@/Redux/rootReducer';

import UsernameLogo from '@/Components/Global/NavBar/PrivateNavBar/UsernameLogo';
import { useState } from 'react';


interface IDesktopPrivateSideBar {
    navLinks: any,
    username: string
}

const MobilePrivateNavBar: React.FC<IDesktopPrivateSideBar> = ({ navLinks, username }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  if (!isOpen) {
    return (
      <div onClick={() => setIsOpen(true)} className="md:hidden fixed bottom-4 right-2 z-10 cursor-pointer">
        <div className="bg-blog-up-black-light rounded-full p-2 shadow">
        <Menu className="h-10 w-10 text-blog-up-green hover:text-blog-up-gray" />
        </div>
      </div>
    )
  }

  return (
    <div className="md:hidden min-w-[310px] xs:w-[350px] sm:w-[400px] min-h-[74px] bg-blog-up-black fixed bottom-0 left-1/2 -translate-1/2 border-2 border-blog-up-green rounded-[5px] flex justify-between items-center px-10 z-50">
        <UsernameLogo username={username} link={navLinks[0].link} />
        <Link to={navLinks[1].link}><Search className="w-10 h-10 text-blog-up-green hover:text-blog-up-gray" /></Link>
        <Link to={navLinks[2].link}><TrendingUp className="w-10 h-10 text-blog-up-green hover:text-blog-up-gray" /></Link>
        <Link to={navLinks[3].link}><CirclePlus className="w-10 h-10 text-blog-up-green hover:text-blog-up-gray" /></Link>
        <div className="cursor-pointer" onClick={() => dispatch(resetState())}>
            <LogOut className="w-10 h-10 text-blog-up-green hover:text-blog-up-gray" />
        </div>
        <div className="cursor-pointer" onClick={() => setIsOpen(false)}>
          <Menu className="h-10 w-10 text-blog-up-green hover:text-blog-up-gray" />
        </div>
    </div>
  )
}

export default MobilePrivateNavBar