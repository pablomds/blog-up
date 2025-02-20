import React from 'react';
import { Link } from 'react-router';

interface IUsernameLogo {
    username: string;
    link: string;
};

const UsernameLogo: React.FC<IUsernameLogo> = ({ username, link }) => {
  return (
    <Link to={link} className="bg-blog-up-green w-10 h-10 xl:h-14 xl:w-14 hover:bg-blog-up-gray rounded-full flex justify-center items-center select-none">
      <span className="font-inria-sans text-xl xl:text-4xl font-bold text-blog-up-black">
        {username.charAt(0).toUpperCase()}
      </span>
    </Link>
  );
};

export default UsernameLogo