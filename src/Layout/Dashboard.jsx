import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../Hooks/UseAdmin";
import { FaBook, FaHome, FaMailBulk, FaUsers } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { LiaProductHunt, LiaShoppingBagSolid } from "react-icons/lia";
import { MdOutlineHistory, MdOutlineLocalGroceryStore } from "react-icons/md";

const Dashboard = () => {
  const [isAdmin] = UseAdmin();

  const adminNav = (
    <>
      <li className="bg-[#08B3AB] rounded-lg my-2">
        <NavLink to={"/dashboard/adminHome"}>
          <FaHome className="text-xl"></FaHome>Admin Home
        </NavLink>
      </li>
      <li className="bg-[#08B3AB] rounded-lg my-2">
        <NavLink to={"/dashboard/allReservation"}>
          <CiDeliveryTruck className="text-xl"></CiDeliveryTruck>All Reservation
        </NavLink>
      </li>
      <li className="bg-[#08B3AB] rounded-lg my-2">
        <NavLink to={"/dashboard/addPlace"}>
          <LiaProductHunt className="text-xl"></LiaProductHunt>Add Place
        </NavLink>
      </li>
      <li className="bg-[#08B3AB] rounded-lg my-2">
        <NavLink to={"/dashboard/managePlace"}>
          <FaBook className="text-xl"></FaBook>Manage Place
        </NavLink>
      </li>
      <li className="bg-[#08B3AB] rounded-lg my-2">
        <NavLink to={"/dashboard/allUsers"}>
          <FaUsers className="text-xl"></FaUsers>All Users
        </NavLink>
      </li>
    </>
  );

  const navOption = (
    <>
      <li className="bg-[#08B3AB] rounded-lg my-2">
        <NavLink to={"/dashboard/home"}>
          <FaHome className="text-xl"></FaHome> Home
        </NavLink>
      </li>
      <li className="bg-[#08B3AB] rounded-lg my-2">
        <NavLink to={"/dashboard/yourBooking"}>
          <MdOutlineLocalGroceryStore className="text-xl"></MdOutlineLocalGroceryStore>{" "}
          Your Booking
        </NavLink>
      </li>
      
      <li className="bg-[#08B3AB] rounded-lg my-2">
        <NavLink to={"/dashboard/yourReservation"}>
          <MdOutlineLocalGroceryStore className="text-xl"></MdOutlineLocalGroceryStore>{" "}
          Your Reservation
        </NavLink>
      </li>

      <li className="bg-[#08B3AB] rounded-lg my-2">
        <NavLink to={"/dashboard/paymentHistory"}>
          <MdOutlineHistory className="text-xl"></MdOutlineHistory>Payment
          History
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row-reverse ">
        <div className="w-full md:w-64 bg-[#F0592A] text-white md:sticky top-0 md:h-screen">
          <ul className="menu">
            {isAdmin ? adminNav : navOption}

            <div className="divider divider-accent">OR</div>
            {/* shared navOption  */}
            <li className="bg-[#08B3AB] rounded-lg my-2">
              <NavLink to={"/"}>
                <FaHome className="text-xl"></FaHome>Main Home
              </NavLink>
            </li>
            <li className="bg-[#08B3AB] rounded-lg my-2">
              <NavLink to={"/tour"}>
                <LiaShoppingBagSolid className="text-xl"></LiaShoppingBagSolid>
                Tour
              </NavLink>
            </li>
            <li className="bg-[#08B3AB] rounded-lg my-2">
              <NavLink to={"/about"}>
                <FaMailBulk className="text-xl"></FaMailBulk>About
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex-1 p-5">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
