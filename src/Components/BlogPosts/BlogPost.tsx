import _ from 'lodash';
import { utils } from '@/Utils/utils';

import BlogPostHashtag from "@/Components/BlogPosts/BlogPostHashtag";
import ReadMoreText from '@/Components/BlogPosts/ReadMore';
import { Link } from 'react-router';

interface IBlogPost {
  post: any;
  userId: string;
}

const BlogPost: React.FC<IBlogPost> = ({ post, userId } : any) => {

  const postDateToArray = utils.formatDateToArray(post.createdDate);

  const hashtags = post.text.match(/#[^\s#]+/g);

  const slicedHashtags: any[] = _.slice(hashtags,0,3);

  const content = post.text.split("#")[0].trim();
  
  return (
    <div className="md:flex md:flex-row md:gap-x-5 pb-8">
      <div className="hidden md:flex flex-col items-center min-h-62">
        <div className="font-inria-sans text-3xl">{postDateToArray[0]}</div>
        <div className="font-inria-sans text-3xl">{postDateToArray[1]}</div>
        <div className="font-inria-sans text-base">{postDateToArray[2]}</div>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2 md:gap-y-4">
          <span className="font-inria-sans text-xl md:text-3xl text-blog-up-green">
            {post.title}
          </span>
          <div className="flex flex-col gap-y-3">
            <ReadMoreText
              text={content}
              readMoreLink={`/post/${post.id}`}
            />
            <div className="flex flex-row justify-between">
              <div className="md:hidden font-inria-sans text-base">
                {postDateToArray.join(" ")}
              </div>
              <div className="font-inria-sans text-base text-blog-up-gray">
                by {post.author} {
                  userId === post.createdBy && <Link className="text-blog-up-green hover:text-blog-up-gray rounded-xl" to={`/create-post/${post.id}`}>Edit Post</Link>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-x-2">
          {_.map(slicedHashtags, (hashtag, index) => (
            <BlogPostHashtag key={index} hashtag={hashtag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost