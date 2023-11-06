import { useQuery } from "react-query";
import { viewUserDetailsByID } from "../lib/api";

const useViewUserDetailsById = (enabled = false, userId: any) => {
  const viewUserDetailsByIdQuery = useQuery<any, Error>(
    ["viewUserDetailsByIdQuery"],
    () => viewUserDetailsByID(userId),
    {
      enabled: enabled,
      // retry: true,
      refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return viewUserDetailsByIdQuery;
};

export default useViewUserDetailsById;
