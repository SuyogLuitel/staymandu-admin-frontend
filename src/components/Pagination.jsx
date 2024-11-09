import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ totalPage, currentPage, page, setPage }) => {
  return (
    <div className="flex items-center justify-between">
      <div
        className={`px-3 py-2 rounded bg-gray-100 flex cursor-pointer items-center ${
          currentPage === 1
            ? "cursor-not-allowed"
            : "bg-gray-200 hover:font-semibold"
        }`}
        onClick={() => currentPage !== 1 && setPage(page - 1)}
      >
        <IoIosArrowBack />
        Prev
      </div>
      <div className="flex items-center gap-1">
        Page
        <div className="px-3 py-1 rounded bg-gray-100 flex cursor-pointer items-center">
          {currentPage ?? 1}
        </div>
        of {totalPage ?? 1}
      </div>
      <div
        className={`px-3 py-2 rounded bg-gray-100 flex cursor-pointer items-center ${
          currentPage !== totalPage
            ? "hover:bg-gray-200 hover:font-semibold"
            : "cursor-not-allowed"
        }`}
        onClick={() => currentPage !== totalPage && setPage(page + 1)}
      >
        Next
        <IoIosArrowForward />
      </div>
    </div>
  );
};

export default Pagination;
