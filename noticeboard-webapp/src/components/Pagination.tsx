import React from "react";

interface IPosts {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
const Pagination = ({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}: IPosts) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  console.log(pages);
  return (
    <div className="flex gap-3">
      {pages.map((page, index) => {
        const isActive = page === currentPage;
        const buttonClass = isActive ? "bg-blue-500 text-white" : "";
        return (
          <button
            className={`px-3 py-1 mr-1 rounded ${buttonClass}`}
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
