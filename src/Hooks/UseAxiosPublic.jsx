import axios from "axios";

const AxiosPublic = axios.create({
  baseURL: "https://tour-server-three.vercel.app",
});

const UseAxiosPublic = () => {
  return AxiosPublic;
};
export default UseAxiosPublic;
