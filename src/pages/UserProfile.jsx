import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: String!) {
    publicUserProfile(userId: $userId) {
      name
      avatar
      description
      _id
    }
  }
`;

const GET_PUBLIC_REVIEWS = gql`
  query GetPublicReviews($mediaType: String!, $userId: String!) {
    publicUserReviews(mediaType: $mediaType, userId: $userId) {
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

function UserProfile() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { userId: id },
  });
  const { data: reviewsData } = useQuery(GET_PUBLIC_REVIEWS, {
    variables: { mediaType: "movie", userId: id },
  });

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <h1>{id}</h1>
    </div>
  );
}

export default UserProfile;
