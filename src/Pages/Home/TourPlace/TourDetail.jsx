import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";

const TourDetail = () => {
  const { id } = useParams();
  const [tours, setTours] = useState(null);
  const data = useLoaderData();

  console.log("Loader Data:", data);

  useEffect(() => {
    if (data) {
      const findData = data?.find((tour) => tour.id == id);
      setTours(findData);
    }
  }, [id, data]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
        <div className="flex flex-col lg:flex-row-reverse gap-8">
          <img
            src={tours?.img}
            alt={tours?.placeName || "Tour Image"}
            className="max-w-md rounded-lg shadow-lg object-cover"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800">
              {tours?.placeName}
            </h1>
            <p className="text-xl font-medium text-gray-600">
              Location: {tours?.location}
            </p>
            <p className="py-4 text-gray-600 leading-relaxed">
              Rating: {tours?.rating} ⭐
            </p>
            <button className="btn btn-primary px-6 py-3 font-semibold rounded-md shadow-lg hover:bg-blue-700">
              Add to Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
