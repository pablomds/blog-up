import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/Redux/configureStore'; 
import { fetchTotalPosts, fetchPaginatedPosts, setCurrentPage, selectPostsAndTotal } from '@/Redux/Slices/postsSlice';
import BlogPosts from '@/Components/BlogPosts/BlogPosts';
import Pagination from '@/Components/Pagination/Pagination';

const LastestPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, totalPosts, lastDoc, currentPage, isLoading } = useSelector(selectPostsAndTotal);
  const itemsPerPage = 5;
  const initialBatchSize = 100;
  const additionalBatchSize = 100;
  const [showSkeleton, setShowSkeleton] = useState(true);

  // const posts = getPostsByCreatedDateOrder()
  const itemOffset = currentPage * itemsPerPage;
  const endOffset = itemOffset + itemsPerPage;
  const currentComponents = posts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(totalPosts / itemsPerPage);

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
    <>
      <div className="mx-auto flex flex-col items-start md:px-20 px-10 pt-28 pb-20">
        <div className="flex flex-col pb-4">
          <div className="h-[5px] w-[44px] bg-blog-up-green" />
          <h1 className="font-inria-sans text-2xl">Lastest</h1>
        </div>
        <BlogPosts showSkeleton={showSkeleton} blogPosts={currentComponents} />
      </div>
      <Pagination
        pageCount={pageCount}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
};

export default LastestPage;
