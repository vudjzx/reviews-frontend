import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import PaginationComponent from "../components/PaginationComponent";

const MainLayout = () => {
  return (
    <main className="">
      <div className="">
        <Navbar />
        <Outlet />
      </div>
    </main>
  );
};

export default MainLayout;
