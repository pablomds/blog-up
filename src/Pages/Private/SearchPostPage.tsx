import { useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { X, Search } from 'lucide-react';

import { selectPosts } from '@/Redux/Slices/postsSlice';
import BlogPost from '@/Components/BlogPosts/BlogPost';

const SearchPostPage = () => {
  const [postTitle, setPostTitle] = useState<string>("");
  const blogPosts = useSelector(selectPosts);

  const handleInput = (e: any) => {
    const searchTerm = e.target.value;
    setPostTitle(searchTerm)
  };

  const resetInput = () => {
    setPostTitle("")
  };

  const filteredPosts = _.filter(blogPosts, (post) => {
    if (postTitle !== "")
      return post.title.toLowerCase().includes(postTitle.toLowerCase());
  });

  return (
    <div className="font-inria-sans h-full w-full flex flex-col items-start gap-y-7 pb-4">
      <div className="flex flex-col items-center">
        <div className="h-[5px] w-[44px] bg-blog-up-green" />
        <h1 className="font-inria-sans text-2xl">Search</h1>
      </div>
      <div className="w-full">
        <div className="flex flex-col relative w-full max-w-[508px]">
          <div className="relative w-full">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blog-up-gray">
              <Search />
            </span>
            <input
              onChange={handleInput}
              className={`w-full h-14 border-2 border-blog-up-green py-4 pl-12 pr-12 rounded-[5px] focus:outline-none`}
              placeholder="Search post by title"
              value={postTitle}
            />
            <div onClick={resetInput} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blog-up-red cursor-pointer">
              <X />
            </div>
          </div>
        </div>
      </div>
      {
        filteredPosts.map(post => <BlogPost post={post} />)
      }
    </div>
  );
};

export default SearchPostPage