import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import { selectUserPosts, setUserPosts, fetchUserPostsWithIds } from '@/Redux/Slices/postsSlice';
import { selectUser } from '@/Redux/Slices/userSlice';

import BlogPosts from '@/Components/BlogPosts/BlogPosts';
import { useEffect } from 'react';
import { AppDispatch } from '@/Redux/configureStore';
import BlogPost from '@/Components/BlogPosts/BlogPost';

const MyProfilPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectUser);
  const blogPosts = useSelector(selectUserPosts);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(setUserPosts({ userId: currentUser.id }));
    }
  }, [currentUser.id])

  useEffect(() => {
    if (blogPosts.length && currentUser) {
      let currentPostsIds = _.map(blogPosts, (post) => post.id);
      const postsIdsToFetch = _.differenceWith(currentUser.postsIds,currentPostsIds, _.isEqual);
      if (postsIdsToFetch.length) {
        dispatch(fetchUserPostsWithIds({ author: currentUser?.name, postsIds: postsIdsToFetch}));
      } 
    } 
  }, [])

  const getPostsByCreatedDateOrder = () =>
    _.chain(blogPosts)
      .orderBy("createdDate", "desc")
      .map((post, index) => <BlogPost post={post} key={index} />)
      .value();

  return (
    <div className="font-inria-sans h-full w-full flex flex-col items-start gap-y-7 pb-4">
      <div className="flex flex-col items-center">
        <div className="h-[5px] w-[44px] bg-blog-up-green" />
        <h1 className="font-inria-sans text-2xl">My Profil</h1>
      </div>
      {
        getPostsByCreatedDateOrder()
      }

      {/* <BlogPosts currentPage={0} totalPosts={blogPosts.length} blogPosts={blogPosts} /> */}
    </div>
  );
};

export default MyProfilPage