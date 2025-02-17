import _ from 'lodash';

import { utils } from '@/Utils/utils';

import BlogPostHashtag from "@/Components/BlogPosts/BlogPostHashtag";
import ReadMoreText from '@/Components/BlogPosts/ReadMore';

const BlogPost = ({ post } : any) => {
  
  const postDateToArray = utils.formatDateToArray(post.createdDate);

  const hashtags = post.text.match(/#[^\s#]+/g);

  const slicedHashtags: any[] = _.slice(hashtags,0,3);
  
  return (
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
            <ReadMoreText
              text={post.text}
              maxLines={2}
              readMoreLink={`/post/${post.id}`}
            />
            <div className="flex flex-row justify-between">
              <div className="md:hidden font-inria-sans text-base">
                {postDateToArray.join(" ")}
              </div>
              <div className="font-inria-sans text-base text-blog-up-gray">
                by {post.author}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-x-2 h-[34px]">
          {_.map(slicedHashtags, (hashtag, index) => (
            <BlogPostHashtag key={index} hashtag={hashtag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost