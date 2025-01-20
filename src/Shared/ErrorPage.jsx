import { Link } from "react-router-dom";
import error from "../assets/login/error.png";
const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center my-5">
      <img src={error} alt="" className="w-[750px]" />
      <Link to={"/"}>
        <button className="btn bg-[#08B3AB] text-white w-40">
          Back Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
