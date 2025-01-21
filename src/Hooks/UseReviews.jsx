import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "./UseAxiosPublic";

const UseReviews = () => {
  const AxiosPublic = UseAxiosPublic()
    const { data: reviews, refetch } = useQuery({
      queryKey: ["reviews"],
      queryFn: async () => {
        const res = await AxiosPublic.get("/reviews");
        return res.data;
      },
    });
    return [reviews, refetch];
};

export default UseReviews;
