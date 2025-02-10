import React from 'react';
import { Search, CirclePlus, TrendingUp } from 'lucide-react';

const DesktopPrivateSideBar = () => {

  const UserAvatar = ({ username } : { username: string}) => {
    return (
        <div className="bg-blog-up-green h-12 w-12 rounded-full flex justify-center items-center">
            <span className="font-inria-sans text-4xl font-bold text-blog-up-black">{username.charAt(0).toUpperCase()}</span>
        </div>
    )
}

  return (
    <div className="hidden md:block fixed top-0 left-0 h-screen  min-w-[101px]">
      <div className="w-[3px] h-full bg-blog-up-green absolute right-0" />
      <div className="h-full w-full flex flex-col pt-30 gap-y-60">
        <div className="flex flex-col gap-y-10 items-center">
          <UserAvatar username="pablito" />
          <div className="flex flex-col items-center">
            <Search className="h-10 w-10 text-blog-up-green" />
            <span className="font-inria-sans text-base">Search</span>
          </div>
          <div className="flex flex-col items-center">
            <TrendingUp className="h-10 w-10 text-blog-up-green" />
            <span className="font-inria-sans text-base">Lastest</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <CirclePlus className="h-10 w-10 text-blog-up-green" />
            <span className="font-inria-sans text-base">Create</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesktopPrivateSideBar