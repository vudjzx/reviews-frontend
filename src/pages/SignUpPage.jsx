import React, { useState, useContext } from "react";
import CustomAlert from "../components/CustomAlert";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AuthContext, GET_PROFILE } from "../context/AuthProvider";
import { GET_PUBLIC_REVIEWS, GET_USER_REVIEWS } from "./Profile";
const CREATE_USER = gql`
  mutation CreateUser($userInput: UserInput) {
    createUser(userInput: $userInput) {
      token
      name
      _id
      avatar
    }
  }
`;

function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    message: "",
    error: false,
  });
  const { login, user } = useContext(AuthContext);

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    refetchQueries: [
      { query: GET_PROFILE },
      {
        query: GET_PUBLIC_REVIEWS,
        variables: { mediaType: "movie", userId: user?._id },
      },
    ],
    onCompleted: (data) => {
      if (data.createUser.token) {
        localStorage.setItem("token", data.createUser.token);
        login(data.createUser);
        navigate("/profile");
      }
    },
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([formData.email, formData.password, formData.name].includes("")) {
      setAlert({
        message: "Please fill in all fields",
        error: true,
      });
      return;
    }

    if (formData.password.length < 8) {
      setAlert({
        message: "Password must be at least 8 characters long",
        error: true,
      });
      return;
    }

    try {
      await createUser({
        variables: { userInput: { ...formData } },
      });
    } catch (error) {
      console.log(error);
      setAlert({
        message: error.message,
        error: true,
      });
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center text-slate-800">
      <div className="bg-slate-50 w-full md:w-1/2 lg:w-1/3 mx-3 shadow-lg shadow-slate-900 rounded-2xl px-6">
        {!loading && alert.message !== "" ? (
          <CustomAlert message={alert.message} error={alert.error} />
        ) : null}
        {loading && (
          <div className="text-center py-4">
            <p className="p-3">Creating user...</p>
          </div>
        )}
        <h2 className="text-slate-800 text-center py-5">Sign up</h2>
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
            <label className="block text-lg font-bold mb-2" htmlFor="password">
              {`Password`}
            </label>
            <input
              className="rounded-lg shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <input
            type="submit"
            value="Sign up"
            className="bg-indigo-600 hover:bg-indigo-800 shadow-lg hover:bg-indigp-800 text-white font-bold py-2 px-4 rounded-lg transition-colors w-full cursor-pointer mt-6 mb-6"
          />
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
