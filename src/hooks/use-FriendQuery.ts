import { useQuery } from "react-query";
import {
  filterFollowerByStatus,
  followFriend,
  getAllFollowList,
  getFollowedFriends,
  searchFriendByQuery,
  unfollowFriend,
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

export const useGetAllFollowListQuery = () => {
  const getAllFollowListQuery = useQuery<any, Error>(
    ["getAllFollowList"],
    () => getAllFollowList(),
    {
      retry: true,
      refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return getAllFollowListQuery;
};

export const useFollowFriendQuery = (
  enabled: any,
  userId: any,
  friendId: any
) => {
  const followFriendQuery = useQuery<any, Error>(
    ["followFriend"],
    () => followFriend(userId, friendId),
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

  return followFriendQuery;
};

export const useUnfollowFriendQuery = (
  enabled: any,
  userId: any,
  friendId: any
) => {
  const unfollowFriendQuery = useQuery<any, Error>(
    ["unfollowFriend"],
    () => unfollowFriend(userId, friendId),
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

  return unfollowFriendQuery;
};
