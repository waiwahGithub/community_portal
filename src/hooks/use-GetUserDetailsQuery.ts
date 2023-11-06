import { useQuery } from "react-query";
import { getUserDetails } from "../lib/api";

const useGetUserDetailsQuery = () => {
  const getUserDetailsQuery = useQuery<any, Error>(
    ["getUserDetailsQuery"],
    () => getUserDetails(),
    {
      retry: true,
      refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return getUserDetailsQuery;
};

export default useGetUserDetailsQuery;
