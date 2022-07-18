import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { gql, useQuery } from "@apollo/client";
import LoadingComponent from "../components/LoadingComponent";
import ReviewItem from "../components/ReviewItem";
import { Link, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import ZeroReviewsComponent from "../components/ZeroReviewsComponent";

export const GET_USER_REVIEWS = gql`
  query GetReviews($mediaType: String!) {
    userReviews(mediaType: $mediaType) {
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

const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: String!) {
    publicUserProfile(userId: $userId) {
      name
      avatar
      description
      _id
      email
    }
  }
`;

export const GET_PUBLIC_REVIEWS = gql`
  query GetPublicReviews($mediaType: String!, $userId: String!) {
    publicUserReviews(mediaType: $mediaType, userId: $userId) {
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
      _id
    }
  }
`;

function Profile() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const { loading, data } = useQuery(GET_PUBLIC_REVIEWS, {
    variables: {
      mediaType: activeTab === 0 ? "movie" : "tv",
      userId: id ?? user?._id,
    },
  });

  const { data: userData, loading: userLoading } = useQuery(GET_USER_PROFILE, {
    variables: { userId: id ?? user?._id },
  });

  const isMyProfile = user?._id === userData?.publicUserProfile?._id;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [userData?.publicUserProfile]);
  if (userLoading) {
    return (
      <div className="h-full w-full mt-16">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="w-full h-screen pt-28">
      <div className="w-full px-6 flex flex-col sm:flex-row">
        <div className="w-36 h-36 rounded-full bg-gray-200 mr-5 self-center sm:self-start">
          <img
            src={userData?.publicUserProfile.avatar}
            alt={userData?.publicUserProfile.name}
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="flex justify-between flex-1">
          <div className="">
            <h2 className="pb-2">{userData?.publicUserProfile.name}</h2>
            <h3>
              Email: <span>{userData?.publicUserProfile.email}</span>
            </h3>
            <h3 className="text-slate-500">
              <span>{userData?.publicUserProfile.description}</span>
            </h3>
          </div>
          <div>
            {isMyProfile && (
              <Link
                to="/profile/edit"
                className="bg-amber-500 mr-5 px-3 py-2 rounded-lg shadow-lg shadow-slate-900"
              >
                Edit profile
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-full">
        <h2 className="px-6 pb-2 mt-2">
          {isMyProfile
            ? "My reviews"
            : `${userData?.publicUserProfile.name}'s reviews`}
        </h2>
        <Tabs
          tabs={["Movies", "Tv Shows"]}
          activeTab={activeTab}
          setTab={setActiveTab}
          tabStyles="w-full p-4"
        />
        <div className="px-6">
          <ViewSelector
            loading={loading}
            data={data}
            isMyProfile={isMyProfile}
          />
        </div>
      </div>
    </div>
  );
}

function ViewSelector({ data, loading, isMyProfile }) {
  if (loading) {
    return (
      <div className="h-full w-full mt-16">
        <LoadingComponent />
      </div>
    );
  }

  if (data && data.publicUserReviews.length === 0) {
    return (
      <div className="text-center mt-20">
        <ZeroReviewsComponent message={"No reviews yet"} />
      </div>
    );
  }

  if (data) {
    return data?.publicUserReviews?.map((review, index) => {
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
          isMyReview={isMyProfile}
          reviewId={review._id}
        />
      );
    });
  }
}

export function Tabs({ tabs, activeTab, setTab, tabStyles }) {
  return (
    <div className={`${tabStyles} flex justify-between`}>
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`${
            activeTab === index
              ? "font-bold border-white bg-indigo-500 shadow-md shadow-slate-900"
              : "hover:bg-indigo-500 hover:text-white bg-indigo-200 text-slate-500"
          } p-2 cursor-pointer w-full flex items-center justify-center transition-colors duration-200 mx-2 rounded-lg`}
          onClick={() => setTab(index)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}

export default Profile;
