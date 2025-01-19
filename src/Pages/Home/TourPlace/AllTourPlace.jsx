import UseTour from "../../../Hooks/UseTour";
import TourPlaces from "./TourPlaces";

const AllTourPlace = () => {
  const [tours] = UseTour();
  return (
    <div className="">
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
              <h1 className="mb-5 text-5xl font-bold text-white">All Tours</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        {/* Search Bar */}
        <div className="mt-8  rounded-lg p-4 ">
          <div className=" grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-600 font-semibold mb-2">
                Location
              </label>
              <input
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
            <button className="bg-[#08B3AB] hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg">
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {tours?.map((tour) => (
          <TourPlaces key={tour.id} tour={tour}></TourPlaces>
        ))}
      </div>
    </div>
  );
};

export default AllTourPlace;