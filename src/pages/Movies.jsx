import React, { useEffect, useState } from "react";
import Genres from "../components/Genres";
import LoadingComponent from "../components/LoadingComponent";
import PaginationComponent from "../components/PaginationComponent";
import useGenres from "../hooks/useGenres";
import useMovies from "../hooks/useMovies";
import TrendingItem from "../components/TrendingItem";

function Movies() {
  const { getMovies } = useMovies();
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    pages: [1, 2, 3, 4, 5],
  });
  const [movies, setMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreURL = useGenres(selectedGenres);

  const getData = async () => {
    const data = await getMovies({
      page: pagination.page,
      genreURL: genreURL,
      type: "movie",
    });
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
  }, [pagination.page, genreURL]);

  const changePage = (page) => {
    setPagination({
      ...pagination,
      page: page,
      pages:
        page === pagination.pages[pagination.pages.length - 1]
          ? [page - 2, page - 1, page, page + 1, page + 2]
          : pagination.pages[0] === page && page !== 1
          ? [page - 1, page, page + 1, page + 2, page + 3]
          : pagination.pages,
    });
    window.scrollTo(0, 0);
  };

  if (movies.length === 0 && selectedGenres.length === 0) {
    return (
      <div className="w-full h-screen">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="pt-24">
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={changePage}
      />
      {movies.length === 0 && selectedGenres.length > 0 && (
        <div className="w-full h-64 flex items-center justify-center">
          <h1 className="text-white text-4xl">No movies found</h1>
        </div>
      )}
      <div className="w-full h-[90%] grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4 font-light ">
        {movies.map((movie, index) => (
          <TrendingItem
            key={index.toString()}
            title={movie.original_title}
            releaseDate={movie.release_date}
            mediaType="Movie"
            poster={movie.poster_path}
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

export default Movies;
