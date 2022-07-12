import React from "react";
import { gql, useQuery } from "@apollo/client";
import LoadingComponent from "../components/LoadingComponent";
import ReviewItem from "../components/ReviewItem";

export const GET_REVIEWS = gql`
  query GetReviews {
    reviews {
      content
      author
      mediaUrl
      createdAt
      mediaType
      score
      coverUrl
      mediaTitle
    }
  }
`;
function Reviews() {
  const { loading, error, data } = useQuery(GET_REVIEWS);
  if (loading)
    return (
      <div className="w-full h-screen">
        <LoadingComponent />
      </div>
    );

  return (
    <div className="pt-24 px-4">
      <h1>Current reviews</h1>
      {data &&
        data.reviews.map((review, index) => {
          const date = new Date(parseInt(review.createdAt));

          return (
            <ReviewItem
              author={review.author}
              content={review.content}
              mediaUrl={review.mediaUrl}
              dateCreated={date.toDateString()}
              score={review.score}
              key={index.toString()}
              coverUrl={review.coverUrl}
              mediaType={review.mediaType}
              mediaTitle={review.mediaTitle}
            />
          );
        })}
    </div>
  );
}

export default Reviews;
