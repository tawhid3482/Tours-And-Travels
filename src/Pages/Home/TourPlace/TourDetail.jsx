import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useParams } from "react-router-dom";

const TourDetail = () => {
  const { register, handleSubmit, reset } = useForm();
  const [rating, setRating] = useState(0);

  const { id } = useParams();
  const [tours, setTours] = useState(null);
  const data = useLoaderData();
  console.log(data);

  useEffect(() => {
    if (data) {
      const findData = data?.find((tour) => tour.id == id);
      setTours(findData);
    }
  }, [id, data]);

  const onSubmit = (formData) => {
    console.log("Form Submitted", formData);
    reset();
  };

  const handleSubmitReview = () => {
    // if (rating === 0) {
    // }
  };

  return (
    <div className="dark:bg-slate-300 dark:text-black flex items-center justify-center w-full  p-4">
      <div className=" w-full rounded-lg  overflow-hidden">
        <div className="flex flex-col lg:flex-row-reverse gap-8">
          {/* Tour Image and Details */}
          <div className="w-full lg:w-2/3">
            <img
              src={tours?.img}
              alt={tours?.placeName || "Tour Image"}
              className="rounded-lg w-full  object-cover mb-4"
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
                  <input
                    type="number"
                    placeholder="Guest Number"
                    {...register("guest", { required: true })}
                    className="input input-bordered w-full mt-1 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center text-gray-600 mb-4">
                <span>Service charge</span>
                <span>${tours?.price}</span>
              </div>

              <div className="flex justify-between items-center font-bold text-gray-800 mb-6">
                <span>Total</span>
                <span>${tours?.price}</span>
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
                    className="text-2xl text-gray-400 hover:text-yellow-400"
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
                className="input input-bordered w-full"
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
      </div>
    </div>
  );
};

export default TourDetail;
