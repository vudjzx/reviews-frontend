import React, { useState, useContext, useEffect } from "react";
import CustomListBox from "./CustomListBox";
import { gql, useMutation } from "@apollo/client";
import LoadingComponent from "./LoadingComponent";
import CustomAlert from "./CustomAlert";
import { GET_REVIEWS } from "../pages/Reviews";
import { AuthContext } from "../context/AuthProvider";
import { GET_MEDIA_REVIEWS } from "../pages/MediaReview";
import { GET_PUBLIC_REVIEWS } from "../pages/Profile";
import { Link } from "react-router-dom";

const CREATE_REVIEW = gql`
  mutation CreateReview($reviewInput: ReviewInput!) {
    createReview(reviewInput: $reviewInput) {
      content
      mediaId
      mediaTitle
      author {
        name
        _id
      }
    }
  }
`;

export default function ReviewForm({
  mediaId,
  mediaType,
  mediaUrl,
  coverUrl,
  mediaTitle,
}) {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    author: user?._id,
    content: "",
    score: "10",
    mediaId,
    mediaType,
    mediaUrl,
    coverUrl,
    mediaTitle,
  });
  const [createReview, { data, loading, error }] = useMutation(CREATE_REVIEW, {
    refetchQueries: [
      { query: GET_REVIEWS, variables: { mediaId, mediaType } },
      { query: GET_MEDIA_REVIEWS, variables: { mediaId } },
      {
        query: GET_PUBLIC_REVIEWS,
        variables: {
          userId: formData.author,
          mediaType: formData.mediaType,
        },
      },
    ],
  });
  const [alert, setAlert] = useState({
    message: "",
    error: false,
  });
  const [pristineForm, setPristineForm] = useState(true);
  const setScore = (score) => {
    setFormData({ ...formData, score: score.name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([formData.content, formData.score].includes("")) {
      setAlert({
        message: "Please fill in all fields",
        error: true,
      });
      return;
    }

    const dataReview = await createReview({
      variables: {
        reviewInput: {
          ...formData,
        },
      },
    });
    if (dataReview.data.createReview) {
      setAlert({
        message: "Review submitted successfully",
        error: false,
      });
      setPristineForm(false);
      window.scrollTo(0, 0);
    }
    setFormData({
      ...formData,
      author: "",
      content: "",
      score: "1",
    });
  };

  if (loading)
    return (
      <div className="w-full h-screen">
        <LoadingComponent />
      </div>
    );

  if (error) return `Submission error! ${error.message}`;

  return (
    <div className="pt-6 pb-32">
      <h2 className="py-4">Write a review</h2>
      {alert.message !== "" && (
        <CustomAlert message={alert.message} error={alert.error} />
      )}
      <FormViewSelector
        formData={formData}
        setFormData={setFormData}
        pristineForm={pristineForm}
        user={user}
        setScore={setScore}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

function FormViewSelector({
  formData,
  setFormData,
  pristineForm,
  user,
  setScore,
  handleSubmit,
}) {
  if (!user) {
    return (
      <div className="text-center py-16">
        <Link to="/login" className="text-2xl">
          <span className="text-indigo-500">Login</span> to write a review
        </Link>
      </div>
    );
  }

  if (!pristineForm) return null;

  return (
    <form className="pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-lg font-bold mb-2" htmlFor="review">
          {`Your review *`}
        </label>
        <textarea
          className="shadow appearance-none border rounded-lg w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
          id="review"
          type="text"
          placeholder="This was a great movie..."
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
        />
      </div>
      <p className="block text-lg font-bold mb-2">{`Score *`}</p>
      <CustomListBox score={formData.score} setScore={setScore} />
      <div className="w-full py-4">
        <button
          className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-lg transition-colors w-full"
          type="submit"
          onClick={handleSubmit}
        >
          Submit review
        </button>
      </div>
    </form>
  );
}
