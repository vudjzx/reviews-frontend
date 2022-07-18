import React from "react";
export default function PaginationComponent(props) {
  const { page, changePage, pages, totalPages } = props;
  let numOfPages = [];
  if (totalPages <= 5) {
    numOfPages = Array(totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }
  const pagesMap = totalPages >= 5 ? pages : numOfPages;
  if (totalPages === 0) return null;
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex h-full py-2">
        {page >= 5 && (
          <>
            <button
              className="bg-slate-800 px-3 py-2 mx-1 rounded-full flex justify-center items-center hover:bg-indigo-500 hover:text-black transition-colors duration-200"
              onClick={() => changePage(1)}
            >
              1
            </button>
            <span className="flex justify-center items-center">...</span>
          </>
        )}
        {pagesMap.map((e, index) => {
          const isActive = e === page;
          return (
            <button
              className={`${
                isActive
                  ? "bg-indigo-500 border-slate-800 text-white"
                  : "bg-slate-800"
              } px-3 py-2 mx-1 rounded-full flex justify-center items-center hover:bg-indigo-500 hover:text-black transition-colors duration-200`}
              onClick={() => changePage(e)}
              key={index}
            >
              {e}
            </button>
          );
        })}
      </div>
    </div>
  );
}
