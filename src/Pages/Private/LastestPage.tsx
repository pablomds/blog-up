import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/Redux/configureStore'; 
import { fetchTotalPosts, fetchPaginatedPosts, setCurrentPage, selectPostsAndTotal } from '@/Redux/Slices/postsSlice';
import BlogPosts from '@/Components/BlogPosts/BlogPosts';

const LastestPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, totalPosts, lastDoc, currentPage, isLoading } = useSelector(selectPostsAndTotal);
  const itemsPerPage = 5;
  const initialBatchSize = 100;
  const additionalBatchSize = 100;
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (isLoading || posts.length === 0) {
      setShowSkeleton(true);
    }

    const timeout = setTimeout(() => {
      if (!isLoading && posts.length > 0) {
        setShowSkeleton(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [isLoading, posts.length]);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchTotalPosts());
      dispatch(fetchPaginatedPosts({ page: 0, limit: initialBatchSize, lastDoc: null }));
    }
  }, []);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  
    const currentPagePosts = posts.filter((post: any) => post.page === page);
  
    if (currentPagePosts.length > 0) return;
  
    if (posts.length >= totalPosts) return;
  
    const batchSize = posts.length < initialBatchSize ? initialBatchSize : additionalBatchSize;

    dispatch(fetchPaginatedPosts({ page, limit: batchSize, lastDoc }));
  };

  return (
    <div className={`h-full w-full flex flex-col items-start gap-y-7 pb-14`}>
      <div className="flex flex-col items-center">
        <div className="h-[5px] w-[44px] bg-blog-up-green" />
        <h1 className="font-inria-sans text-2xl">Latest</h1>
      </div>
        <BlogPosts
          showSkeleton={showSkeleton}
          blogPosts={posts}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalPosts={totalPosts}
          onPageChange={handlePageChange}
        />
    </div>
  );
};

export default LastestPage;
