import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { LoadCanvasTemplate, loadCaptchaEnginge } from "react-simple-captcha";
import SocialLogin from "./SocialLogin";
import login from '../../assets/login/login.png'

const Login = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const AxiosPublic = UseAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

//   useEffect(() => {
//     loadCaptchaEnginge(5);
//   }, []);

  const onSubmit = (data) => {

    userLogin(data.email, data.password)
      .then((result) => {
        const user = result.user;

        // for last time user signin save in database to match the firebase provided uid 
        const lastSignInTime = new Date().toISOString();

        AxiosPublic.patch(`/users/${user.uid}`, { lastSignInTime })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              toast.success("You have successfully signed in");
            } else {
              toast.error("Failed to update sign-in time.");
            }
          })
          .catch((error) => {
            console.error("Error updating lastSignInTime:", error);
            toast.error("Error updating sign-in time.");
          });

        reset();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error("Your email or password is incorrect");
        reset();
      });
  };

//   const handleValidate = () => {
//     const user_captcha_value = captchaRef.current.value;
//     if (validateCaptcha(user_captcha_value)) {
//       setDisabled(false);
//     } else {
//       setDisabled(true);
//     }
//   };

  return (
    <div>
      <Helmet>
        <title>Traveling | Login</title>
      </Helmet>

      <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now</h1>
            <img src={login} alt="" className="w-[520px]" />
          </div>
          <div className="card dark:text-white w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label ">
                  <span className="label-text dark:text-black">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600 ml-2">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="form-control relative">
                <label className="label ">
                  <span className="label-text dark:text-black">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="password"
                  className="input input-bordered"
                  required
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
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover dark:text-black">
                    Forgot password?
                  </a>
                </label>
              </div>
               {/* <div className="form-control"> */}
                {/* <label className="label">
                  <LoadCanvasTemplate />
                </label> */}
                {/* <input
                //   ref={captchaRef}
                //   onBlur={handleValidate}
                  type="text"
                  name="captcha"
                  placeholder="Fill the captcha"
                  className="input input-bordered"
                /> */}
              {/* </div>  */}
              <div className="form-control mt-5">
                <input
                  type="submit"
                  className="btn btn-primary bg-[#08B3AB] text-white hover:bg-[#2385d4]"
                  value="Login"
                
                />
              </div>
            </form>
            <div className="divider ">OR</div>
            <div className="text-center mb-5">
              <SocialLogin />
            </div>
            <div className="text-center mb-5 dark:text-black">
              <p>
                If you aren't a registered member, go to{" "}
                <Link className="text-[#08B3AB]" to="/signup">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
