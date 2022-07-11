import React from "react";
import { img_300, unavailable } from "../config/config";
import { Link } from "react-router-dom";
function TrendingItem(props) {
  const { title, mediaType, releaseDate, poster, id } = props;
  const reviewType = mediaType === "Movie" ? "movie" : "tv";
  return (
    <div className="p-4 flex justify-center items-center flex-col">
      <Link
        to={`/review/${reviewType}/${id}`}
        className="bg-slate-800 rounded-lg overflow-hidden max-w-[300px] cursor-pointer shadow-lg shadow-slate-900 hover:bg-yellow-500 hover:text-slate-800 group transition-colors"
      >
        <div className="rounded-lg overflow-hidden mx-2 mt-2">
          <img src={poster ? `${img_300}${poster}` : unavailable} alt={title} />
        </div>

        <div className="py-4">
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
