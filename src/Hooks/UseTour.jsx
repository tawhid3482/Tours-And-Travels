import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import UseAxiosPublic from "./UseAxiosPublic";

const UseTour = () => {
  const AxiosPublic = UseAxiosPublic();

  const { data: tours, refetch } = useQuery({
    queryKey: ["places"],
    queryFn: async () => {
      const res = await AxiosPublic.get("/place");
      return res.data;
    },
  });
  return [tours, refetch];
};

export default UseTour;
