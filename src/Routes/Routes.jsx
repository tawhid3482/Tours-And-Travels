import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Tour from "../Pages/Home/TourPlace/Tour";
import About from "../Pages/About/About";
import TourDetail from "../Pages/Home/TourPlace/TourDetail";
import AllTourPlace from "../Pages/Home/TourPlace/AllTourPlace";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Login/SignUp";
import SearchTour from "../Pages/Home/TourPlace/SearchTour";
import ErrorPage from "../Shared/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import UserHome from "../Pages/Dashboard/UserComponents/UserHome";
import PaymentHistory from "../Pages/Dashboard/UserComponents/PaymentHistory";
import AdminHome from "../Pages/Dashboard/AdminComponents/AdminHome";
import AdminRoute from "./AdminRoute";
import AllUser from "../Pages/Dashboard/AdminComponents/AllUser";
import AddPlace from "../Pages/Dashboard/AdminComponents/AddPlace";
import ManagePlace from "../Pages/Dashboard/AdminComponents/ManagePlace";
import UpdatePlace from "../Pages/Dashboard/AdminComponents/UpdatePlace";
import AllReservation from "../Pages/Dashboard/AdminComponents/AllReservation";
import YourReservation from "../Pages/Dashboard/UserComponents/yourReservation";
import Payment from "../Pages/Dashboard/UserComponents/Payment/Payment";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/tour",
        element: <AllTourPlace></AllTourPlace>,
      },
      {
        path: "/details/:id",
        element: <TourDetail></TourDetail>,
        loader: () => fetch("http://localhost:5000/place"),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/search",
        element: <SearchTour></SearchTour>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "home",
        element: <UserHome></UserHome>,
      },
      {
        path: "yourReservation",
        element: <YourReservation></YourReservation>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },

      // admin routes
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUser></AllUser>
          </AdminRoute>
        ),
      },
      {
        path: "addPlace",
        element: (
          <AdminRoute>
            <AddPlace></AddPlace>
          </AdminRoute>
        ),
      },
      {
        path: "managePlace",
        element: (
          <AdminRoute>
            <ManagePlace></ManagePlace>
          </AdminRoute>
        ),
      },
      {
        path: "updatePlace/:id",
        element: (
          <AdminRoute>
            <UpdatePlace></UpdatePlace>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/place/${params.id}`),
      },
      {
        path: "allReservation",
        element: (
          <AdminRoute>
            <AllReservation></AllReservation>
          </AdminRoute>
        ),
      },
    ],
  },
]);
