import { useQuery } from "react-query";
import {
  addLikeToPostNotification,
  commentOnPostNotification,
  getAllNotification,
  getNotificationLogByUserId,
  getNotificationLogs,
  sharePostNotification,
  updateUserNotificationStatus,
} from "../lib/api";

export const useAddLikeToPostNotificationQuery = (
  enabled = false,
  userId: any,
  postId: any,
  targetUserId: any,
  notificationType: any
) => {
  const addLikeToPostNotificationQuery = useQuery<any, Error>(
    ["addLikeToPostNotification"],
    () =>
      addLikeToPostNotification(userId, postId, targetUserId, notificationType),
    {
      enabled: enabled,
      retry: false,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return addLikeToPostNotificationQuery;
};

// notificationType === 2 for comment
export const useCommentOnPostNotificationQuery = (
  enabled = false,
  userId: any,
  postId: any,
  targetUserId: any,
  notificationType: any
) => {
  const commentOnPostNotificationQuery = useQuery<any, Error>(
    ["commentOnPostNotification"],
    () =>
      commentOnPostNotification(userId, postId, targetUserId, notificationType),
    {
      enabled: enabled,
      retry: false,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return commentOnPostNotificationQuery;
};

export const useSharePostNotificationQuery = (
  enabled = false,
  userId: any,
  postId: any,
  targetUserId: any,
  notificationType: any
) => {
  const sharePostNotificationQuery = useQuery<any, Error>(
    ["sharePostNotification"],
    () => sharePostNotification(userId, postId, targetUserId, notificationType),
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

  return sharePostNotificationQuery;
};

export const useGetNotificationLogsQuery = (userId: any) => {
  const getNotificationLogsQuery = useQuery<any, Error>(
    ["sharePostNotification"],
    () => getNotificationLogs(userId),
    {
      retry: true,
      refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return getNotificationLogsQuery;
};

export const useGetNotificationLogByUserIdQuery = (userId: any) => {
  const getNotificationLogByUserIdQuery = useQuery<any, Error>(
    ["sharePostNotification"],
    () => getNotificationLogByUserId(userId),
    {
      retry: true,
      refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return getNotificationLogByUserIdQuery;
};

export const useGetAllNotificationQuery = () => {
  const getAllNotificationQuery = useQuery<any, Error>(
    ["getAllNotification"],
    () => getAllNotification(),
    {
      retry: true,
      refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return getAllNotificationQuery;
};

export const useUpdateUserNotificationStatusQuery = (
  enabled: any,
  userId: any,
  notificationStatus: any
) => {
  const updateUserNotificationStatusQuery = useQuery<any, Error>(
    ["updateUserNotificationStatus"],
    () => updateUserNotificationStatus(userId, notificationStatus),
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

  return updateUserNotificationStatusQuery;
};
