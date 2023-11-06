import { useQuery } from "react-query";
import { updateCarStatus } from "../lib/api";

const useUpdateCarStatusQuery = (enabled = false, userId: any, status: any) => {
  const updateCarStatusQuery = useQuery<any, Error>(
    ["updateCarStatusQuery"],
    () => updateCarStatus(userId, status),
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

  return updateCarStatusQuery;
};

export default useUpdateCarStatusQuery;
