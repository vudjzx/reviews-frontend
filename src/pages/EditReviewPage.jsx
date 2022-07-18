import { useEffect, useState, useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";
import CustomListBox from "../components/CustomListBox";
import { GET_PUBLIC_REVIEWS } from "./Profile";
import ReviewItem from "../components/ReviewItem";
import DeleteReviewModal from "../components/DeleteReviewModal";
import BackButton from "../components/BackButton";
import { AuthContext } from "../context/AuthProvider";

const GET_REVIEW = gql`
  query GetReviewById($reviewId: String!) {
    review(id: $reviewId) {
      content
      score
      createdAt
      mediaTitle
      mediaType
      mediaUrl
      coverUrl
      _id
      author {
        _id
        name
      }
    }
  }
`;

const UPDATE_REVIEW = gql`
  mutation UpdateReviewInfo($reviewInput: UpdateReviewInput) {
    newReviewInfo(reviewInput: $reviewInput) {
      _id
      content
      author {
        _id
        name
      }
    }
  }
`;

function EditReviewPage() {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_REVIEW, {
    variables: { reviewId: id },
  });
  const { user } = useContext(AuthContext);

  const [newReviewInfo, { data: updatedReview, error: updateError }] =
    useMutation(UPDATE_REVIEW, {
      refetchQueries: [
        {
          query: GET_PUBLIC_REVIEWS,
          variables: { mediaType: "movie", userId: data?.review?.author?._id },
        },
      ],
    });

  const [formData, setFormData] = useState({
    content: data?.review?.content,
    score: data?.review?.score,
  });

  const [alert, setAlert] = useState({
    message: "",
    error: false,
  });

  const [deleteReviewModal, setDeleteReviewModal] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        content: data?.review?.content,
        score: data?.review?.score,
      });
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([formData.content, formData.score].includes("")) {
      setAlert({
        message: "Please fill in all fields",
        error: true,
      });
      return;
    }
    try {
      await newReviewInfo({
        variables: {
          reviewInput: {
            reviewId: id,
            content: formData.content,
            score: formData.score,
          },
        },
      });
      setAlert({
        message: "Review updated successfully",
        error: false,
      });
    } catch (error) {
      setAlert({
        message: updateError?.message,
        error: true,
      });
    }
  };

  const setScore = (score) => {
    setFormData({ ...formData, score: score.name });
  };

  const date = new Date(parseInt(data?.review?.createdAt));

  return (
    <div className="h-screen w-full flex items-center justify-center flex-col mt-40 mb-44">
      <div className="w-full ml-14">
        <BackButton navigateRoute={"/profile"} />
      </div>
      <DeleteReviewModal
        reviewId={id}
        isOpen={deleteReviewModal}
        setIsOpen={setDeleteReviewModal}
        userId={user?._id}
        setAlert={setAlert}
        mediaType={data?.review?.mediaType}
      />
      <div className="w-[95%]">
        <ReviewItem
          author={data?.review?.author}
          content={data?.review?.content}
          mediaUrl={data?.review?.mediaUrl}
          dateCreated={date.toDateString()}
          score={data?.review?.score}
          coverUrl={data?.review?.coverUrl}
          mediaType={data?.review?.mediaType}
          mediaTitle={data?.review?.mediaTitle}
          mediaId={data?.review?.mediaId}
        />
      </div>
      <div className="bg-slate-50 w-full md:w-1/2 lg:w-1/3 mx-3 shadow-lg shadow-slate-900 rounded-2xl px-6 text-slate-800">
        {!loading && alert.message !== "" ? (
          <CustomAlert message={alert.message} error={alert.error} />
        ) : null}
        {loading && (
          <div className="text-center py-4">
            <p className="p-3">Signing in...</p>
          </div>
        )}
        <h2 className="text-slate-800 text-center py-5">Edit review</h2>
        <form onSubmit={handleSubmit}>
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

          <input
            type="submit"
            value="Save"
            className="bg-indigo-600 hover:bg-indigo-800 shadow-lg hover:bg-indigp-800 text-white font-bold py-2 px-4 rounded-lg transition-colors w-full cursor-pointer mt-6 mb-3"
          />
        </form>
        <button
          onClick={() => setDeleteReviewModal(true)}
          className="bg-red-500 hover:bg-red-700 shadow-lg hover:bg-indigp-800 text-white font-bold py-2 px-4 rounded-lg transition-colors w-full cursor-pointer mb-6"
        >
          Delete review
        </button>
      </div>
    </div>
  );
}

export default EditReviewPage;
