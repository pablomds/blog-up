import React from 'react';
import _ from 'lodash';

import BlogPost from '@/Components/BlogPosts/BlogPost';
import NoPostsFound from './NoPostsFound';
import SkeletonBlogPost from './SkeletonBlogPost';
import { useSelector } from 'react-redux';
import { selectUserId } from '@/Redux/Slices/userSlice';




interface IBlogPosts {
    blogPosts: any;
    showSkeleton: boolean;
};

const BlogPosts: React.FC<IBlogPosts> = ({
  blogPosts,
  showSkeleton,
}) => {

  const userId = useSelector(selectUserId);
  
  const RenderBlogPosts = () => 
    _.map(blogPosts,(post, index) => <BlogPost post={post} key={index} userId={userId} />)

  const RenderLastest = () => {
    if (showSkeleton) {
      return _.map(blogPosts, (_, index) => (
        <SkeletonBlogPost key={index} />
      ));
    } else if (blogPosts.length) {
      return <div className="pb-2">{<RenderBlogPosts/>}</div>;
    } else {
      return <NoPostsFound />;
    }
  };

  return (
    <>
      <div className="md:pr-20 xl:pr-96">
        <RenderLastest/>
      </div>
    </>
  );
};

export default BlogPosts