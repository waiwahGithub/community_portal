import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { loginUser } from "../lib/api";

const useLoginUserQuery = (enabled = false, email: any, password: any) => {
  const loginUserQuery = useQuery<any, Error>(
    ["loginUserQuery"],
    () => loginUser(email, password),
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

  return loginUserQuery;
};

export default useLoginUserQuery;
