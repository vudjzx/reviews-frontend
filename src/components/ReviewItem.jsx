import React from "react";

function ReviewItem({
  author,
  content,
  score,
  mediaUrl,
  dateCreated,
  coverUrl,
  mediaType,
  mediaTitle,
}) {
  const typeOfMedia = mediaType === "movie" ? "Movie" : "TV Show";
  return (
    <div className="my-4 grid grid-cols-5 gap-4 h-1/2 bg-slate-900 p-3 rounded-2xl">
      <div className="w-full h-full bg-green-500 rounded-2xl overflow-hidden col-span-5 sm:col-span-2 lg:col-span-1">
        <img
          src={mediaUrl}
          alt={content}
          className="relative h-full w-full hidden sm:block"
        />
        <img
          src={coverUrl}
          alt={content}
          className="relative h-full w-full sm:hidden"
        />
      </div>
      <div className="flex flex-col justify-between col-span-5 sm:col-span-3 lg:col-span-4">
        <div className="flex flex-col">
          <div className="flex justify-between flex-col items-center sm:items-start">
            <h2>
              Title: <span className="font-normal">{mediaTitle}</span>
            </h2>
            <h3>
              Review by: <span className="font-normal">{author}</span>
            </h3>
            <h3>
              Score: <span className="font-normal">{score}/10</span>
            </h3>
          </div>
          <h3 className="pt-4 mb-6 text-ellipsis overflow-y-scroll font-normal sm:max-h-[75%]">
            {content}
          </h3>
        </div>
        <div className="flex justify-between">
          <p className="text-2xl font-thin">{dateCreated}</p>
          <p className="text-2xl font-thin">{typeOfMedia}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewItem;
