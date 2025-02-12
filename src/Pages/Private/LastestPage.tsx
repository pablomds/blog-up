import React, { useEffect, useState } from 'react';

import { getPosts } from '../../Controllers/postsControllers';
import { useToast } from '../../Context/ToastContext';
import { selectPosts } from '../../Redux/Slices/postsSlice';
import BlogPost from '../../Components/Global/Lastest/BlogPost';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

const LastestPage = () => {

  const toast = useToast();
  const posts = useSelector(selectPosts);

  const DisplayPosts = () => _.chain(posts).orderBy('createdDate', 'desc').map((post, index) => <BlogPost post={post} key={index} />).value()

  return (
    <div className="h-full w-full flex flex-col items-start gap-y-7">
      <div className="flex flex-col items-center">
        <div className="h-[5px] w-[44px] bg-blog-up-green" />
        <h1 className="font-inria-sans text-2xl">Lastest</h1>
      </div>
      <div className="flex flex-col gap-y-7">
        <DisplayPosts />
      </div>
    </div>
  );
}

export default LastestPage