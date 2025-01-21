import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useParams } from "react-router-dom";
import UseReviews from "../../../Hooks/UseReviews";
import UseAuth from "../../../Hooks/UseAuth";

const TourDetail = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = UseAuth();
  const [rating, setRating] = useState(2);
  const [guestCount, setGuestCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sum, setSum] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [review, setReviews] = UseReviews();

  const { id } = useParams();
  const [tours, setTours] = useState(null);
  const data = useLoaderData();

  useEffect(() => {
    if (data) {
      const findData = data?.find((tour) => tour.id == id);
      setTours(findData);
      if (findData) {
        setTotalPrice(findData.price + findData.serviceCharge); // Initialize total price
      }
    }
  }, [id, data]);

  useEffect(() => {
    if (tours) {
      const sumTotal = guestCount * tours.price;
      setSum(sumTotal);
      const newTotal = guestCount * tours.price + tours.serviceCharge;
      setTotalPrice(newTotal);
    }
  }, [guestCount, tours]);

  const onSubmit = (data) => {
    const bookingData = {
      guestName: data.name,
      phone: data.phone,
      date: data.date,
      guest: guestCount,
      image: tours.img,
      mainPrice: tours.price,
      serviceCharge: tours.serviceCharge,
      totalPrice: totalPrice,
    };
    console.log(bookingData);
  };

  const handleGuestChange = (change) => {
    setGuestCount((prev) => Math.max(1, prev + change)); // Ensure guest count is never negative
  };

  const handleSubmitReview = () => {
    if (reviewText.trim() === "") return; // Prevent empty reviews

    const newReview = {
      rating,
      name: user.displayName,
      photo: user.photoURL,
      speech: reviewText,
      location: tours.location,
      date: new Date().toLocaleDateString(),
    };
    console.log(newReview);
    setReviews((prev) => [...prev, newReview]);
    setReviewText(""); // Clear the input
  };
  return (
    <div className="dark:bg-slate-300 dark:text-black flex items-center justify-center w-full p-2">
      <div className="w-full rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row-reverse gap-8">
          {/* Tour Image and Details */}
          <div className="w-full lg:w-2/3">
            <img
              src={tours?.img}
              alt={tours?.placeName || "Tour Image"}
              className="rounded-lg w-full object-cover mb-4"
            />
            <div className="p-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {tours?.name}
              </h1>
              <div className="flex justify-between items-center text-gray-600 mb-2">
                <span>⭐ {tours?.rating}</span>
                <span>{tours?.location}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600 mb-4">
                <span>$ {tours?.price} / per person</span>
                <span>10 people</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">{tours?.speech}</p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="w-full lg:w-1/3 border rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                $ {tours?.price} / per person
              </h2>
              <span className="text-lg text-gray-600">⭐ {tours?.rating}</span>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Book Your Tour
            </h3>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium :text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name", { required: true })}
                  className="input input-bordered w-full mt-1 dark:text-white"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="Phone"
                  {...register("phone", { required: true })}
                  className="input input-bordered w-full mt-1 dark:text-white"
                />
              </div>

              <div className="flex justify-between items-center gap-1">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    {...register("date", { required: true })}
                    className="input input-bordered w-full mt-1 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Guest
                  </label>
                  <div className="flex items-center gap-2 ">
                    <button
                      type="button"
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={() => handleGuestChange(-1)}
                    >
                      -
                    </button>
                    <span className="font-medium">{guestCount}</span>
                    <button
                      type="button"
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={() => handleGuestChange(1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-gray-600 mb-4">
                <span>Service charge</span>
                <span>${tours?.serviceCharge}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-gray-800 mb-6">
                <span>SubTotal</span>
                <span>
                  ${sum} + ${tours?.serviceCharge}
                </span>
              </div>
              <div className="flex justify-between items-center font-bold text-gray-800 mb-6">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#08B3AB] text-white font-semibold rounded-lg shadow-md hover:bg-[#06A095] transition duration-300"
              >
                Add to Book
              </button>
            </form>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="p-6 border-t mt-8 border rounded-lg">
          <h3 className="text-2xl font-semibold mb-4">Your Review</h3>
          <div className="flex flex-col gap-4">
            {/* Rating Section */}
            <div className="flex items-center gap-2">
              <label className="text-lg font-medium">Your Rating:</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`text-2xl ${
                      star <= rating ? "text-yellow-400" : "text-gray-400"
                    }`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Review Input */}
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Write your review..."
                className="input input-bordered w-full dark:text-white"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <button
                className="btn bg-[#08B3AB] text-white px-4 py-2 rounded-md"
                onClick={handleSubmitReview}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        {/* Display Reviews */}
        <div className="mt-6">
          <h4 className="text-xl font-semibold mb-4">Recent Reviews</h4>
          {review?.length > 0 ? (
            review
              .filter(
                (reviews) =>
                  reviews.location.toLowerCase() ===
                  tours?.location.toLowerCase()
              ) // Filter reviews by location
              .map((reviews, index) => (
                <div key={index} className="mb-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                      <img
                        src={reviews.img}
                        className="rounded-full w-14 h-14"
                        alt=""
                      />
                      <div className="">
                        <p className="text-lg font-bold uppercase">{reviews.name}</p>
                        <p className="text-sm text-[#08B3AB]">
                          {reviews?.date}
                        </p>
                      </div>
                    </div>
                    <p>⭐ {reviews.rating}</p>
                  </div>
                  <p className="text-gray-700">{reviews.speech}</p>
                </div>
              ))
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
