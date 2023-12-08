import { useQuery } from "react-query";
import {
  createCommunity,
  getActiveCommunities,
  getAllCommunityMembers,
  getCommunities,
  getUserByCommunity,
  joinCommunity,
  unjoinCommunity,
} from "../lib/api";

export const useGetCommunitiesQuery = () => {
  const getCommunitiesQuery = useQuery<any, Error>(
    ["getCommunities"],
    () => getCommunities(),
    {
      // retry: true,
      // refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return getCommunitiesQuery;
};

export const useGetUserByCommunityQuery = (userId: any) => {
  const getUserByCommunityQuery = useQuery<any, Error>(
    ["getUserByCommunity"],
    () => getUserByCommunity(userId),
    {
      // retry: true,
      // refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return getUserByCommunityQuery;
};

export const useGetActiveCommunitiesQuery = () => {
  const getCarDetailsQuery = useQuery<any, Error>(
    ["getActiveCommunities"],
    () => getActiveCommunities(),
    {
      // retry: true,
      // refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return getCarDetailsQuery;
};

export const useJoinCommunity = (
  enabled = false,
  userId: any,
  communityId: any
) => {
  const joinCommunityQuery = useQuery<any, Error>(
    ["joinCommunity"],
    () => joinCommunity(userId, communityId),
    {
      enabled: enabled,
      // retry: true,
      // refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return joinCommunityQuery;
};

export const useUnjoinCommunity = (
  enabled = false,
  userId: any,
  communityId: any
) => {
  const unjoinCommunityQuery = useQuery<any, Error>(
    ["joinCommunity"],
    () => unjoinCommunity(userId, communityId),
    {
      enabled: enabled,
      // retry: true,
      // refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return unjoinCommunityQuery;
};

export const useCreateCommunityQuery = (
  enabled = false,
  userId: any,
  communitybio: any,
  communitylogopath: any,
  communityname: any,
  status?: 1
) => {
  const createCommunityQuery = useQuery<any, Error>(
    ["joinCommunity"],
    () =>
      createCommunity(
        userId,
        communitybio,
        communitylogopath,
        communityname,
        status
      ),
    {
      enabled: enabled,
      // retry: true,
      // refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return createCommunityQuery;
};

export const useGetAllCommunityMembersQuery = () => {
  const getAllCommunityMembersQuery = useQuery<any, Error>(
    ["getAllCommunityMembers"],
    () => getAllCommunityMembers(),
    {
      // retry: true,
      // refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return getAllCommunityMembersQuery;
};
