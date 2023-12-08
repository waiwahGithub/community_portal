import { useQuery } from "react-query";
import { updateUserDetails, updateUserStatus } from "../lib/api";

export const useUpdatedUserDetailsQuery = (
  enabled = false,
  userId: any,
  firstName: any,
  lastName: any,
  userType?: any,
  userBio?: any,
  profileImgPath?: any
) => {
  const uploadUserDetailsQuery = useQuery<any, Error>(
    ["uploadUserDetailsQuery"],
    () =>
      updateUserDetails(
        userId,
        firstName,
        lastName,
        userType,
        userBio,
        profileImgPath
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

  return uploadUserDetailsQuery;
};

export const useUpdateUserStatusQuery = (
  enabled = false,
  userId: any,
  status: any
) => {
  const updateUserStatusQuery = useQuery<any, Error>(
    ["updateUserStatus"],
    () => updateUserStatus(userId, status),
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

  return updateUserStatusQuery;
};
