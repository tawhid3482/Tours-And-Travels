import { FcGoogle } from "react-icons/fc";
import { replace, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UseAuth from "../../Hooks/UseAuth";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const SocialLogin = () => {
  const { googleLogin } = UseAuth();
  const AxiosPublic = UseAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const loggedUser = result.user;

        // Store metadata in userMetadata
        const userMetadata = {
          creationTime: loggedUser.metadata.creationTime,
          lastSignInTime: loggedUser.metadata.lastSignInTime,
        };

        const userInfo = {
          id: result.user?.uid,
          email: result.user?.email,
          name: result.user?.displayName,
          photo: result.user.photoURL,
          metadata: userMetadata,
        };
        AxiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);

          AxiosPublic.patch(`/users/${loggedUser.uid}`, {
            lastSignInTime: userMetadata.lastSignInTime,
          }).then(() => {
            navigate(from, { replace: true });
          });

          navigate(from, { replace: true });
        });
      })
      .catch((err) => toast.error("Google Login Failed"));
  };
  return (
    <div className="p-8">
      <button onClick={handleGoogleLogin} className="btn w-full ">
        <FcGoogle className="text-2xl"></FcGoogle> Google
      </button>
    </div>
  );
};

export default SocialLogin;
