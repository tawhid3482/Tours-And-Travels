import { Outlet } from "react-router-dom";
import Navber from "../Pages/Home/Navbar/Navbar";
import Navbar from "../Pages/Home/Navbar/Navbar";

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;