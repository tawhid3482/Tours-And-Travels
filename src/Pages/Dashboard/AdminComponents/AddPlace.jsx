import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

const AddPlace = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      // Upload the image
      const formData = new FormData();
      formData.append("image", data.img[0]);
      const imageResponse = await axiosPublic.post(imageHostingApi, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (imageResponse.data.success) {
        // Create the product object
        const productItem = {
          // id: Date.now().toString(),
          placeName: data.name,
          img: imageResponse.data.data.display_url,
          price: parseFloat(data.price),
          rating: parseFloat(data.rating),
          email:data.email,
          description: data.description,
          serviceCharge: parseInt(data.serviceCharge),
          location: data.location,
        };

        // Save the product to the database
        const response = await axiosSecure.post("/place", productItem);
        if (response.data.insertedId) {
          reset();
          toast.success(`${data.name} added to the product list!`);
        }
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add the product. Please try again.");
    }
  };

  return (
    <div className="dark:bg-slate-700 dark:text-white p-5">
      <Helmet>
        <title>Traveling | Add Place</title>
      </Helmet>
      <div>
        <p className="text-3xl font-bold text-center">Add Your Place</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-6">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text dark:bg-slate-700 dark:text-slate-100">
                  Place Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Place Name"
                {...register("name", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text dark:bg-slate-700 dark:text-slate-100">
                  Price
                </span>
              </label>
              <input
                type="number"
                step="0.01"
                placeholder=" Price"
                {...register("price", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text dark:bg-slate-700 dark:text-slate-100">
                  Rating
                </span>
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="Rating"
                {...register("rating", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text dark:bg-slate-700 dark:text-slate-100">
                  Service Charge
                </span>
              </label>
              <input
                type="number"
                step="1.0"
                placeholder="Service Charge "
                {...register("serviceCharge")}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text dark:bg-slate-700 dark:text-slate-100">
                  Location
                </span>
              </label>
              <input
                type="text"
                placeholder="location "
                {...register("location", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text dark:bg-slate-700 dark:text-slate-100">
                   Email
                </span>
              </label>
              <input
                type="email"
                placeholder=" Email"
                {...register("email", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text dark:bg-slate-700 dark:text-slate-100">
                Description
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              {...register("description", { required: true })}
              placeholder="Description"
            ></textarea>
          </div>

          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text dark:bg-slate-700 dark:text-slate-100">
                Place Image
              </span>
            </label>
            <input
              type="file"
              {...register("img", { required: true })}
              className="file-input file-input-bordered w-full"
            />
          </div>

          <div className="form-control w-full my-6">
            <button type="submit" className="btn bg-[#08B3AB] text-white w-full">
              Add Place
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddPlace;
