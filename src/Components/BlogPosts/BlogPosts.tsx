import React from 'react';
import BlogPost from './BlogPost';
import _ from 'lodash';

interface IBlogPosts {
    blogPosts: any;
}

const BlogPosts: React.FC<IBlogPosts> = ({ blogPosts }) => {
  return _.chain(blogPosts)
    .orderBy("createdDate", "desc")
    .map((post, index) => <BlogPost post={post} key={index} />)
    .value();
};

export default BlogPosts