import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getCarDetails, registerUser } from "../lib/api";

const useRegisterUserQuery = (
  enabled = false,
  username: any,
  password: any,
  firstName: any,
  lastName: any
) => {
  const registerUserQuery = useQuery<any, Error>(
    ["registerUserQuery"],
    () => registerUser(username, password, firstName, lastName),
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

  return registerUserQuery;
};

export default useRegisterUserQuery;
