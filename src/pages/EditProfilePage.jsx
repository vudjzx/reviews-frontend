import { useState, useContext } from "react";
import CustomAlert from "../components/CustomAlert";
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { AuthContext, GET_PROFILE } from "../context/AuthProvider";
import { GET_PUBLIC_REVIEWS } from "./Profile";
import axios from "axios";
const UPDATE_USER = gql`
  mutation CreateUser($userInput: UpdateUserInput) {
    newUserInfo(userInput: $userInput) {
      name
      _id
      avatar
      description
    }
  }
`;
function EditProfilePage() {
  const { user } = useContext(AuthContext);
  const [imageSelected, setImageSelected] = useState("");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    description: user?.description || "",
  });
  const [alert, setAlert] = useState({
    message: "",
    error: false,
  });
  const navigate = useNavigate();

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "pfvubpvk");
    return await axios
      .post("https://api.cloudinary.com/v1_1/dncdw3cq3/image/upload", formData)
      .then((res) => {
        return res.data.secure_url;
      })
      .catch((err) => {
        return "";
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageSelected !== "") {
      const newAvatarUrl = await uploadImage();
      if (newAvatarUrl === "") {
        setAlert({
          message: "Error uploading image",
          error: true,
        });
        return;
      }
      try {
        await newUserInfo({
          variables: {
            userInput: { ...formData, avatarUrl: newAvatarUrl },
          },
        });
      } catch (error) {
        setAlert({
          message: error.message,
          error: true,
        });
      }
    } else {
      try {
        await newUserInfo({
          variables: {
            userInput: formData,
          },
        });
      } catch (error) {
        setAlert({
          message: error.message,
          error: true,
        });
      }
    }
  };

  const [newUserInfo, { loading }] = useMutation(UPDATE_USER, {
    refetchQueries: [
      { query: GET_PROFILE },
      {
        query: GET_PUBLIC_REVIEWS,
        variables: { userId: user?._id, mediaType: "movie" },
      },
    ],
    onCompleted: (data) => {
      if (data.newUserInfo.name) {
        navigate("/profile");
      }
    },
  });

  return (
    <div className="h-screen w-full flex items-center pt-12 justify-center text-slate-800">
      <div className="bg-slate-50 w-full md:w-1/2 lg:w-1/3 mx-3 shadow-lg shadow-slate-900 rounded-2xl px-6">
        {!loading && alert.message !== "" ? (
          <CustomAlert message={alert.message} error={alert.error} />
        ) : null}
        {loading && (
          <div className="text-center py-4">
            <p className="p-3">Updating info...</p>
          </div>
        )}
        <h2 className="text-slate-800 text-center py-5">Edit profile</h2>
        <form className="mb-2" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-bold mb-2" htmlFor="name">
              {`Name`}
            </label>
            <input
              className="rounded-lg shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-bold mb-2" htmlFor="email">
              {`Email`}
            </label>
            <input
              className="rounded-lg shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-lg font-bold mb-2"
              htmlFor="description"
            >
              {`Your description`}
            </label>
            <textarea
              className="rounded-lg shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-20"
              id="description"
              type="text"
              placeholder="Your description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="">
            <label className="block text-lg font-bold mb-2" htmlFor="avatar">
              Avatar picture
            </label>
            <input
              id="avatar"
              type="file"
              onChange={(event) => {
                setImageSelected(event.target.files[0]);
              }}
              className="text-sm text-grey-500
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-indigo-300 file:text-indigo-800
            hover:file:cursor-pointer hover:file:bg-indigo-200
            hover:file:text-indigo-700 file:transition-colors"
              accept="image/*"
            />
          </div>
          <input
            type="submit"
            value="Save"
            className="bg-indigo-600 hover:bg-indigo-800 shadow-lg hover:bg-indigp-800 text-white font-bold py-2 px-4 rounded-lg transition-colors w-full cursor-pointer mt-6 mb-6"
          />
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;
