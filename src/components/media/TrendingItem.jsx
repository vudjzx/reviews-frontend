import React from "react";
import { img_500, unavailable } from "../../config/config";
import { Link } from "react-router-dom";
function TrendingItem(props) {
  const { title, mediaType, releaseDate, poster, id } = props;
  const reviewType = mediaType === "Movie" ? "movie" : "tv";
  return (
    <div className="p-4 flex justify-center items-center flex-col">
      <Link
        to={`/review/${reviewType}/${id}`}
        className="bg-slate-800 rounded-lg overflow-hidden cursor-pointer shadow-lg shadow-slate-900 hover:bg-indigo-600 group transition-colors"
      >
        <div className="rounded-lg overflow-hidden mx-2 mt-2 h-96">
          <img
            src={poster ? `${img_500}${poster}` : unavailable}
            alt={title}
            className="relative w-full h-full object-cover"
          />
        </div>

        <div className="py-4 w-full">
          <h3 className="text-center text-ellipsis overflow-hidden pb-4 px-4 font-normal">{`${title}`}</h3>
          <div className="flex justify-between px-4 font-thin group-hover:font-light transition-transform ease-in duration-200">
            <p>{mediaType}</p>
            <p>{releaseDate}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TrendingItem;
