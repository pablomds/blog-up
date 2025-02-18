import { Link } from 'react-router';
import { CirclePlus } from 'lucide-react';

import EmptySVG from '@/Assets/Svg/no-data.svg?react';

const NoPostsFound = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center xs:items-start">
      <div className="flex flex-col justify-center items-center gap-y-4">
        <EmptySVG className="h-60 w-60" />
        <div className="flex flex-col gap-y-4 items-center">
          <Link
            to="/create-post"
            className="flex justify-center items-center gap-x-2 border border-blog-up-green/80 p-2 rounded-2xl"
          >
            <CirclePlus className="h-10 w-10 text-blog-up-green" />
            <span className="font-inria-sans text-lg text-blog-up-gray">
              Create A Post
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoPostsFound;