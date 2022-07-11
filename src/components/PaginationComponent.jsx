import React from "react";
export default function PaginationComponent(props) {
  const { page, changePage, pages, totalPages } = props;
  if (totalPages === 0) return null;
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex h-full py-2">
        {page >= 5 && (
          <>
            <button
              className="bg-slate-800 px-3 py-2 mx-1 rounded-full flex justify-center items-center hover:bg-yellow-500 hover:text-black transition-colors duration-200"
              onClick={() => changePage(1)}
            >
              1
            </button>
            <span className="flex justify-center items-center">...</span>
          </>
        )}
        {pages.map((e, index) => {
          const isActive = e === page;
          return (
            <button
              className={`${
                isActive
                  ? "bg-yellow-500 border-slate-800 text-black"
                  : "bg-slate-800"
              } px-3 py-2 mx-1 rounded-full flex justify-center items-center hover:bg-yellow-500 hover:text-black transition-colors duration-200`}
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
