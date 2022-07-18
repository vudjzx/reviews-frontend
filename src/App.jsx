import { Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import MainLayout from "./layouts/MainLayout";
import EditProfilePage from "./pages/EditProfilePage";
import EditReviewPage from "./pages/EditReviewPage";
import LoginPage from "./pages/LoginPage";
import MediaReview from "./pages/MediaReview";
import Movies from "./pages/Movies";
import Profile from "./pages/Profile";
import ReviewDetails from "./pages/ReviewDetails";
import Reviews from "./pages/Reviews";
import SignUpPage from "./pages/SignUpPage";
import Trending from "./pages/Trending";
import TvShows from "./pages/TvShows";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Trending />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv-shows" element={<TvShows />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/review/edit/:id" element={<EditReviewPage />} />
            <Route path="/review/:id" element={<ReviewDetails />} />
            <Route path="/review/:type/:id" element={<MediaReview />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
