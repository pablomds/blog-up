import { ReactNode } from 'react';
import ReactPaginate from 'react-paginate';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Components = ({ currentComponents }: { currentComponents: ReactNode[] }) => {
  return <>{currentComponents}</>;
};

interface IPagination {
  currentPage: number;
  itemsPerPage: number;
  items: ReactNode[];
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<IPagination> = ({ currentPage, itemsPerPage, totalItems, items, onPageChange }) => {

  const itemOffset = currentPage * itemsPerPage;
  const endOffset = itemOffset + itemsPerPage;
  const currentComponents = items.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected); 
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };

  return (
    <>
      <Components currentComponents={currentComponents} />
      {pageCount > 1 && (
        <ReactPaginate
          className="absolute bottom-0 left-0 right-0 flex flex-row gap-x-4 items-center justify-center pb-4"
          pageClassName="font-inria-sans"
          pageLinkClassName="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer select-none"
          activeLinkClassName="w-10 h-10 rounded-full bg-blog-up-green bg-blog-up-gray text-blog-up-black hover:text-blog-up-black"
          previousClassName="cursor-pointer"
          nextLinkClassName="cursor-pointer"
          breakLabel={"..."}
          previousLabel={
            <ArrowLeft className="h-6 w-6 hover:text-blog-up-green" />
          }
          nextLabel={
            <ArrowRight className="h-6 w-6 hover:text-blog-up-green" />
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          forcePage={currentPage}
          renderOnZeroPageCount={null}
        />
      )}
    </>
  );
};

export default Pagination;
