import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../context/AuthProvider";
import LoadingComponent from "../components/LoadingComponent";
import SideBar from "../components/SideBar";
const MainLayout = () => {
  const { loading, data } = useQuery(GET_PROFILE);

  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <main>
      <div>
        <Navbar />
        <div className="flex">
          <SideBar />
          <div className="ml-16 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
