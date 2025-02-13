import { useState, useEffect, ElementType } from 'react';
import ReactPaginate from 'react-paginate';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Components = ({ currentComponents }: { currentComponents: ElementType[] }) => {
  return <>{currentComponents}</>;
};

const Pagination = ({ itemsPerPage, items }: { itemsPerPage: number; items: any }) => {
  const getStoredPage = () => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage ? Math.max(0, parseInt(savedPage, 10)) : 0;
  };

  const [currentPage, setCurrentPage] = useState<number>(getStoredPage());

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  const itemOffset = currentPage * itemsPerPage;
  const endOffset = itemOffset + itemsPerPage;
  const currentComponents = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
    if (currentPage >= pageCount) {
      setCurrentPage(0);
    }
  }, [items, pageCount, currentPage]);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  return (
    <>
      <Components currentComponents={currentComponents} />
      <ReactPaginate
        className="flex flex-row gap-x-4 items-center justify-center"
        pageClassName="font-inria-sans"
        pageLinkClassName="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer select-none"
        activeLinkClassName="w-10 h-10 rounded-full bg-blog-up-green bg-blog-up-gray text-blog-up-black hover:text-blog-up-black"
        previousClassName="cursor-pointer"
        nextLinkClassName="cursor-pointer"
        breakLabel={"..."}
        previousLabel={<ArrowLeft className="h-6 w-6 hover:text-blog-up-green" />}
        nextLabel={<ArrowRight className="h-6 w-6 hover:text-blog-up-green" />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        forcePage={currentPage} 
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;
