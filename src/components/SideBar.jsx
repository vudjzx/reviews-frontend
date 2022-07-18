import { FaFire, FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { MdMovie } from "react-icons/md";
import { IoTvSharp } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const SideBar = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const path = location.pathname;
  const isCurrentRoute = (route) => {
    return path === route;
  };

  const isMediaRoute = (route) => {
    return path.includes(route);
  };

  return (
    <div
      className="fixed top-0 left-0 h-screen w-16 flex flex-col
                  bg-white dark:bg-gray-900 shadow-lg pt-24 z-50"
    >
      <SideBarIcon
        route="/"
        active={isCurrentRoute("/")}
        icon={<FaFire size="28" />}
        text="Trending 🔥"
      />
      <SideBarIcon
        route="/movies"
        active={isMediaRoute("movie")}
        icon={<MdMovie size="28" />}
        text="Movies 🎬"
      />
      <SideBarIcon
        route="/tv-shows"
        active={isMediaRoute("tv")}
        icon={<IoTvSharp size="28" />}
        text="Tv Shows 📺"
      />
      <SideBarIcon
        route="/reviews"
        active={isCurrentRoute("/reviews")}
        icon={<CgNotes size="28" />}
        text="Reviews 📝"
      />
      {user && (
        <SideBarIcon
          route="/profile"
          active={
            isCurrentRoute("/profile") ||
            isCurrentRoute("/login") ||
            isCurrentRoute("/sign-up") ||
            isMediaRoute("profile")
          }
          icon={<FaUserCircle size="28" />}
          text="Profile"
        />
      )}
    </div>
  );
};

const SideBarIcon = ({ icon, text = "tooltip 💡", active = false, route }) => {
  const bgColor = active ? "bg-indigo-600 text-white" : "";
  return (
    <Link to={route}>
      <div className={`${bgColor} sidebar-icon group`}>
        {icon}
        <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
      </div>
    </Link>
  );
};

const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;
