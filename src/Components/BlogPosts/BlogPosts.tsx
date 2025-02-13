import React from 'react';
import _ from 'lodash';

import BlogPost from './BlogPost';
import Pagination from '../Pagination/Pagination';

interface IBlogPosts {
    blogPosts: any;
};

const BlogPosts: React.FC<IBlogPosts> = ({ blogPosts }) => {
  const getPostsByCreatedDateOrder = () =>
    _.chain(blogPosts)
      .orderBy("createdDate", "desc")
      .map((post, index) => <BlogPost post={post} key={index} />)
      .value();
  return (
    <div className="flex flex-col gap-y-7">
      <Pagination
        itemsPerPage={4}
        items={getPostsByCreatedDateOrder()}
      />
    </div>
  );
};

        

export default BlogPosts