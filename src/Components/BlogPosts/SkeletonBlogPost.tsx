import React from "react";
import _ from "lodash";

import ReadMoreText from "@/Components/BlogPosts/ReadMore";
import BlogPostHashtag from "@/Components/BlogPosts/BlogPostHashtag";

const SkeletonBlogPost = () => {
  const slicedHashtags = ["#freewww", "#mathieu"];
  return (
    <>
      <div className="md:flex md:flex-row md:gap-x-5 rounded-lg animate-pulse">
        <div className="hidden md:flex flex-col items-center min-h-62">
          <div className="font-inria-sans text-3xl bg-blog-up-black-light">00</div>
          <div className="font-inria-sans text-3xl bg-blog-up-black-light">00</div>
          <div className="font-inria-sans text-base bg-blog-up-black-light">00</div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-7 md:gap-y-4">
            <span className="font-inria-sans text-xl md:text-3xl h-10 text-blog-up-black-light bg-blog-up-black-light">
              Nice Title
            </span>
            <div className="flex flex-col gap-y-3">
              <p className="line-clamp-4 text-blog-up-black-light bg-blog-up-black-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                venenatis vestibulum orci vitae congue. Nunc nibh ligula,
                dignissim sit amet fermentum in, consectetur in nisi. Cras eu ex
                condimentum, mollis nibh quis, iaculis augue. Integer sagittis
                pharetra diam, sed venenatis nisl porta id. Cras a tellus eget
                nisi accumsan tristique. Ut non magna vel velit iaculis
                vulputate non quis orci. Donec metus eros, commodo sed
                pellentesque a, vulputate sed tellus. Pellentesque habitant
                morbi tristique senectus et netus et malesuada fames ac turpis
                egestas. Cras non ipsum libero.Ut non magna vel velit iaculis
                vulputate non quis orci. Donec metus eros, commodo sed
                pellentesque a, vulputate sed tellus. Pellentesque habitant
                morbi tristique senectus et netus et malesuada fames ac turpis
                egestas. Cras non ipsum libero.
              </p>
              <div className="flex flex-row justify-between">
                <div className="md:hidden font-inria-sans text-base text-blog-up-black-light bg-blog-up-black-light">
                  20 febr. 2025
                </div>
                <div className="font-inria-sans text-base  text-blog-up-black-light bg-blog-up-black-light">
                  by unknown
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-x-2 w-62 bg-blog-up-black-light">
            <div className="max-w-28 md:max-w-36 border-1 border-blog-up-black-light rounded-2xl px-2 py-0.5 xs:px-5 xs:py-1">
              <span className="font-inria-sans text-xs xs:text-sm md:text-base  font-light text-blog-up-black-light bg-blog-up-black-light">
                #blabla
              </span>
            </div>
            <div className="max-w-28 md:max-w-36 border-1 border-blog-up-black-light rounded-2xl px-2 py-0.5 xs:px-5 xs:py-1">
              <span className="font-inria-sans text-xs xs:text-sm md:text-base  font-light text-blog-up-black-light bg-blog-up-black-light">
                #blabla
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonBlogPost;
