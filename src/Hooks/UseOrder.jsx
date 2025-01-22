import { useQuery } from "@tanstack/react-query";
import UseAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure"

const UseOrder = () => {
    const AxiosSecure = useAxiosSecure();
    const { user } = UseAuth();
  
    const {  data: order = [], refetch} = useQuery({
      queryKey: ["order", user?.email],
      queryFn: async () => {
        const res = await AxiosSecure.get(`/order?email=${user.email}`);
        return res.data;
      },
    });
    return [order, refetch];
};

export default UseOrder;