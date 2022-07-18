import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { gql, useMutation } from "@apollo/client";
import { GET_REVIEWS } from "../pages/Reviews";
import { GET_PUBLIC_REVIEWS } from "../pages/Profile";
import { useNavigate } from "react-router-dom";

const DELETE_REVIEW = gql`
  mutation ($reviewId: String!) {
    deleteReview(reviewId: $reviewId) {
      author {
        _id
        name
      }
      content
      mediaTitle
    }
  }
`;

export default function DeleteReviewModal({
  isOpen,
  setIsOpen,
  reviewId,
  userId,
  setAlert,
  mediaType,
}) {
  const navigate = useNavigate();
  function closeModal() {
    setIsOpen(false);
  }

  const [deleteReview, { loading, data, error }] = useMutation(DELETE_REVIEW, {
    refetchQueries: [
      {
        query: GET_PUBLIC_REVIEWS,
        variables: {
          mediaType: mediaType,
          userId: userId,
        },
      },
      {
        query: GET_REVIEWS,
        variables: {
          mediaType: mediaType,
        },
      },
    ],
  });

  const onDelete = async () => {
    try {
      const deletedReview = await deleteReview({
        variables: {
          reviewId: reviewId,
        },
      });
      if (deletedReview && deletedReview.data) {
        setAlert({
          message: "Review deleted successfully",
          error: true,
        });
        closeModal();
        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      }
    } catch (err) {
      setAlert({
        message: "Error deleting review",
        error: true,
      });
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="ml-16 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Do you want to delete this review?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Once deleted, this review will be permanently removed. If
                      you are sure you want to delete this review, click
                      "Delete".
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="mr-2 text-slate-900 px-4 py-2 text-sm rounded-lg"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onDelete}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
