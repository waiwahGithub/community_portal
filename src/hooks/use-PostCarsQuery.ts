import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCarDetails, postCar, registerUser } from "../lib/api";

const usePostCarQuery = (
  enabled = false,
  make: any,
  model: any,
  registration: any,
  priceRange: any,
  carProfileImg: any,
  userEmail: any,
  status: any
) => {
  const postCarQuery = useQuery<any, Error>(
    ["postCarQuery"],
    () =>
      postCar(
        make,
        model,
        registration,
        priceRange,
        carProfileImg,
        userEmail,
        status
      ),
    {
      enabled: enabled,
      retry: true,
      refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return postCarQuery;
};

export default usePostCarQuery;
