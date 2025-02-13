import React from 'react';
import BlogPost from './BlogPost';
import _ from 'lodash';

interface IBlogPosts {
    blogPosts: any;
}

const BlogPosts: React.FC<IBlogPosts> = ({ blogPosts }) => {
  return (
    <div className="flex flex-col gap-y-7">
      {_.chain(blogPosts)
        .orderBy("createdDate", "desc")
        .map((post, index) => <BlogPost post={post} key={index} />)
        .value()}
    </div>
  );
};

export default BlogPosts