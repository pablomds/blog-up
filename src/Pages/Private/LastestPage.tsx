import _ from 'lodash';
import { useSelector } from 'react-redux';

import { selectPosts } from '@/Redux/Slices/postsSlice';

import BlogPosts from '@/Components/BlogPosts/BlogPosts';

const LastestPage = () => {
  const blogPosts = useSelector(selectPosts);

  return (
    <div className="h-full w-full flex flex-col items-start gap-y-7 pb-8">
      <div className="flex flex-col items-center">
        <div className="h-[5px] w-[44px] bg-blog-up-green" />
        <h1 className="font-inria-sans text-2xl">Lastest</h1>
      </div>
      <BlogPosts blogPosts={blogPosts} />
    </div>
  );
};

export default LastestPage