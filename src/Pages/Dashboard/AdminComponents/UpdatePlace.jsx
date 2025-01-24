import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";

const imgae_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imgae_hosting_key}`;

const UpdatePlace = () => {
  const item = useLoaderData();
  console.log(item);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = UseAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const imageFile = { image: data.img[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const placeItem = {
        // id: Date.now().toString(),
        placeName: data.name,
        img: imageResponse.data.data.display_url,
        price: parseFloat(data.price),
        rating: parseFloat(data.rating),
        description: data.description,
        serviceCharge: parseInt(data.serviceCharge),
        location: data.location,
        
      };

      const menuRes = await axiosSecure.patch(
        `/place/${item._id}`,
        placeItem
      );
      console.log(menuRes.data);
      if (menuRes.data.modifiedCount > 0) {
        reset();
        toast.success(`${data.name} place updated `);
        navigate("/dashboard/managePlace");
      }
    }
    
  };

  return (
    <div className="dark:bg-slate-700 dark:text-white p-5">
      <Helmet>
        <title>Traveling | Update Place</title>
      </Helmet>
      <div>
        <p className="text-3xl font-bold text-center">Update Your Place</p>
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
                defaultValue={item.name}
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
                defaultValue={item.price}
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
                defaultValue={item.rating}
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
                defaultValue={item.serviceCharge}
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
                defaultValue={item.location}
                placeholder="location "
                {...register("location", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text dark:bg-slate-700 dark:text-slate-100">
                  Supplier Email
                </span>
              </label>
              <input
                type="email"
                defaultValue={item.email}
                placeholder="Supplier Email"
                {...register("supplierEmail", { required: true })}
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
            <button type="submit" className="btn btn-primary w-full">
              Update Place
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePlace;
