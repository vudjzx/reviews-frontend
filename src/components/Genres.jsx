import React, { useEffect } from "react";
import useMovies from "../hooks/useMovies";
const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  const { getGenres } = useMovies();
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };
  const handleRemove = (genre) => {
    setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  };
  const fetchGenres = async () => {
    const data = await getGenres({ type });
    setGenres(data.genres);
  };

  useEffect(() => {
    void fetchGenres();
  }, []);

  return (
    <div className="flex flex-wrap px-4">
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <div
            onClick={() => handleRemove(genre)}
            key={genre.id}
            className="cursor-pointer text-slate-50 bg-indigo-500 px-3 py-1 rounded-full mx-1 mb-2"
          >
            <p>{genre.name}</p>
          </div>
        ))}
      {genres &&
        genres.map((genre) => (
          <div
            onClick={() => handleAdd(genre)}
            key={genre.id}
            className="cursor-pointer bg-slate-500 px-3 py-1 rounded-full mx-1 mb-2 hover:bg-indigo-500 transition-colors"
          >
            <p>{genre.name}</p>
          </div>
        ))}
    </div>
  );
};

export default Genres;
