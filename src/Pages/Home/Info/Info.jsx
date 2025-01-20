import { Link } from "react-router-dom";
import camera from "../../../assets/banner/camera.png";
const Info = () => {
  return (
    <div className="">
      <div className="flex justify-evenly items-center ">
        <div className="space-y-4">
          <p className="text-4xl font-medium">
            Sign-up now to get useful <br />
            traveling information
          </p>
          <div className="flex gap-10 items-center">
            <p className="text-lg text-[#cc8a28]"> Sing-up Now! </p>
            <Link to={"/signUp"}>
              <button className="btn btn-sm bg-[#08B3AB] hover:bg-blue-400 text-white">
                Sign-up
              </button>
            </Link>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In atque
            quis <br /> voluptate soluta provident. Voluptatum laborum ullam
            dolore distinctio sequi magni
          </p>
        </div>
        <div className="w-1/2">
          <img src={camera} className="w-full h-80" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Info;
