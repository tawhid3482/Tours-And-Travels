import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import login from "../../assets/login/login.png";
import { AuthContext } from "../../Provider/AuthProvider";

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const AxiosPublic = UseAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        const firebaseId = loggedUser.uid;

        // Store metadata in userMetadata
        const userMetadata = {
          creationTime: loggedUser.metadata.creationTime,
          lastSignInTime: loggedUser.metadata.lastSignInTime,
        };

        // Now update the user profile
        updateUserProfile(data.name, data.photo, userMetadata, firebaseId)
          .then(() => {
            const userInfo = {
              id: firebaseId,
              name: data.name,
              email: data.email,
              gender: data.gender,
              photo: data.photo,
              metadata: userMetadata, // Attach metadata here
            };

            // Save user data to your server
            AxiosPublic.post("/users", userInfo)
              .then((res) => {
                if (res.data.insertedId) {
                  reset();
                  toast.success("You have successfully signed up");
                  navigate("/");
                } else {
                  toast.error("Something went wrong! Please try again.");
                }
              })
              .catch((error) => {
                toast.error("Error while saving user data. Please try again.");
                console.log(error);
              });
          })
          .catch((error) => {
            toast.error("Error while updating user profile. Please try again.");
            console.log(error);
          });
      })
      .catch((error) => {
        // Firebase error handling
        if (error.code === "auth/invalid-email") {
          toast.error("Invalid email address. Please enter a valid email.");
        } else {
          toast.error("Something went wrong during sign up. Please try again.");
        }
        console.log(error);
      });
  };

  return (
    <>
      <Helmet>
        <title>Traveling | Sign Up</title>
      </Helmet>
      <div>
        <div className="hero  min-h-screen">
          <div className="hero-content flex-col lg:flex-row">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Sign up now!</h1>
              <img src={login} alt="" className="w-[520px]" />
            </div>
            <div className="card w-full max-w-sm shrink-0 shadow-2xl">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card-body dark:text-white"
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text dark:text-black">
                      Your Name
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Write Your Name"
                    className="input input-bordered"
                  />
                  {errors.name && (
                    <span className="text-red-600 ml-2">
                      Name field is required
                    </span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text dark:text-black">
                      Photo URL
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("photo", { required: true })}
                    placeholder="Your Profile Photo"
                    className="input input-bordered"
                  />
                  {errors.photo && (
                    <span className="text-red-600 ml-2">
                      Photo url field is required
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text dark:text-black">Gender</span>
                  </label>
                  <select
                    className="select select-bordered"
                    {...register("gender", { required: true })}
                  >
                    <option value="" disabled selected>
                      Select your gender
                    </option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <span className="text-red-600 ml-2">
                      Gender field is required
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text dark:text-black">Email</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Email"
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <span className="text-red-600 ml-2">
                      Email field is required
                    </span>
                  )}
                </div>

                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text dark:text-black">Password</span>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                      maxLength: {
                        value: 20,
                        message: "Password must not exceed 20 characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                        message:
                          "Password must include at least one letter, one number, and one special character",
                      },
                    })}
                    placeholder="Password"
                    className="input input-bordered"
                  />
                  <span
                    className="absolute right-4 top-[50px] cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                  {errors.password && (
                    <span className="text-red-600 ml-2">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="form-control mt-6">
                  <input
                    type="submit"
                    className="btn btn-primary bg-[#08B3AB] text-white hover:bg-[#237fd6]"
                    value="Sign Up"
                  />
                </div>
              </form>
              <div className="divider ">OR</div>
              <div className="text-center mb-5">
                {/* <SocialLogin></SocialLogin> */}
              </div>
              <div className="text-center mb-5 dark:text-black">
                <p>
                  If you are already <br /> a registered member, go to{" "}
                  <Link className="text-[#08B3AB]" to="/login">
                    login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
