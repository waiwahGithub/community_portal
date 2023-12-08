import { useQuery } from "react-query";
import {
  addDislikeToPost,
  addLikeToPost,
  commentOnPost,
  createPost,
  deletePost,
  getAllPosts,
  getAllPostsByStatus,
  getComment,
  getLikeByUserAndPost,
  getLikes,
  getPostTabulation,
  getShare,
  getSpecificUserPost,
  getTotalCommentOnPostFromUser,
  getTotalPostDisikesFromUser,
  getTotalPostLikesFromUser,
  sharePost,
  updateLikeStatusByUserAndPost,
  updatePost,
} from "../lib/api";

export const useGetAllPostsQuery = () => {
  const getAllPostsQuery = useQuery<any, Error>(
    ["getAllPosts"],
    () => getAllPosts(),
    {
      retry: false,
      // refetchInterval: 100,
      cacheTime: 0,
      staleTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return getAllPostsQuery;
};

export const useGetAllPostsByStatusQuery = (status: any) => {
  const getAllPostsByStatusQuery = useQuery<any, Error>(
    ["getAllPostsByStatus"],
    () => getAllPostsByStatus(status),
    {
      // retry: true,
      // refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return getAllPostsByStatusQuery;
};

export const useAddLikeToPostQuery = (
  enabled = false,
  userId: any,
  postId: any
) => {
  const addLikeToPostQuery = useQuery<any, Error>(
    ["addLikeToPost"],
    () => addLikeToPost(userId, postId),
    {
      enabled: enabled,
      retry: false,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return addLikeToPostQuery;
};

export const useAddDislikeToPostQuery = (
  enabled = false,
  userId: any,
  postId: any
) => {
  const addDislikeToPostQuery = useQuery<any, Error>(
    ["addDislikeToPost"],
    () => addDislikeToPost(userId, postId),
    {
      enabled: enabled,
      retry: false,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return addDislikeToPostQuery;
};

export const useCommentOnPostQuery = (
  enabled = false,
  userId: any,
  postId: any,
  comment: any
) => {
  const commentOnPostQuery = useQuery<any, Error>(
    ["commentOnPost"],
    () => commentOnPost(userId, postId, comment),
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

  return commentOnPostQuery;
};

export const useSharePostQuery = (
  enabled = false,
  userId: any,
  postId: any
) => {
  const sharePostQuery = useQuery<any, Error>(
    ["sharePost"],
    () => sharePost(userId, postId),
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

  return sharePostQuery;
};

export const useGetPostTabulationQuery = (postId: any) => {
  const getPostTabulationQuery = useQuery<any, Error>(
    ["getPostTabulation"],
    () => getPostTabulation(postId),
    {
      // retry: true,
      // refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return getPostTabulationQuery;
};

export const useGetSpecificUserPostQuery = (userId: any, postId: any) => {
  const getSpecificUserPostQuery = useQuery<any, Error>(
    ["getSpecificUserPost"],
    () => getSpecificUserPost(userId, postId),
    {
      // retry: true,
      // refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return getSpecificUserPostQuery;
};

export const useCreatePostQuery = (
  enabled = false,
  userId: any,
  communityId: any,
  postContent: any,
  postImgPath: any,
  postTitle: any,
  postType: any,
  status: any
) => {
  const createPostQuery = useQuery<any, Error>(
    ["createPost"],
    () =>
      createPost(
        userId,
        communityId,
        postContent,
        postImgPath,
        postTitle,
        postType,
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

  return createPostQuery;
};

export const useUpdatePostQuery = (
  enabled = false,
  userId: any,
  postId: any,
  postContent: any,
  postImgPath: any,
  postTitle: any,
  postType: any,
  status: any
) => {
  const updatePostQuery = useQuery<any, Error>(
    ["updatePost"],
    () =>
      updatePost(
        userId,
        postId,
        postContent,
        postImgPath,
        postTitle,
        postType,
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

  return updatePostQuery;
};

export const useDeletePostQuery = (
  enabled = false,
  userId: any,
  postId: any
) => {
  const deletePostQuery = useQuery<any, Error>(
    ["deletePost"],
    () => deletePost(userId, postId),
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

  return deletePostQuery;
};

export const useGetTotalPostLikesFromUserQuery = (userId: any) => {
  const getTotalPostLikesFromUserQuery = useQuery<any, Error>(
    ["getTotalPostLikesFromUser"],
    () => getTotalPostLikesFromUser(userId),
    {
      // retry: true,
      // refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return getTotalPostLikesFromUserQuery;
};

export const useGetTotalPostDisikesFromUserQuery = (userId: any) => {
  const getTotalPostDisikesFromUserQuery = useQuery<any, Error>(
    ["getTotalPostLikesFromUser"],
    () => getTotalPostDisikesFromUser(userId),
    {
      // retry: true,
      // refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return getTotalPostDisikesFromUserQuery;
};
export const useGetTotalCommentOnPostFromUserQuery = (userId: any) => {
  const getTotalCommentOnPostFromUserQuery = useQuery<any, Error>(
    ["getTotalCommentOnPostFromUser"],
    () => getTotalCommentOnPostFromUser(userId),
    {
      // retry: true,
      // refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return getTotalCommentOnPostFromUserQuery;
};

export const useGetCommentQuery = () => {
  const getTotalCommentOnPostFromUserQuery = useQuery<any, Error>(
    ["getComment"],
    () => getComment(),
    {
      // retry: true,
      // refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return getTotalCommentOnPostFromUserQuery;
};

export const useGetLikesQuery = () => {
  const getLikesQuery = useQuery<any, Error>(["getLikes"], () => getLikes(), {
    retry: true,
    refetchInterval: 10000,
    cacheTime: 0,
    onError: () => {
      console.log(Error);
    },
  });

  return getLikesQuery;
};

export const useGetShareQuery = () => {
  const getShareQuery = useQuery<any, Error>(["getShare"], () => getShare(), {
    retry: true,
    refetchInterval: 10000,
    cacheTime: 0,
    onError: () => {
      console.log(Error);
    },
  });

  return getShareQuery;
};

export const useGetLikeByUserAndPostQuery = (userId?: any, postId?: any) => {
  const getLikeByUserAndPostQuery = useQuery<any, Error>(
    ["getLikeByUserAndPost"],
    () => getLikeByUserAndPost(userId, postId),
    {
      // retry: true,
      // refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return getLikeByUserAndPostQuery;
};

export const useUpdateLikeStatusByUserAndPostQuery = (
  enabled?: any,
  userId?: any,
  postId?: any,
  status?: any
) => {
  const updateLikeStatusByUserAndPostQuery = useQuery<any, Error>(
    ["getupdateLikeStatusByUserAndPostShare"],
    () => updateLikeStatusByUserAndPost(userId, postId, status),
    {
      enabled: enabled,
      retry: false,
      // refetchInterval: 10000,
      cacheTime: 0,
      staleTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return updateLikeStatusByUserAndPostQuery;
};
