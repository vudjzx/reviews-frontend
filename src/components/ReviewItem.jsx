import React from "react";
import { Link } from "react-router-dom";

function ReviewItem({
  author,
  content,
  score,
  mediaUrl,
  dateCreated,
  coverUrl,
  mediaType,
  mediaTitle,
  mediaId,
  isMyReview,
  reviewId,
}) {
  const typeOfMedia = mediaType === "movie" ? "Movie" : "TV Show";
  return (
    <div className="my-4 flex flex-col sm:flex-row bg-slate-900 p-2 rounded-2xl sm:h-[300px] w-full">
      <Link
        to={`/review/${mediaType}/${mediaId}`}
        className="rounded-2xl overflow-hidden mr-2 sm:w-64 sm:h-full w-full h-full hover:scale-105 transition-transform duration-500"
      >
        <img
          src={mediaUrl}
          alt={content}
          className="relative hidden sm:block w-full h-full object-cover"
        />
        <img
          src={coverUrl}
          alt={content}
          className="relative h-full w-full sm:hidden object-cover hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="flex flex-col justify-between w-full h-full p-3 sm:p-0 sm:pl-3">
        <div className="flex flex-col w-full overflow-hidden">
          <div className="flex justify-between flex-col w-full">
            <div className="flex justify-between items-center">
              <h2>
                <span className="font-normal">{mediaTitle}</span>
              </h2>
              {isMyReview && (
                <Link
                  to={`/review/edit/${reviewId}`}
                  className="bg-amber-500 px-3 py-2 mt-2 mr-2 rounded-lg hover:scale-110 transition-transform duration-500"
                >
                  Edit review
                </Link>
              )}
            </div>
            <h3>
              By: <span className="font-normal">{author?.name}</span>
            </h3>
            <h3>
              Score: <span className="font-normal">{score}/10</span>
            </h3>
          </div>
          <h3 className="mt-4 text-ellipsis overflow-y-scroll font-normal sm:max-h-[70%]">
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
