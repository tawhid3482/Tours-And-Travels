import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Tour from "../Pages/Home/TourPlace/Tour";
import About from "../Pages/About/About";
import TourDetail from "../Pages/Home/TourPlace/TourDetail";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
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
        element: <Tour></Tour>,
      },
      {
        path: "/details/:id",
        element: <TourDetail></TourDetail>,
        loader: () => fetch("place.json"),
      },
    ],
  },
]);
