import React from 'react';
import { Link } from 'react-router';
import { Search, CirclePlus, TrendingUp } from 'lucide-react';

const MobilePrivateNavBar = ({ navLinks }: any) => {
    const UserAvatar = ({ username } : { username: string}) => {
        return (
            <div className="bg-blog-up-green h-10 w-10 rounded-full flex justify-center items-center">
                <span className="font-inria-sans text-xl font-bold text-blog-up-black">{username.charAt(0).toUpperCase()}</span>
            </div>
        )
    };
  return (
    <div className="md:hidden min-w-[310px] min-h-[74px] bg-blog-up-black fixed bottom-0 left-1/2 -translate-1/2 border-2 border-blog-up-green rounded-[5px] flex justify-between items-center px-10 z-50">
        <Link to={navLinks[0].link}><UserAvatar username="Pablo" /></Link>
        <Link to={navLinks[1].link}><Search className="w-10 h-10 text-blog-up-green" /></Link>
        <Link to={navLinks[2].link}><TrendingUp className="w-10 h-10 text-blog-up-green" /></Link>
        <Link to={navLinks[3].link}><CirclePlus className="w-10 h-10 text-blog-up-green" /></Link>
    </div>
  )
}

export default MobilePrivateNavBar