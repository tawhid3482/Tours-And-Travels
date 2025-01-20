import pic1 from "../../../assets/banner/piramite.jpeg";
import pic2 from "../../../assets/banner/sea.jpg";
import pic3 from "../../../assets/banner/hell.jpeg";
import { useNavigate } from "react-router-dom";
import UseTour from "../../../Hooks/UseTour";
import { useState } from "react";

const Banner = () => {
  const navigate = useNavigate();
  const [tours] = UseTour();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState(tours);

  const handleSearch = () => {
    const filterPro = tours?.filter((item) =>
      item?.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilterData(filterPro);
    navigate("/search", {
      state: { filterData: filterPro, query: searchTerm },
    });
  };

  return (
    <div className="dark:bg-slate-300 dark:text-black ">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start mb-4">
            <span className="bg-[#08B3AB] text-black px-3 py-1 rounded-full font-semibold text-sm">
              Know Before You Go
            </span>
            <span className="ml-2 text-lg">🌍</span>
          </div>
          <h1 className="text-4xl md:text-4xl font-bold text-gray-800 leading-tight">
            Traveling opens the door to creating{" "}
            <span className="text-[#08B3AB]">memories</span>
          </h1>
          <p className="text-gray-600 mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
            ipsum nobis asperiores soluta voluptas quas voluptates. Molestiae
            tempora dignissimos, animi praesentium molestias.
          </p>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex justify-center md:justify-end gap-4">
          <img
            className="rounded-2xl  shadow-md w-1/3"
            src={pic1}
            alt="Travel Image 1"
          />
          <img
            className="rounded-2xl shadow-md w-1/3"
            src={pic2}
            alt="Travel Image 2"
          />
          <img
            className="rounded-2xl shadow-md w-1/3"
            src={pic3}
            alt="Travel Image 3"
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-8  rounded-lg p-4 ">
        <div className=" grid grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-600 font-semibold mb-2">
              Location
            </label>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 dark:text-white rounded-lg px-4 py-2"
              type="text"
              placeholder="Where are you going?"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-semibold mb-2">
              Distance
            </label>
            <input
              className="w-full border dark:text-white border-gray-300 rounded-lg px-4 py-2"
              type="text"
              placeholder="Distance km/m"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-semibold mb-2">
              Max People
            </label>
            <input
              className="w-full border dark:text-white border-gray-300 rounded-lg px-4 py-2"
              type="number"
              placeholder="0"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSearch}
            className="bg-[#08B3AB] hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
