import UseAxiosPublic from "./UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const UseGallery = () => {
  const AxiosPublic = UseAxiosPublic();
  const { data:photo, refetch } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/gallery");
      return res.data;
    },
  });

  return [photo, refetch];
};

export default UseGallery;
