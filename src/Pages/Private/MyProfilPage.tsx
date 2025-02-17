import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

import { selectUserPosts, setUserPosts, fetchUserPostsWithIds } from '@/Redux/Slices/postsSlice';
import { selectUser } from '@/Redux/Slices/userSlice';

import { useEffect, useState } from 'react';
import { AppDispatch } from '@/Redux/configureStore';
import BlogPosts from '@/Components/BlogPosts/BlogPosts';

const MyProfilPage = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectUser);
  const itemsPerPage = 5;
  const {userPosts, isLoading} = useSelector(selectUserPosts);

  useEffect(() => {
    if (isLoading || userPosts.length === 0) {
      setShowSkeleton(true);
    }

    const timeout = setTimeout(() => {
      if (!isLoading && userPosts.length > 0) {
        setShowSkeleton(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [isLoading, userPosts.length]);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(setUserPosts({ userId: currentUser.id }));
    }
  }, [currentUser.id]);

  useEffect(() => {
    if (userPosts.length && currentUser) {
      let currentPostsIds = _.map(userPosts, (post) => post.id);
      console.log()
      const postsIdsToFetch = _.differenceWith(
        currentUser.postsIds,
        currentPostsIds,
        _.isEqual
      );
      if (postsIdsToFetch.length) {
        dispatch(
          fetchUserPostsWithIds({
            author: currentUser?.name,
            postsIds: postsIdsToFetch,
          })
        );
      }
    }
  }, []);

    const handlePageChange = (page: number) => {
      setCurrentPage(page)
    };

  return (
    <div className="font-inria-sans h-full w-full flex flex-col items-start gap-y-7 pb-4">
      <div className="flex flex-col items-center">
        <div className="h-[5px] w-[44px] bg-blog-up-green" />
        <h1 className="font-inria-sans text-2xl">My Profil</h1>
      </div>
      <BlogPosts onPageChange={handlePageChange} showSkeleton={showSkeleton} itemsPerPage={itemsPerPage} currentPage={currentPage} totalPosts={userPosts.length} blogPosts={userPosts} />
    </div>
  );
};

export default MyProfilPage