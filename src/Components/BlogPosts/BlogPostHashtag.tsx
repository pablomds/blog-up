import React from "react";

interface IHashtag {
    hashtag: string
};

const BlogPostHashtag: React.FC<IHashtag> = ({ hashtag }) => {
  return (
    <div className="max-w-28 md:max-w-36 border-1 border-blog-up-green rounded-2xl px-2 py-0.5 xs:px-5 xs:py-1 truncate">
      <span className="font-inria-sans text-xs xs:text-sm md:text-base  font-light text-blog-up-green">
        {hashtag}
      </span>
    </div>
  );
};

export default BlogPostHashtag;
