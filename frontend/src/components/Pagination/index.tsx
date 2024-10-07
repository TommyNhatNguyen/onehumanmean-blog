import clsx from "clsx";
import { useMemo } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

type PaginationType = {
  totalPage: number;
  handlePagination: (page: number) => void;
  handlePrev: () => void;
  handleNext: () => void;
  currentPage: number;
};

const PAGE_STEP = 2;
const Pagination = ({
  totalPage,
  handlePagination,
  currentPage,
  handlePrev,
  handleNext,
}: PaginationType) => {
  const pageList = useMemo(() => {
    let start = currentPage - PAGE_STEP;
    let end = currentPage + PAGE_STEP;
    if (start <= 0) {
      start = 1;
      end = start + PAGE_STEP * 2;
      if (end > totalPage) {
        end = totalPage;
      }
    }
    if (end >= totalPage) {
      end = totalPage;
      start = end - PAGE_STEP * 2;
      if (start < 1) {
        start = 1;
      }
    }
    const list = [];
    for (let index = start; index < end + 1; index++) {
      list.push(index);
    }
    return list;
  }, [currentPage, totalPage]);
  const _onSelectPage = (pageNum: number) => {
    handlePagination(pageNum);
  };
  const _onPrev = () => {
    if (currentPage > 0) {
      handlePrev();
    }
  };
  const _onNext = () => {
    if (currentPage !== totalPage) {
      handleNext();
    }
  };
  return (
    <ul className="mx-auto my-[30px] flex w-full flex-row items-center border-t-2 pt-[20px]">
      <li
        onClick={_onPrev}
        className={clsx(
          "mr-auto",
          currentPage === 1 && "pointer-events-none opacity-70",
        )}
      >
        <Link className="group flex items-center gap-[8px]" to="#">
          <FaArrowLeft className="h-[20px] w-[20px] duration-150 group-hover:-translate-x-4" />
          Previous
        </Link>
      </li>
      {pageList.map((item) => (
        <li
          onClick={() => _onSelectPage(item)}
          key={item}
          className={clsx(
            "mr-[2px] h-[40px] w-[40px] rounded-[8px] font-medium text-tag duration-300 hover:bg-purple-100 hover:text-purple-300",
            currentPage === item && "bg-purple-100 text-purple-300",
          )}
        >
          <Link
            className="flex h-full w-full items-center justify-center"
            to="#"
          >
            {item}
          </Link>
        </li>
      ))}
      <li
        onClick={_onNext}
        className={clsx(
          "ml-auto",
          currentPage === totalPage && "pointer-events-none opacity-70",
        )}
      >
        <Link className="group flex items-center gap-[8px]" to="#">
          Next
          <FaArrowRight className="h-[20px] w-[20px] duration-150 group-hover:translate-x-4" />
        </Link>
      </li>
    </ul>
  );
};

export default Pagination;
