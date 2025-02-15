import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/Redux/configureStore'; 
import { fetchTotalPosts, fetchPaginatedPosts, setCurrentPage, selectPostsAndTotal } from '@/Redux/Slices/postsSlice';
import BlogPosts from '@/Components/BlogPosts/BlogPosts';

const LastestPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, totalPosts, lastDoc, currentPage } = useSelector(selectPostsAndTotal);
  const itemsPerPage = 5;
  const initialBatchSize = 100;
  const additionalBatchSize = 100;

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  
    const currentPagePosts = posts.filter((post: any) => post.page === page);
  
    if (currentPagePosts.length > 0) return;
  
    if (posts.length >= totalPosts) return;
  
    const batchSize = posts.length < initialBatchSize ? initialBatchSize : additionalBatchSize;

    dispatch(fetchPaginatedPosts({ page, limit: batchSize, lastDoc }));
  };

  return (
    <div className="h-full w-full flex flex-col items-start gap-y-7 pb-8">
      <div className="flex flex-col items-center">
        <div className="h-[5px] w-[44px] bg-blog-up-green" />
        <h1 className="font-inria-sans text-2xl">Latest</h1>
      </div>
      <BlogPosts
        blogPosts={posts} // Pass posts to the BlogPosts component
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalPosts={totalPosts}
        onPageChange={handlePageChange} // Handler to change page
      />
    </div>
  );
};

export default LastestPage;
