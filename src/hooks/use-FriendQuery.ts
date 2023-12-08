import { useQuery } from "react-query";
import {
  filterFollowerByStatus,
  getFollowedFriends,
  searchFriendByQuery,
} from "../lib/api";

export const useGetFollowedFriendsQuery = (userId: any) => {
  const getFollowedFriendsQuery = useQuery<any, Error>(
    ["getFollowedFriends"],
    () => getFollowedFriends(userId),
    {
      retry: true,
      refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return getFollowedFriendsQuery;
};

export const useFilterFollowerByStatusQuery = (userId: any, status: any) => {
  const filterFollowerByStatusQuery = useQuery<any, Error>(
    ["filterFollowerByStatus"],
    () => filterFollowerByStatus(userId, status),
    {
      retry: true,
      refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return filterFollowerByStatusQuery;
};

export const useSearchFriendByQueryQuery = (query: any) => {
  const searchFriendByQueryQuery = useQuery<any, Error>(
    ["searchFriendByQuery"],
    () => searchFriendByQuery(query),
    {
      retry: true,
      refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return searchFriendByQueryQuery;
};
