// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// Import required modules
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import UseReviews from "../../../Hooks/UseReviews";

const Reviews = () => {
  const [review] = UseReviews();

  // Check if there are reviews to display
  if (!review || review.length === 0) {
    return <p className="text-center text-lg">No reviews available.</p>;
  }

  return (
    <div>
      <Swiper
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000, // Slide change interval
          disableOnInteraction: false,
        }}
        breakpoints={{
          350: {
            slidesPerView: 2, // 2 slides for small screens
          },
          768: {
            slidesPerView: 3, // 3 slides for medium screens
          },
          1024: {
            slidesPerView: 3, // 4 slides for large screens
          },
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="mySwiper my-0"
      >
        {review.map(({ _id, name, img, speech }) => (
          <SwiperSlide key={_id}>
            <div className="w-96">
              <p className="text-lg mb-4 h-32">{speech}</p>
              <div className="flex gap-5 items-center">
                <img
                  src={img}
                  alt={`Review ${_id}`}
                  className="w-32 h-32 my-2 object-contain border p-1 rounded-md"
                />
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="text-sm text-gray-500">Customer</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
