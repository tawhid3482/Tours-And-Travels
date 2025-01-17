import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const UseTour = () => {
  const [tours, setTours] = useState();

  useEffect(() => {
    fetch("place.json")
      .then((res) => res.json())
      .then((data) => setTours(data));
  }, []);
  return [tours];

  //   const { data: tours, refetch } = useQuery({
  //     queryKey: ["places"],
  //     queryFn: async () => {
  //       const res = await AxiosPublic.get("/place.json");
  //       return res.data;
  //     },
  //   });
  //   return [tours, refetch];
};

export default UseTour;
