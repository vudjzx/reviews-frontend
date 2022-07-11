import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MediaReview from "./pages/MediaReview";
import Movies from "./pages/Movies";
import Reviews from "./pages/Reviews";
import Trending from "./pages/Trending";
import TvShows from "./pages/TvShows";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Trending />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv-shows" element={<TvShows />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/review/:type/:id" element={<MediaReview />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
