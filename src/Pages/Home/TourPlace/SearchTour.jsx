import React from "react";
import { useLocation } from "react-router-dom";
import TourPlaces from "./TourPlaces";

const SearchTour = () => {
  const location = useLocation();
  const { filterData = [], query = "" } = location.state || {};

  return (
    <div>
      <div className="">
        <div
          className="hero h-60"
          style={{
            backgroundImage:
              "url(https://alternativetoursindia.com/wp-content/uploads/2018/10/best-family-tour-in-odisha.jpg)",
          }}
        >
          <div className=" bg-opacity-60"></div>
          <div className=" text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold text-white">
                All Search Results
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {filterData?.map((tour) => (
          <TourPlaces key={tour.id} tour={tour}></TourPlaces>
        ))}
      </div>
    </div>
  );
};

export default SearchTour;
