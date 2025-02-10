import React from 'react'

const BlogPost = () => {
  return (
    <>
      <div className="md:flex md:flex-row md:gap-x-5">
        <div className="hidden md:flex flex-col items-center min-h-62">
          <div className="font-inria-sans text-3xl">27</div>
          <div className="font-inria-sans text-3xl">May</div>
          <div className="font-inria-sans text-base">2025</div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-7 md:gap-y-4">
            <span className="font-inria-sans text-xl md:text-3xl text-blog-up-green">
              15 Disadvantages Of Freedom And How You Can Workaround It.
            </span>
            <div className="flex flex-col gap-y-3">
              <p className="font-inria-sans text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum{" "}
                <span className="text-blog-up-green">...read more</span>
              </p>
              <div className="flex flex-row justify-between">
                <div className="md:hidden font-inria-sans text-base">27 May 2025</div>
                <div className="font-inria-sans text-base">@userblabla</div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-x-2">
            <div className="border-1 border-blog-up-green rounded-2xl px-5 py-1">
              <span className="font-inria-sans font-light text-blog-up-green">
                #thinkfree
              </span>
            </div>
            <div className="border-1 border-blog-up-green rounded-2xl px-5 py-1">
              <span className="font-inria-sans font-light text-blog-up-green">
                #imagination
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost