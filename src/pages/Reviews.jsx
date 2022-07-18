import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import LoadingComponent from "../components/LoadingComponent";
import ReviewItem from "../components/ReviewItem";
import { Tabs } from "./Profile";
import ZeroReviewsComponent from "../components/ZeroReviewsComponent";

export const GET_REVIEWS = gql`
  query GetReviews($mediaType: String!) {
    reviews(mediaType: $mediaType) {
      content
      author {
        name
      }
      mediaUrl
      createdAt
      mediaType
      score
      coverUrl
      mediaTitle
      mediaId
    }
  }
`;
function Reviews() {
  const [activeTab, setActiveTab] = useState(0);
  const { loading, data } = useQuery(GET_REVIEWS, {
    variables: {
      mediaType: activeTab === 0 ? "movie" : "tv",
    },
  });

  return (
    <div className="pt-24 px-2">
      <h2 className="px-2 pb-4">Browse Reviews</h2>
      <Tabs
        tabs={["Movies", "Tv Shows"]}
        activeTab={activeTab}
        setTab={setActiveTab}
        tabStyles="w-full"
      />
      {!loading && data && data.reviews.length === 0 ? (
        <div className="text-center mt-20">
          <ZeroReviewsComponent message={"No reviews yet"} />
        </div>
      ) : null}
      {loading ? (
        <div className="w-full h-full mt-44">
          <LoadingComponent />
        </div>
      ) : null}
      {data &&
        data?.reviews?.map((review, index) => {
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
              mediaId={review.mediaId}
            />
          );
        })}
    </div>
  );
}

export default Reviews;
