import React from "react";

export default function MovieInfo({ className, media, trailer }) {
  return (
    <div
      className={`flex flex-col col-span-2 lg:col-span-3 justify-between ${
        className ?? ""
      }`}
    >
      <div className="max-h-[87%] overflow-y-scroll shadow-inner shadow-black/80 p-2 rounded-lg">
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
          <button className="my-2 shadow-lg shadow-slate-900 py-2 px-3 mr-3 bg-indigo-600 rounded-lg font-bold hover:bg-indigo-800 transition-colors">
            <a
              target="blank"
              href={`https://www.youtube.com/watch?v=${trailer}`}
            >
              View trailer
            </a>
          </button>
        )}
        <button className="my-2 shadow-lg shadow-slate-900 py-2 px-3 mr-3 bg-indigo-600 rounded-lg font-bold hover:bg-indigo-800 transition-colors">
          <a href={`${media.homepage}`} target="_blank">
            Official site
          </a>
        </button>
      </div>
    </div>
  );
}
