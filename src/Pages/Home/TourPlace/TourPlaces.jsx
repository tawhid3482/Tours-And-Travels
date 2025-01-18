import { FaLocationPin, FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

const TourPlaces = ({ tour }) => {
  const { id, img, location, rating, placeName, price } = tour;
  return (
    <div>
      <div className="card bg-base-100 w-64 my-5 dark:bg-slate-300 dark:text-black shadow-xl">
        <figure>
          <img
            src={img}
            alt="img"
            className="transition-transform duration-300 ease-in-out  hover:scale-110 "
          />
        </figure>
        <div className="p-4">
          <div className="flex justify-between items-center ">
            <div className="flex gap-2 items-center">
              <FaLocationPin className="text-[#08B3AB]"></FaLocationPin>{" "}
              <p className="text-lg font-medium">{location}</p>
            </div>
            <div className="flex gap-2 items-center">
              <FaStar className="text-[#be9342]"></FaStar>
              <p>{rating ? rating : "not rated"}</p>
            </div>
          </div>
          <p className="text-xl font-medium my-4">{placeName}</p>
          <div className="flex justify-between items-center">
            <p className="text-[#08B3AB] dark:text-black">
              $ {price} /per person
            </p>
            <Link to={`/details/${id}`}>
              <button className="btn-sm rounded-lg bg-[#08B3AB] hover:bg-blue-400 text-white">
                Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPlaces;
