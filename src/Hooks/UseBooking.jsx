import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./UseAxiosSecure";
import UseAuth from "./UseAuth";

const UseBooking = () => {
  const AxiosSecure = useAxiosSecure();
  const { user } = UseAuth();

  const { data: booking=[], refetch } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/booking?email=${user.email}`);
      return res.data;
    },
  });
  return [booking, refetch];
};

export default UseBooking;
