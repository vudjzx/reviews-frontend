import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";
import useMovies from "../hooks/useMovies";
import { img_300, img_500 } from "../config/config";
import { gql, useQuery } from "@apollo/client";
import ReviewForm from "../components/ReviewForm";
import MovieInfo from "../components/media/MovieInfo";
import LandscapePoster from "../components/media/LandscapePoster";
import MoviePoster from "../components/media/MoviePoster";
import BackButton from "../components/BackButton";

export const GET_MEDIA_REVIEWS = gql`
  query GetMediaReviews($mediaId: String!) {
    mediaReviews(mediaId: $mediaId) {
      content
      author {
        name
        avatar
        _id
      }
      createdAt
      _id
      score
    }
  }
`;

function MediaReview() {
  const { id, type } = useParams();
  const { loading, error, data } = useQuery(GET_MEDIA_REVIEWS, {
    variables: { mediaId: id },
  });
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
      <BackButton />
      <div className="hidden sm:flex">
        <div className="w-72 h-96">
          <MoviePoster media={media} />
        </div>
        <MovieInfo
          className="w-full pl-3 max-h-96"
          media={media}
          trailer={trailer}
        />
      </div>
      <div className="sm:hidden pb-4">
        <LandscapePoster media={media} className="sm:hidden" />
      </div>
      <MovieInfo className="sm:hidden" media={media} trailer={trailer} />
      {loading ? (
        <div className="py-16">
          <LoadingComponent />
        </div>
      ) : (
        <div className="mt-6">
          <h2>Reviews</h2>
          <ReviewsViewSelector data={data} />
        </div>
      )}
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

function ReviewsViewSelector({ data }) {
  if (data && data?.mediaReviews?.length > 0) {
    return data?.mediaReviews?.map((review, index) => (
      <CommentReview key={index} review={review} />
    ));
  }
  return (
    <div className="flex items-center justify-center py-16">
      <h2>No reviews yet</h2>
    </div>
  );
}

function CommentReview({ review }) {
  const date = new Date(parseInt(review.createdAt)).toDateString();

  function AuthorAvatar() {
    return (
      <div className="w-12 h-12 rounded-full bg-gray-200">
        <img
          src={review.author?.avatar}
          alt={review.author?.name}
          className="w-full h-full rounded-full"
        />
      </div>
    );
  }

  function ReviewInfo() {
    return (
      <Link
        to={`/profile/${review.author?._id}`}
        className="px-4 w-full h-full overflow-hidden cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{review.author.name}</h3>
          <div className="ml-2">
            <span className="text-gray-300">{date}</span>
          </div>
        </div>
        <p className="text-slate-500 w-full overflow-hidden">
          {review.content}
        </p>
        <p>
          Score: <span className="font-light">{review.score}/10</span>
        </p>
      </Link>
    );
  }

  return (
    <div className="flex flex-col rounded-xl py-2">
      <div className="flex items-center sm:items-start w-full p-2 px-3 flex-col sm:flex-row">
        <AuthorAvatar />
        <ReviewInfo />
      </div>
    </div>
  );
}

export default MediaReview;
