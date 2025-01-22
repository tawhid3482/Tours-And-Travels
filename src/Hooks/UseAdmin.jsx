import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./UseAxiosSecure";
import UseAuth from "./UseAuth";


const UseAdmin = () => {
  const { user, loading } = UseAuth();
  const AxiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      const res = await AxiosSecure.get(`/users/admin/${user.email}`);
      return res?.data?.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default UseAdmin;
