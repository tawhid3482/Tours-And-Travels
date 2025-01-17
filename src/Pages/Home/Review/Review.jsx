import UseReviews from "../../../Hooks/UseReviews";
import Reviews from "./Reviews";

const Review = () => {
  return (
    <div className="my-8">
      <p className="text-[#08B3AB] font-semibold text-lg mb-2">Reviews</p>
      <h2 className="text-4xl font-bold mb-8">What our fans saying about us</h2>
      <div className="">
        <Reviews></Reviews>
      </div>
    </div>
  );
};

export default Review;
