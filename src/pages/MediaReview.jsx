import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";
import useMovies from "../hooks/useMovies";
import {
  img_300,
  img_500,
  unavailable,
  unavailableLandscape,
} from "../config/config";
import ReviewForm from "../components/ReviewForm";

function MediaReview() {
  const { id, type } = useParams();
  const { getMediaById, getTrailers } = useMovies();
  const [media, setMedia] = useState();
  const [trailer, setTrailer] = useState("");

  const getData = async () => {
    try {
      const data = await getMediaById({ id, type });
      setMedia(data);
    } catch (error) {
      setMedia({ error: true });
    }
  };

  const getMediaTrailers = async () => {
    try {
      const data = await getTrailers({ id, type });
      setTrailer(data.results[data.results.length - 1].key);
    } catch (error) {
      setTrailer("");
    }
  };

  useEffect(() => {
    getData();
    getMediaTrailers();
  }, []);

  function MovieInfo({ className }) {
    return (
      <div
        className={`flex flex-col col-span-2 lg:col-span-3 justify-between ${
          className ?? ""
        }`}
      >
        <div>
          <h2>{media.title || media.name}</h2>
          <h3 className="py-2 font-normal">{media.overview}</h3>
          <h3>
            Genres:{" "}
            <span className="font-normal">
              {media.genres.map((genre) => genre.name).join(", ")}
            </span>
          </h3>
          <h3>
            First Air Date:{" "}
            <span className="font-normal">
              {media.first_air_date || media.release_date}
            </span>
          </h3>
          <h3>
            Languages:{" "}
            <span className="font-normal">
              {media.spoken_languages.map((lang) => lang.name).join(", ")}
            </span>
          </h3>
          <h3 className="">
            Vote average:{" "}
            <span className="font-normal">{media.vote_average}/10</span>
          </h3>
          <h3 className="text-slate-400 py-2">
            Produced by:{" "}
            <span className="font-normal">
              {media.production_companies.map((e) => e.name).join(", ")}
            </span>
          </h3>
        </div>
        <div className="w-full my-2">
          {trailer !== "" && (
            <button className="shadow-lg shadow-slate-900 py-2 px-3 mr-3 bg-yellow-600 rounded-lg font-bold hover:bg-yellow-500 transition-colors">
              <a
                target="blank"
                href={`https://www.youtube.com/watch?v=${trailer}`}
              >
                View trailer
              </a>
            </button>
          )}
          <button className="shadow-lg shadow-slate-900 py-2 px-3 mr-3 bg-yellow-600 rounded-lg font-bold hover:bg-yellow-500 transition-colors">
            <a href={`${media.homepage}`} target="_blank">
              Official site
            </a>
          </button>
        </div>
      </div>
    );
  }

  function MoviePoster({ className }) {
    return (
      <img
        className="rounded-2xl overflow-hidden col-span-2 lg:col-span-1 w-full h-full relative"
        src={
          media.poster_path ? `${img_500}/${media.poster_path}` : unavailable
        }
        alt={media.name || media.title}
      />
    );
  }

  function LandscapePoster() {
    return (
      <img
        className="w-full sm:hidden rounded-2xl overflow-hidden mb-4"
        src={
          media.backdrop_path
            ? `${img_500}/${media.backdrop_path}`
            : unavailableLandscape
        }
        alt={media.name || media.title}
      />
    );
  }

  if (!media)
    return (
      <div className="w-full h-screen">
        <LoadingComponent />
      </div>
    );
  if (media.error) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <h2>404 Media not found</h2>
      </div>
    );
  }
  return (
    <div className="h-screen w-full pt-24 px-4">
      <div className="hidden sm:flex">
        <div className="w-72 h-96">
          <MoviePoster />
        </div>
        <MovieInfo className="w-full pl-3" />
      </div>
      <LandscapePoster />
      <MovieInfo className="sm:hidden" />
      <ReviewForm
        mediaId={id}
        mediaType={type}
        mediaUrl={`${img_300}/${media.poster_path}`}
        coverUrl={`${img_500}/${media.backdrop_path}`}
        mediaTitle={media.title || media.name}
      />
    </div>
  );
}

export default MediaReview;
