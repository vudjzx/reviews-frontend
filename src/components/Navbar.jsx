import React from "react";
import { AiOutlineClose, AiOutlineMenu, AiOutlineMail } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const location = useLocation();
  const path = location.pathname;

  const isCurrentRoute = (route) => {
    return path === route ? "text-yellow-500" : "";
  };

  return (
    <div
      className={
        "transition-colors duration-200 fixed w-full h-20 shadow-lg shadow-slate-900 z-[100] bg-slate-800"
      }
    >
      <div className="flex justify-between items-center w-full h-full px-2 2xl:px-16 tracking-widest font-light">
        <Link to="/">
          <p className="text-xl cursor-pointer px-2">ReviewHub</p>
        </Link>
        <div className="hidden md:flex md:justify-end ">
          <Link to="/">
            <p className={`px-6 cursor-pointer text-xl ${isCurrentRoute("/")}`}>
              Trending
            </p>
          </Link>
          <Link to="/movies">
            <p
              className={`px-6 cursor-pointer text-xl ${isCurrentRoute(
                "/movies"
              )}`}
            >
              Movies
            </p>
          </Link>
          <Link to="/tv-shows">
            <p
              className={`px-6 cursor-pointer text-xl ${isCurrentRoute(
                "/tv-shows"
              )}`}
            >
              Tv Shows
            </p>
          </Link>
          <Link to="/reviews">
            <p
              className={`px-6 cursor-pointer text-xl ${isCurrentRoute(
                "/reviews"
              )}`}
            >
              Reviews
            </p>
          </Link>
        </div>
        <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <AiOutlineMenu className="text-xl cursor-pointer" size={30} />
        </div>
      </div>

      <div
        className={
          menuOpen
            ? `md:hidden fixed top-0 left-0 h-screen w-full bg-black/70`
            : ""
        }
      >
        <div
          className={
            menuOpen
              ? " fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-slate-800 p-10 ease-in duration-500 font-light tracking-widest"
              : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
          }
        >
          <div className="">
            <div className="flex w-full items-center justify-between">
              <p className="text-2xl cursor-pointer transition-colors px-2">
                Menu
              </p>
              <div
                onClick={() => setMenuOpen(!menuOpen)}
                className="rounded-full bg-slate-50 shadow-lg shadow-slate-900 p-3 cursor-pointer"
              >
                <AiOutlineClose size={20} className="text-slate-800" />
              </div>
            </div>

            <div className="border-b border-gray-300 my-4"></div>
            <div className="flex flex-col">
              <ul>
                <div onClick={() => setMenuOpen(!menuOpen)}>
                  <Link to="/">
                    <li
                      className={`px-2 py-4 cursor-pointer transition-colors text-xl ${isCurrentRoute(
                        "/"
                      )}`}
                    >
                      Trending
                    </li>
                  </Link>
                </div>
                <div onClick={() => setMenuOpen(!menuOpen)}>
                  <Link to="/movies">
                    <li
                      className={`px-2 py-4 cursor-pointer transition-colors text-xl ${isCurrentRoute(
                        "/movies"
                      )}`}
                    >
                      Movies
                    </li>
                  </Link>
                </div>
                <div onClick={() => setMenuOpen(!menuOpen)}>
                  <Link to="tv-shows">
                    <li
                      className={`px-2 py-4 cursor-pointer transition-colors text-xl ${isCurrentRoute(
                        "/tv-shows"
                      )}`}
                    >
                      Tv Shows
                    </li>
                  </Link>
                </div>
                <div onClick={() => setMenuOpen(!menuOpen)}>
                  <Link to="reviews">
                    <li
                      className={`px-2 py-4 cursor-pointer transition-colors text-xl ${isCurrentRoute(
                        "/reviews"
                      )}`}
                    >
                      Reviews
                    </li>
                  </Link>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
