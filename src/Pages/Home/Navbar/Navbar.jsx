import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";
import UseAuth from "../../../Hooks/UseAuth";
import UseAdmin from "../../../Hooks/UseAdmin";

const Navbar = () => {
  const { user ,logOutUser} = UseAuth();
  const [isAdmin]=UseAdmin()
  return (
    <div>
      <div className="dark:bg-slate-300 dark:text-black navbar  sticky">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#08B3AB] rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to={"/tour"}>Tour</Link>
              </li>
            </ul>
          </div>
          <img className="w-32 h-20" src={logo} alt="" />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to={"/tour"}>Tour</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end ">
          {user ? (
            <>
              <div className="dropdown dropdown-end ">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user?.photoURL}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content  rounded-box w-52 bg-white "
                >
                  <li className="hover:bg-[#08B3AB] rounded-md hover:text-white">
                    <a className="">{user?.displayName}</a>
                  </li>
                  {isAdmin ? (
                    <li className="hover:bg-[#08B3AB] rounded-md hover:text-white">
                      <Link to="/dashboard/adminHome">Dashboard</Link>
                    </li>
                  ) : (
                    <li className="hover:bg-[#08B3AB] rounded-md hover:text-white">
                      <Link to="/dashboard/userHome">Dashboard</Link>
                    </li>
                  )}
                  <li className="hover:bg-[#08B3AB] rounded-md hover:text-white">
                    <a onClick={logOutUser}>Logout </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn bg-[#08B3AB] text-white">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
