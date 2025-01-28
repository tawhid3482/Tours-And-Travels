import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./UseAxiosSecure";
import UseAuth from "./UseAuth";


const UseReservation = () => {
  const AxiosSecure = useAxiosSecure();
  const { user } = UseAuth();

  const { data: reservationData=[], refetch } = useQuery({
    queryKey: ["reservation", user?.email],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/reservation?email=${user.email}`);
      return res.data;
    },
  });
  return [reservationData, refetch];
};

export default UseReservation;
