import React from 'react';
import _ from 'lodash';

import BlogPost from '@/Components/BlogPosts/BlogPost';
import NoPostsFound from './NoPostsFound';
import SkeletonBlogPost from './SkeletonBlogPost';




interface IBlogPosts {
    blogPosts: any;
    showSkeleton: boolean;
};

const BlogPosts: React.FC<IBlogPosts> = ({
  blogPosts,
  showSkeleton,
}) => {

  const getPostsByCreatedDateOrder = () => 
    _.chain(blogPosts)
      .orderBy("createdDate", "desc")
      .map((post, index) => <BlogPost post={post} key={index} />)
      .value();

  const posts = getPostsByCreatedDateOrder();

  const renderPosts = () => {
    if (showSkeleton) {
      return _.map(posts, (_, index) => (
        <SkeletonBlogPost key={index} />
      ));
    } else if (posts.length) {
      return <div className="pb-2">{posts}</div>;
    } else {
      return <NoPostsFound />;
    }
  };

  return (
    <>
      <div className="md:pr-20 xl:pr-96">
        {renderPosts()}
      </div>
    </>
  );
};

        

export default BlogPosts