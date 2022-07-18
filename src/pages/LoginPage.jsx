import React, { useState, useContext } from "react";
import CustomAlert from "../components/CustomAlert";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, GET_PROFILE } from "../context/AuthProvider";
import { GET_PUBLIC_REVIEWS, GET_USER_REVIEWS } from "./Profile";
const LOGIN_USER = gql`
  mutation LoginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      token
      name
      _id
      avatar
      email
      description
    }
  }
`;

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    message: "",
    error: false,
  });
  const { user } = useContext(AuthContext);

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    refetchQueries: [
      { query: GET_PROFILE },
      {
        query: GET_PUBLIC_REVIEWS,
        variables: { mediaType: "movie", userId: user?._id },
      },
    ],
    onCompleted: (data) => {
      if (data.loginUser.token) {
        localStorage.setItem("token", data.loginUser.token);
        login(data.loginUser);
        navigate("/");
      }
    },
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([formData.email, formData.password].includes("")) {
      setAlert({
        message: "Please fill in all fields",
        error: true,
      });
      return;
    }
    try {
      await loginUser({
        variables: { loginInput: { ...formData } },
      });
    } catch (error) {
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
            <p className="p-3">Signing in...</p>
          </div>
        )}
        <h2 className="text-slate-800 text-center py-5">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-bold mb-2" htmlFor="email">
              {`Email`}
            </label>
            <input
              className="rounded-lg shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Your email"
              value={formData.author}
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
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <input
            type="submit"
            value="Login"
            className="bg-indigo-600 hover:bg-indigo-800 shadow-lg hover:bg-indigp-800 text-white font-bold py-2 px-4 rounded-lg transition-colors w-full cursor-pointer mt-6"
          />
        </form>
        <Link
          to="/sign-up"
          className="font-bold py-2 mb-2 px-4 rounded-lg w-full"
        >
          <p className="cursor-pointer text-center">
            {`Don't have an account? `}

            <span className="text-blue-500">Sign up</span>
          </p>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
