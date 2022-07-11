import axios from "axios";

async function getTrending({ page = 1 }) {
  const url = `${import.meta.env.VITE_MOVIES_URL}/trending/all/day?api_key=${
    import.meta.env.VITE_MOVIES_API_KEY
  }&page=${page}`;
  const { data } = await axios.get(url);
  return data;
}

async function getMovies({ page = 1, genreURL = "", type = "movie" }) {
  const url = `${import.meta.env.VITE_MOVIES_URL}/discover/${type}?api_key=${
    import.meta.env.VITE_MOVIES_API_KEY
  }&page=${page}&with_genres=${genreURL}`;
  const { data } = await axios.get(url);
  return data;
}

async function getMediaById({ type = "movie", id }) {
  const { data } = await axios.get(
    `${import.meta.env.VITE_MOVIES_URL}/${type}/${id}?api_key=${
      import.meta.env.VITE_MOVIES_API_KEY
    }`
  );
  return data;
}

async function getTrailers({ id, type = "movie" }) {
  const { data } = await axios.get(
    `${import.meta.env.VITE_MOVIES_URL}/${type}/${id}/videos?api_key=${
      import.meta.env.VITE_MOVIES_API_KEY
    }`
  );
  return data;
}

async function getShows({ page = 1 }) {
  const { data } = await axios.get(
    `${import.meta.env.VITE_MOVIES_URL}/trending/tv/day?api_key=${
      import.meta.env.VITE_MOVIES_API_KEY
    }&page=${page}`
  );
  return data;
}

async function getGenres({ type = "movie" }) {
  const { data } = await axios.get(
    `${import.meta.env.VITE_MOVIES_URL}/genre/${type}/list?api_key=${
      import.meta.env.VITE_MOVIES_API_KEY
    }`
  );
  return data;
}

function emptyMovie() {
  return {
    id: "",
    media_type: "",
    title: "",
    release_date: "",
    poster_path: "",
    backdrop_path: "",
    overview: "",
    name: "",
  };
}

function initialMoviesState() {
  return {
    movies: [
      emptyMovie(),
      emptyMovie(),
      emptyMovie(),
      emptyMovie(),
      emptyMovie(),
      emptyMovie(),
      emptyMovie(),
      emptyMovie(),
      emptyMovie(),
      emptyMovie(),
      emptyMovie(),
    ],
    page: 1,
    total_pages: 1,
    total_results: 0,
  };
}

export default function useMovies() {
  return {
    getTrending,
    getMovies,
    getShows,
    initialMoviesState,
    getGenres,
    getMediaById,
    getTrailers,
  };
}
