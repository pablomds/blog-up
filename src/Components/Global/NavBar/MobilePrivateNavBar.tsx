import React from 'react';
import { Search, CirclePlus, TrendingUp } from 'lucide-react';

const MobilePrivateNavBar = () => {
    const UserAvatar = ({ username } : { username: string}) => {
        return (
            <div className="bg-blog-up-green h-10 w-10 rounded-full flex justify-center items-center">
                <span className="font-inria-sans text-xl font-bold text-blog-up-black">{username.charAt(0).toUpperCase()}</span>
            </div>
        )
    }
  return (
    <div className="md:hidden min-w-[310px] min-h-[74px] bg-blog-up-black fixed bottom-0 left-1/2 -translate-1/2 border-2 border-blog-up-green rounded-[5px] flex justify-between items-center px-10 z-50">
        <UserAvatar username="Pablo" />
        <Search className="w-10 h-10 text-blog-up-green" />
        <CirclePlus className="w-10 h-10 text-blog-up-green" />
        <TrendingUp className="w-10 h-10 text-blog-up-green" />
    </div>
  )
}

export default MobilePrivateNavBar