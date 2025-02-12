import React, { useEffect, useRef, useState } from 'react';

import { utils } from '../../../Utils/utils';
import { Link } from 'react-router';
import _ from 'lodash';

interface ReadMoreTextProps {
  text: string;
  maxLines?: number;
  readMoreLink: string;
};

const ReadMoreText: React.FC<ReadMoreTextProps> = ({
  text,
  maxLines = 3,
  readMoreLink,
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      setIsClamped(textRef.current.scrollHeight > textRef.current.clientHeight);
    }
  }, []);

  return (
    <div>
      <p
        ref={textRef}
        className={`font-inria-sans text-base line-clamp-3`}
      >
        {text}
      </p>
      {isClamped && (
        <Link to={readMoreLink} className="text-blog-up-green underline">
          read more
        </Link>
      )}
    </div>
  );
};

const Hashtag = ({ hashtag } : { hashtag: string}) => {
  return (
    <div className="max-w-28 md:max-w-36 border-1 border-blog-up-green rounded-2xl px-2 py-0.5 xs:px-5 xs:py-1 truncate">
      <span className="font-inria-sans text-xs xs:text-sm md:text-base  font-light text-blog-up-green">
        {hashtag}
      </span>
    </div>
  );
};

const BlogPost = ({ post } : any) => {

  const postDateToArray = utils.formatDateToArray(post.createdDate);

  const hashtags = post.text.match(/#[^\s#]+/g);

  const slicedHashtags: any[] = _.slice(hashtags,0,3);
  
  return (
    <>
      <div className="md:flex md:flex-row md:gap-x-5">
        <div className="hidden md:flex flex-col items-center min-h-62">
          <div className="font-inria-sans text-3xl">{postDateToArray[0]}</div>
          <div className="font-inria-sans text-3xl">{postDateToArray[1]}</div>
          <div className="font-inria-sans text-base">{postDateToArray[2]}</div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-7 md:gap-y-4">
            <span className="font-inria-sans text-xl md:text-3xl text-blog-up-green">
              {post.title}
            </span>
            <div className="flex flex-col gap-y-3">
              <ReadMoreText text={post.text} readMoreLink={`/post/${post.id}`}/>
              <div className="flex flex-row justify-between">
                <div className="md:hidden font-inria-sans text-base">{postDateToArray.join(" ")}</div>
                <div className="font-inria-sans text-base text-blog-up-gray">by {post.createdByName}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-x-2">
            {
              _.map(slicedHashtags, (hashtag,index) => <Hashtag key={index} hashtag={hashtag} />)
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost