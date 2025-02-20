import ReactPaginate from "react-paginate";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface IPagination {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<IPagination> = ({
  currentPage,
  pageCount,
  onPageChange,
}) => {

  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full flex flex-row items-center justify-center bg-blog-up-black fixed bottom-0 py-4">
        {pageCount > 1 && (
          <ReactPaginate
            className=" w-1/4 flex flex-row gap-x-4 items-center justify-center md:mr-32 lg:mr-36 xl:mr-40 2xl:mr-44"
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
    </div>
  );
};

export default Pagination;
