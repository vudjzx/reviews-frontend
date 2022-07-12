import React, { useEffect, useState } from "react";
import LoadingComponent from "../components/LoadingComponent";
import PaginationComponent from "../components/PaginationComponent";
import useMovies from "../hooks/useMovies";
import TrendingItem from "../components/TrendingItem";

function Trending() {
  const { getTrending } = useMovies();
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    pages: [1, 2, 3, 4, 5],
  });
  const [movies, setMovies] = useState([]);

  const getData = async () => {
    const data = await getTrending({ page: pagination.page });
    setMovies(data.results);
    setPagination({
      ...pagination,
      totalPages: data.total_pages,
    });
  };

  useEffect(() => {
    void getData();
  }, []);

  useEffect(() => {
    void getData();
  }, [pagination.page]);

  const changePage = (page) => {
    setPagination({
      ...pagination,
      page: page,
      pages:
        page === 1
          ? [1, 2, 3, 4, 5]
          : page === pagination.pages[pagination.pages.length - 1]
          ? [page - 2, page - 1, page, page + 1, page + 2]
          : pagination.pages[0] === page && page !== 1
          ? [page - 1, page, page + 1, page + 2, page + 3]
          : pagination.pages,
    });
    window.scrollTo(0, 0);
  };

  if (movies.length === 0) {
    return (
      <div className="w-full h-screen">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="pt-20">
      <h2 className={`py-4 px-4 font-light`}>Trending...</h2>
      <div className="w-full h-[90%] grid grid-cols-1 xl:grid-cols-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 font-light ">
        {movies.map((movie, index) => (
          <TrendingItem
            title={movie.title || movie.name}
            poster={movie.poster_path}
            mediaType={movie.media_type === "movie" ? "Movie" : "Tv Show"}
            releaseDate={movie.release_date || movie.first_air_date}
            key={index.toString()}
            id={movie.id}
          />
        ))}
      </div>
      <PaginationComponent
        page={pagination.page}
        changePage={changePage}
        totalPages={pagination.totalPages}
        pages={pagination.pages}
      />
    </div>
  );
}

export default Trending;
