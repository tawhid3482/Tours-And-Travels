import UseTour from "../../../Hooks/UseTour";
import TourPlaces from "./TourPlaces";

const Tour = () => {
  const [tours] = UseTour();
  // console.log(tours)
  return (
    <div className="my-16 ">
      <h3 className="text-4xl font-bold">Our Tour Places</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
        {tours?.map((tour) => (
          <TourPlaces key={tour._id} tour={tour}></TourPlaces>
        ))}
      </div>
    </div>
  );
};

export default Tour;
