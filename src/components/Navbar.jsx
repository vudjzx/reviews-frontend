import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div
      className={
        "transition-colors duration-200 fixed w-full h-20 shadow-lg shadow-slate-900 z-[100] bg-slate-800"
      }
    >
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16 tracking-widest font-light">
        <Link to="/">
          <p className="text-xl cursor-pointer px-2">
            {user ? `Hello, ${user?.name}` : "Reviewhub"}
          </p>
        </Link>
        <div className="hidden md:flex md:justify-end ">
          {user ? <LogoutButton logout={logout} /> : <LoginSignup />}
        </div>
      </div>
    </div>
  );
}

function LoginSignup() {
  return (
    <>
      <Link to="/login">
        <p className={`px-6 cursor-pointer text-xl`}>Login</p>
      </Link>
      <Link to="/sign-up">
        <p className={`px-6 cursor-pointer text-xl`}>Sign up</p>
      </Link>
    </>
  );
}

function LogoutButton({ logout }) {
  return (
    <>
      <Link to="/login" onClick={logout}>
        <p className={`px-6 cursor-pointer text-xl`}>Logout</p>
      </Link>
    </>
  );
}

export default Navbar;
