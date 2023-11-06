import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { uploadUserDetails } from "../lib/api";

const useUploadUserDetailsQuery = (
  enabled = false,
  userId: any,
  username: any,
  firstName: any,
  lastName: any,
  profileImage: any
) => {
  const uploadUserDetailsQuery = useQuery<any, Error>(
    ["uploadUserDetailsQuery"],
    () =>
      uploadUserDetails(userId, username, firstName, lastName, profileImage),
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

  return uploadUserDetailsQuery;
};

export default useUploadUserDetailsQuery;
