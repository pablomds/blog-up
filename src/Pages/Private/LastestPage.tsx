import React from 'react'
import BlogPost from '../../Components/Global/Lastest/BlogPost';

const LastestPage = () => {
  return (
    <div className="h-full w-full flex flex-col items-start gap-y-7">
      <div className="flex flex-col items-center">
        <div className="h-[5px] w-[44px] bg-blog-up-green" />
        <h1 className="font-inria-sans text-2xl">Lastest</h1>
      </div>
      <div className="flex flex-col gap-y-7">
        <BlogPost/>
        <BlogPost/>
      </div>
    </div>
  );
}

export default LastestPage