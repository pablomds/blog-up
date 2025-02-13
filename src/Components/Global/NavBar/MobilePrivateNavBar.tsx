import { Link } from 'react-router';
import { Search, CirclePlus, TrendingUp, LogOut } from 'lucide-react';
import { resetState } from '../../../Redux/rootReducer';
import { useDispatch } from 'react-redux';
import UsernameLogo from './PrivateNavBar/UsernameLogo';


interface IDesktopPrivateSideBar {
    navLinks: any,
    username: string
}

const MobilePrivateNavBar: React.FC<IDesktopPrivateSideBar> = ({ navLinks, username }: any) => {
    const dispatch = useDispatch()

  return (
    <div className="md:hidden min-w-[310px] xs:w-[350px] sm:w-[400px] min-h-[74px] bg-blog-up-black fixed bottom-0 left-1/2 -translate-1/2 border-2 border-blog-up-green rounded-[5px] flex justify-between items-center px-10 z-50">
        <UsernameLogo username={username} link={navLinks[0].link} />
        <Link to={navLinks[1].link}><Search className="w-10 h-10 text-blog-up-green" /></Link>
        <Link to={navLinks[2].link}><TrendingUp className="w-10 h-10 text-blog-up-green" /></Link>
        <Link to={navLinks[3].link}><CirclePlus className="w-10 h-10 text-blog-up-green" /></Link>
        <div className="cursor-pointer" onClick={() => dispatch(resetState())}>
            <LogOut className="w-10 h-10 text-blog-up-green" />
        </div>
    </div>
  )
}

export default MobilePrivateNavBar