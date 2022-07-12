import React, { useState } from "react";
import CustomListBox from "./CustomListBox";
import { gql, useMutation } from "@apollo/client";
import LoadingComponent from "./LoadingComponent";
import CustomAlert from "./CustomAlert";
import { GET_REVIEWS } from "../pages/Reviews";

const CREATE_REVIEW = gql`
  mutation CreateReview(
    $author: String!
    $content: String!
    $score: String!
    $mediaId: String!
    $mediaType: String!
    $mediaUrl: String!
    $coverUrl: String!
    $mediaTitle: String!
  ) {
    createReview(
      author: $author
      content: $content
      score: $score
      mediaId: $mediaId
      mediaType: $mediaType
      mediaUrl: $mediaUrl
      coverUrl: $coverUrl
      mediaTitle: $mediaTitle
    ) {
      author
      content
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
  const [formData, setFormData] = useState({
    author: "",
    content: "",
    score: "1",
    mediaId,
    mediaType,
    mediaUrl,
    coverUrl,
    mediaTitle,
  });
  const [createReview, { data, loading, error }] = useMutation(CREATE_REVIEW, {
    refetchQueries: [{ query: GET_REVIEWS }],
  });
  const [alert, setAlert] = useState({
    message: "",
    error: false,
  });

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
    const author = formData.author !== "" ? formData.author : "Anonymous";
    const dataReview = await createReview({
      variables: {
        author: author,
        content: formData.content,
        score: formData.score,
        mediaId: formData.mediaId,
        mediaType: formData.mediaType,
        mediaUrl: formData.mediaUrl,
        coverUrl: formData.coverUrl,
        mediaTitle: formData.mediaTitle,
      },
    });
    if (dataReview.data.createReview) {
      setAlert({
        message: "Review submitted successfully",
        error: false,
      });
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
      <form className="pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-lg font-bold mb-2" htmlFor="name">
            {`Your name (optional)`}
          </label>
          <input
            className="rounded-lg shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="John Doe"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
          />
        </div>
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
            className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg transition-colors w-full"
            type="submit"
            onClick={handleSubmit}
          >
            Submit review
          </button>
        </div>
      </form>
    </div>
  );
}
