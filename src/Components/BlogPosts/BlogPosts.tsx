import React from 'react';
import _ from 'lodash';

import BlogPost from '@/Components/BlogPosts/BlogPost';
import Pagination from '@/Components/Pagination/Pagination';
import NoPostsFound from './NoPostsFound';




interface IBlogPosts {
    blogPosts: any;
    currentPage: number;
    totalPosts: number;
    itemsPerPage: number;
    onPageChange:(page: number) => void;
};

const BlogPosts: React.FC<IBlogPosts> = ({
  blogPosts,
  currentPage,
  totalPosts,
  itemsPerPage,
  onPageChange,
}) => {
  const getPostsByCreatedDateOrder = () =>
    _.chain(blogPosts)
      .orderBy("createdDate", "desc")
      .map((post, index) => <BlogPost post={post} key={index} />)
      .value();

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