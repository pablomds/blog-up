import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { selectPostWithId } from '../../Redux/Slices/postsSlice';
import { getPost } from '../../Controllers/postsControllers';
import _ from 'lodash';
import { utils } from '../../Utils/utils';

interface Post {
  id: string;
  createdDate: number;
  title: string;
  text: string;
  createdBy: string;
  author: string;
};

const Content = ({ content } : { content: string} ) => {
  const firstLetter = content.charAt(0);
  return (
    <p className="font-inria-sans text-base whitespace-pre-line">
      <span className="text-4xl">{firstLetter}</span>
      {
        content.slice(1,content.length).replace(/#[^\s#]+/g, "")
      }
    </p>
  );
};

const Hashtag = ({ hashtag } : { hashtag: string }) => {
  return (
    <div className="border-1 border-blog-up-green rounded-2xl px-2 py-0.5 xs:px-5 xs:py-1 truncate">
      <span className="font-inria-sans text-xs xs:text-sm md:text-base  font-light text-blog-up-green">
        {hashtag}
      </span>
    </div>
  );
};

const Hashtags = ({hashtags} : { hashtags: any}) => _.map(hashtags, hashtag => <Hashtag hashtag={hashtag} />)

const BlogPostDetailsPage = () => {

  const [post, setPost] = useState<Post | null>(null)
  const params = useParams();
  const selectedPost = useSelector((state) => selectPostWithId(state, params.id));

  useEffect(() => {
    if (selectedPost) {
      setPost(selectedPost);
    }
  }, [selectedPost]); // Re-run effect when `selectedPost` changes

  if (!post) {
    return <div className="text-5xl text-blog-up-red hover:text-blog-up-gray">This post doesn't exists :/</div>
  }
  const hashtags = post.text.match(/#[^\s#]+/g);

  return (
    <div className="flex flex-col gap-y-5 items-start pb-20">
      <div className="flex flex-col items-center">
        <div className="h-[5px] w-[44px] bg-blog-up-green" />
        <h1 className="font-inria-sans text-2xl">Post</h1>
      </div>
      <div className="flex flex-col gap-y-3">
        <h1 className="font-inria-sans text-3xl text-blog-up-green">
          {post.title}
        </h1>
        <span className="font-inria-sans text-base text-blog-up-gray font-light">
          written by {post.author}
        </span>
      </div>
      <div className="flex flex-col gap-y-3">
        <Content content={post.text} />
        <div className="flex flex-row justify-between">
          <div className="md:hidden font-inria-sans text-base">{utils.formatDateToArray(post.createdDate).join(" ")}</div>
        </div>
      </div>
      <div className="grid grid-flow-row grid-cols-3 gap-2">
        <Hashtags hashtags={hashtags} />
      </div>
    </div>
  );

}

export default BlogPostDetailsPage