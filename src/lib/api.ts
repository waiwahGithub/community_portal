import axios from "axios";

const jwtToken: any = localStorage.getItem("jwt_token");
let localInfoQuery: any = null;

try {
  localInfoQuery = JSON.parse(jwtToken);
} catch (error) {
  // Handle the error or provide a default value if parsing fails
  // console.error("Error parsing JSON:", error);
  localInfoQuery = {}; // You can set a default value here
}

export async function axisFetch(requestInfo: any, requestInit: any) {
  try {
    const response = await axios(requestInfo, requestInit);
    return { status: response.status, body: response.data };
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        JSON.stringify({
          status: error.response.status,
          body: error.response.data,
        })
      );
    } else {
      throw error;
    }
  }
}

export async function getCarDetails() {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localInfoQuery?.token}`,
  };

  return axisFetch("http://localhost:8080/xyz/cars", {
    method: "GET",
    headers: headers,
  });
}

export async function sendSlackMessage(text: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  const payload = JSON.stringify({ text: text });

  return axisFetch("http://localhost:8080/webhook/message/WWW", {
    method: "post",
    headers: headers,
    data: payload,
  });
}

export async function postCar(
  make: any,
  model: any,
  registration: any,
  priceRange: any,
  carProfileImg: any,
  userEmail: any,
  status: any
) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localInfoQuery?.token}`,
  };

  const payload = JSON.stringify({
    make: make,
    model: model,
    registration: registration,
    priceRange: priceRange,
    carProfileImg: carProfileImg,
    userEmail: userEmail,
    status: status,
  });

  return axisFetch("http://localhost:8080/xyz/cars", {
    method: "POST",
    headers: headers,
    data: payload,
  });
}

export async function updateCarStatus(userId: any, status: any) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localInfoQuery?.token}`,
  };

  const payload = JSON.stringify({
    status: status,
  });

  return axisFetch(`http://localhost:8080/xyz/car/status/${userId}`, {
    method: "PUT",
    headers: headers,
    data: payload,
  });
}

// User

export async function getUserDetails() {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch("http://localhost:8080/community/user/get", {
    method: "GET",
    headers: headers,
  });
}

export async function registerUser(
  username: any,
  firstName: any,
  lastName: any,
  password: any,
  email: any,
  userType: any,
  userBio?: any,
  status?: any,
  profileImgPath?: any
) {
  const headers = {
    "Content-Type": "application/json",
  };

  const payload = JSON.stringify({
    username: username,
    firstName: firstName,
    lastName: lastName,
    password: password,
    email: email,
    userType: userType,
    userBio: userBio,
    status: status,
    profileImgPath: profileImgPath,
  });

  return axisFetch("http://localhost:8080/community/user/create", {
    method: "POST",
    headers: headers,
    data: payload,
  });
}

export async function loginUser(username: any, password: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  const payload = JSON.stringify({ email: username, password: password });

  return axisFetch("http://localhost:8080/community/auth/login", {
    method: "POST",
    headers: headers,
    data: payload,
  });
}

export async function updateUserDetails(
  userId: any,
  firstName: any,
  lastName: any,
  userType?: any,
  userBio?: any,
  profileImgPath?: any
) {
  const headers = {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${localInfoQuery?.token}`,
  };

  const payload = JSON.stringify({
    firstName: firstName,
    lastName: lastName,
    userType: userType,
    userBio: userBio,
    profileImgPath: profileImgPath,
  });

  return axisFetch(`http://localhost:8080/community/user/put/${userId}`, {
    method: "PUT",
    headers: headers,
    data: payload,
  });
}

export async function viewUserDetailsByID(userId: any) {
  const headers = {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${localInfoQuery?.token}`,
  };

  return axisFetch(`http://localhost:8080/community/user/get/${userId}`, {
    method: "GET",
    headers: headers,
  });
}

export async function updateUserStatus(userId: any, status: any) {
  const headers = {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${localInfoQuery?.token}`,
  };

  const payload = JSON.stringify({
    status: status,
  });

  return axisFetch(
    `http://localhost:8080/community/user/put/status/${userId}`,
    {
      method: "PUT",
      headers: headers,
      data: payload,
    }
  );
}

// get Communities
export async function getCommunities() {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch("http://localhost:8080/community/get/communities", {
    method: "GET",
    headers: headers,
  });
}

// get Active Communities
export async function getActiveCommunities() {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch("http://localhost:8080/community/get/communities/active", {
    method: "GET",
    headers: headers,
  });
}

// Join Community
export async function joinCommunity(userId: any, communityId: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  const payload = JSON.stringify({
    user: userId,
    communityId: communityId,
  });

  return axisFetch(
    `http://localhost:8080/community/member/join/${userId}/${communityId}`,
    {
      method: "POST",
      headers: headers,
      data: payload,
    }
  );
}

// Unjoin community
// http://localhost:8080/community/member/unjoin/{userId}/{communityId}
export async function unjoinCommunity(userId: any, communityId: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  const payload = JSON.stringify({
    user: userId,
    communityId: communityId,
  });

  return axisFetch(
    `http://localhost:8080/community/member/unjoin/${userId}/${communityId}`,
    {
      method: "POST",
      headers: headers,
      data: payload,
    }
  );
}

// Create community
// http://localhost:8080/community/create/{userId}/community
export async function createCommunity(
  userId: any,
  communityBio: any,
  communityLogoPath: any,
  communityName: any,
  status: any
) {
  const headers = {
    "Content-Type": "application/json",
  };

  const payload = JSON.stringify({
    communityBio: communityBio,
    communityLogoPath: communityLogoPath,
    communityName: communityName,
    status: status,
  });

  return axisFetch(
    `http://localhost:8080/community/create/${userId}/community`,
    {
      method: "POST",
      headers: headers,
      data: payload,
    }
  );
}

// Followed Friend
// http://localhost:8080/community/user/followed-friends/{userId}
export async function getFollowedFriends(userId: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(
    `http://localhost:8080/community/user/followed-friends/${userId}`,
    {
      method: "GET",
      headers: headers,
    }
  );
}

// Filter Follower by status
// http://localhost:8080/community/user/friends/{userId}/{status}
export async function filterFollowerByStatus(userId: any, status: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(
    `http://localhost:8080/community/user/friends/${userId}/${status}`,
    {
      method: "GET",
      headers: headers,
    }
  );
}

// Search Friend by query
// http://localhost:8080/community/user/search
export async function searchFriendByQuery(query: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(
    `http://localhost:8080/community/user/search?query=${query}`,
    {
      method: "GET",
      headers: headers,
    }
  );
}

// Get all post
// http://localhost:8080/community/post/get
export async function getAllPosts() {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(`http://localhost:8080/community/post/get`, {
    method: "GET",
    headers: headers,
  });
}

// Filter post by status
// http://localhost:8080/community/post/filter/{status}
export async function getAllPostsByStatus(status: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(`http://localhost:8080/community/post/filter/${status}`, {
    method: "GET",
    headers: headers,
  });
}

// Create post
// http://localhost:8080/community/post/create/{userId}/{communityId}

export async function createPost(
  userId: any,
  communityId: any,
  postContent: any,
  postImgPath: any,
  postTitle: any,
  postType: any,
  status: any
) {
  const headers = {
    "Content-Type": "application/json",
  };

  const payload = JSON.stringify({
    postContent: postContent,
    postImgPath: postImgPath,
    postTitle: postTitle,
    postType: postType,
    status: status,
  });

  return axisFetch(
    `http://localhost:8080/community/post/create/${userId}/${communityId}`,
    {
      method: "POST",
      headers: headers,
      data: payload,
    }
  );
}

// Add like to post
// http://localhost:8080/community/post/add-like/{userId}/{postId}
export async function addLikeToPost(userId: any, postId: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(
    `http://localhost:8080/community/post/add-like/${userId}/${postId}`,
    {
      method: "POST",
      headers: headers,
    }
  );
}

// Add notification when there is a like
// like 0 or dislike 1
// http://localhost:8080/community/add-like/{userId}/{postId}/{targetUserId}/{notificationType}
export async function addLikeToPostNotification(
  userId: any,
  postId: any,
  targetUserId: any,
  notificationType: any
) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(
    `http://localhost:8080/community/notification/add-like/${userId}/${postId}/${targetUserId}/${notificationType}`,
    {
      method: "POST",
      headers: headers,
    }
  );
}

// Add Dislike
// http://localhost:8080/community/post/add-dislike/{userId}/{postId}
export async function addDislikeToPost(userId: any, postId: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(
    `http://localhost:8080/community/post/add-dislike/${userId}/${postId}`,
    {
      method: "POST",
      headers: headers,
    }
  );
}

// Comment on post
// http://localhost:8080/community/post/comment/{userId}/{postId}
export async function commentOnPost(userId: any, postId: any, comment: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(
    `http://localhost:8080/community/post/comment/${userId}/${postId}/${comment}`,
    {
      method: "POST",
      headers: headers,
    }
  );
}

// comment on post notification
// http://localhost:8080/community/notification/comment/{userId}/{postId}/{targetUserId}/{notificationType}
export async function commentOnPostNotification(
  userId: any,
  postId: any,
  targetUserId: any,
  notificationType: any
) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(
    `http://localhost:8080/community/notification/comment/${userId}/${postId}/${targetUserId}/${notificationType}`,
    {
      method: "POST",
      headers: headers,
    }
  );
}

// Share post
// http://localhost:8080/community/post/share/{userId}/{postId}
export async function sharePost(userId: any, postId: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(
    `http://localhost:8080/community/post/share/${userId}/${postId}`,
    {
      method: "POST",
      headers: headers,
    }
  );
}

// Share post notification
// http://localhost:8080/community/notification/share/{userId}/{postId}/{targetUserId}/{notificationType}
export async function sharePostNotification(
  userId: any,
  postId: any,
  targetUserId: any,
  notificationType: any
) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(
    `http://localhost:8080/community/notification/share/${userId}/${postId}/${targetUserId}/${notificationType}`,
    {
      method: "POST",
      headers: headers,
    }
  );
}

// Share post notification
// http://localhost:8080/community//notification/member/{userId}/{communityId}/{targetUserId}/{notificationType}
export async function joinCommunityNotification(
  userId: any,
  postId: any,
  targetUserId: any,
  notificationType: any
) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(
    `http://localhost:8080/community/notification/share/${userId}/${postId}/${targetUserId}/${notificationType}`,
    {
      method: "POST",
      headers: headers,
    }
  );
}

// Get tabulation of post
// http://localhost:8080/community/post/get/tabulation/68
export async function getPostTabulation(postId: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(
    `http://localhost:8080/community/post/get/tabulation/${postId}`,
    {
      method: "GET",
      headers: headers,
    }
  );
}

// Get Specific User Post
// http://localhost:8080/community/post/get/user/{userId}/{status}
export async function getSpecificUserPost(userId: any, status: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(
    `http://localhost:8080/community/post/get/user/${userId}/${status}`,
    {
      method: "GET",
      headers: headers,
    }
  );
}

// Update Post
// http://localhost:8080/community/post/update/{userId}/{postId}
export async function updatePost(
  userId: any,
  postId: any,
  postContent: any,
  postImgPath: any,
  postTitle: any,
  postType: any,
  status: any
) {
  const headers = {
    "Content-Type": "application/json",
  };

  const payload = JSON.stringify({
    postContent: postContent,
    postImgPath: postImgPath,
    postTitle: postTitle,
    postType: postType,
    status: status,
  });

  return axisFetch(
    `http://localhost:8080/community/post/update/${userId}/${postId}`,
    {
      method: "PUT",
      headers: headers,
      data: payload,
    }
  );
}

// Delete post
// http://localhost:8080/community//post/delete/{userId}/{postId}
export async function deletePost(userId: any, postId: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(
    `http://localhost:8080/community//post/delete/${userId}/${postId}`,
    {
      method: "POST",
      headers: headers,
    }
  );
}

// Get Total post likes from user
// http://localhost:8080/community/post/get/likes/{user}
export async function getTotalPostLikesFromUser(userId: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(`http://localhost:8080/community/post/get/likes/${userId}`, {
    method: "GET",
    headers: headers,
  });
}

// Get Total post dislikes from user
// http://localhost:8080/community/post/get/dislikes/{user}
export async function getTotalPostDisikesFromUser(userId: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(
    `http://localhost:8080/community/post/get/dislikes/${userId}`,
    {
      method: "GET",
      headers: headers,
    }
  );
}

// get Total comment on post from user
// http://localhost:8080/community/post/get/comment/{user}
export async function getTotalCommentOnPostFromUser(userId: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(
    `http://localhost:8080/community/post/get/comment/${userId}`,
    {
      method: "GET",
      headers: headers,
    }
  );
}

export async function getComment() {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(`http://localhost:8080/community/comment/get`, {
    method: "GET",
    headers: headers,
  });
}

export async function getUserByCommunity(userId: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(
    `http://localhost:8080/community/get/userbycommunity/${userId}`,
    {
      method: "GET",
      headers: headers,
    }
  );
}

// Get community member
// http://localhost:8080/community/get/community/member
export async function getAllCommunityMembers() {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(`http://localhost:8080/community/get/community/member`, {
    method: "GET",
    headers: headers,
  });
}

// notificationLogs
// http://localhost:8080/community/notificationLogs
export async function getNotificationLogs(userId: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(
    `http://localhost:8080/community/notificationLogs/${userId}`,
    {
      method: "GET",
      headers: headers,
    }
  );
}

export async function getLikes() {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(`http://localhost:8080/community/post/likes/get`, {
    method: "GET",
    headers: headers,
  });
}

export async function getShare() {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(`http://localhost:8080/community/post/share/get`, {
    method: "GET",
    headers: headers,
  });
}

// Get Like by userId and postId
// http://localhost:8080/community/post/like/get/20/97
export async function getLikeByUserAndPost(userId?: any, postId?: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(
    `http://localhost:8080/community/post/like/get/${userId}/${postId}`,
    {
      method: "GET",
      headers: headers,
    }
  );
}

// Update Status by userId, postId and Status
// http://localhost:8080/community/post/like/status/20/97/1
export async function updateLikeStatusByUserAndPost(
  userId?: any,
  postId?: any,
  status?: any
) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(
    `http://localhost:8080/community/post/like/status/${userId}/${postId}/${status}`,
    {
      method: "POST",
      headers: headers,
    }
  );
}

// Get notification by userId
// http://localhost:8080/community/notification/log/get/20
export async function getNotificationLogByUserId(userId?: any) {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(
    `http://localhost:8080/community/notification/log/get/${userId}`,
    {
      method: "GET",
      headers: headers,
    }
  );
}

// Get all notification
// http://localhost:8080/community/notification/log/get/20
export async function getAllNotification() {
  const headers = {
    "Content-Type": "application/json",
  };

  return axisFetch(`http://localhost:8080/community/notification/log/get`, {
    method: "GET",
    headers: headers,
  });
}
