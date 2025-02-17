import React from 'react';
import _ from 'lodash';

import BlogPost from '@/Components/BlogPosts/BlogPost';
import Pagination from '@/Components/Pagination/Pagination';
import NoPostsFound from './NoPostsFound';
import SkeletonBlogPost from './SkeletonBlogPost';




interface IBlogPosts {
    blogPosts: any;
    currentPage: number;
    totalPosts: number;
    itemsPerPage: number;
    showSkeleton: boolean;
    onPageChange:(page: number) => void;
};

const BlogPosts: React.FC<IBlogPosts> = ({
  blogPosts,
  currentPage,
  totalPosts,
  itemsPerPage,
  showSkeleton,
  onPageChange,
}) => {

  const getPostsByCreatedDateOrder = () =>
    _.chain(blogPosts)
      .orderBy("createdDate", "desc")
      .map((post, index) => <BlogPost post={post} key={index} />)
      .value();

  if (showSkeleton) {
    return (
      _.map(_.range(itemsPerPage), item => <SkeletonBlogPost key={item}/> )
    )
  };

  if (blogPosts.length === 0) {
    return <NoPostsFound />;
  }

  return (
    <div className="flex flex-col gap-y-7">
      <Pagination
        currentPage={currentPage}
        items={getPostsByCreatedDateOrder()}
        itemsPerPage={itemsPerPage}
        totalItems={totalPosts}
        onPageChange={onPageChange}
      />
    </div>
  );
};

        

export default BlogPosts