import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCarDetails } from "../lib/api";

const useGetCarDetailsQuery = () => {
  const getCarDetailsQuery = useQuery<any, Error>(
    ["getCarDetails"],
    () => getCarDetails(),
    {
      retry: true,
      refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return getCarDetailsQuery;
};

export default useGetCarDetailsQuery;
