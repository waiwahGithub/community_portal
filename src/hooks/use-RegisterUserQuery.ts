import { useQuery } from "react-query";
import { registerUser } from "../lib/api";

const useRegisterUserQuery = (
  enabled = false,
  username: any,
  firstName: any,
  lastName: any,
  password: any,
  email?: any,
  userType?: any,
  userBio?: any,
  status?: any,
  profileImgPath?: any
) => {
  const registerUserQuery = useQuery<any, Error>(
    ["registerUserQuery"],
    () =>
      registerUser(
        username,
        firstName,
        lastName,
        password,
        email,
        userType,
        userBio,
        status,
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

  return registerUserQuery;
};

export default useRegisterUserQuery;
