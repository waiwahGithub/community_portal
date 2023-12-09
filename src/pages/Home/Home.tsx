import WidthSizeDetection from "../../assets/config/WidthSizeDetection";
import Nav from "../../components/Nav/Nav";
import SideBar from "../../components/SideBar/SideBar";
import CommunityModal from "../../components/modal/CommunityModal";
import AdvanceModalWithBtn from "../../components/modal/AdvanceModalWithButton";
import Post from "../../components/post/Post";
import {
  useAddDislikeToPostQuery,
  useAddLikeToPostQuery,
  useGetAllPostsQuery,
  useGetLikeByUserAndPostQuery,
  useGetLikesQuery,
  useGetPostTabulationQuery,
  useGetShareQuery,
  useSharePostQuery,
} from "../../hooks/use-PostQuery";
import { useEffect, useRef, useState } from "react";
import { useGetCommunitiesQuery } from "../../hooks/use-CommunityQuery";
import { posix } from "path";
import {
  useAddLikeToPostNotificationQuery,
  useSharePostNotificationQuery,
  useUpdateUserNotificationStatusQuery,
} from "../../hooks/use-NotificationQuery";

const Home = () => {
  const widthSize = WidthSizeDetection();
  const [accountQuery, setAccountQuery] = useState<any>(
    localStorage.getItem("jwt_token")
  );
  const account = JSON.parse(accountQuery);

  // State
  const [isLikeClicked, setIsLikeClicked] = useState<boolean>(false);
  const [isDislikeClicked, setIsDislikeClicked] = useState<boolean>(false);
  const [getPostId, setGetPostId] = useState<any>();
  const [likeCountCal, setLikeCountCal] = useState<any>();
  const [changeLikeStatus, setChangeLikeStatus] = useState<any>();
  const [changeDislikeStatus, setChangeDislikeStatus] = useState<any>();
  const [likesUpdated, setLikesUpdated] = useState<boolean>(false);
  const [getAllPostsData, setGetAllPostsData] = useState<any>();
  const [likeStatuses, setLikeStatuses] = useState<any>({});
  const [likeCounts, setLikeCounts] = useState<any>({});
  const [tempLikeCounts, setTempLikeCounts] = useState<any>({});
  const [targetedUserId, setTargetedUserId] = useState<any>();
  const [isSharedClicked, setIsSharedClicked] = useState<boolean>(false);

  // API
  const getAllPostsQuery = useGetAllPostsQuery();
  const getLikesQuery = useGetLikesQuery();
  const addLikeToPostQuery = useAddLikeToPostQuery(
    isLikeClicked,
    account?.id,
    getPostId
  );
  const addDislikeToPostQuery = useAddDislikeToPostQuery(
    isDislikeClicked,
    account?.id,
    getPostId
  );
  const addLikeToPostNotificationQuery1 = useAddLikeToPostNotificationQuery(
    isLikeClicked,
    account?.id,
    getPostId,
    targetedUserId,
    0
  );
  const addLikeToPostNotificationQuery2 = useAddLikeToPostNotificationQuery(
    isDislikeClicked,
    account?.id,
    getPostId,
    targetedUserId,
    1
  );
  const sharePostNotificationQuery = useSharePostNotificationQuery(
    isSharedClicked,
    account?.id,
    getPostId,
    targetedUserId,
    3
  );
  const updateUserNotificationStatusQuery =
    useUpdateUserNotificationStatusQuery(
      isLikeClicked || isDislikeClicked || isSharedClicked,
      targetedUserId,
      1
    );

  // Funtional Events
  const convertDateTime = (createdDate: any) => {
    const currentDate = new Date().getTime();
    const difference = currentDate - createdDate;

    const minutesAgo = Math.floor(difference / (1000 * 60));
    const hoursAgo = Math.floor(difference / (1000 * 60 * 60));
    const daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (minutesAgo < 60) {
      return `${minutesAgo} min${minutesAgo !== 1 ? "s" : ""} ago`;
    } else if (hoursAgo < 24) {
      return `${hoursAgo} hr${hoursAgo !== 1 ? "s" : ""} ago`;
    } else {
      return `${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`;
    }
  };

  const likeBtnFromHome = (
    postId: any,
    likeStatus?: any,
    targetedUserId?: any
  ) => {
    if (!account?.id) {
      alert("Please login");
      return;
    }
    localStorage.setItem("needRefreshQuery", "true");
    setGetPostId(postId);
    setTargetedUserId(targetedUserId);
    setIsLikeClicked(true);

    setLikeStatuses((prevStatuses: any) => ({
      ...prevStatuses,
      [postId]: true,
    }));

    setTempLikeCounts((prevCounts: any) => ({
      ...prevCounts,
      [postId]: (prevCounts[postId] || likeCounts[postId] || 0) + 1,
    }));
  };

  const dislikeBtnFromHome = (
    postId: any,
    likeStatus?: any,
    targetedUserId?: any
  ) => {
    if (!account?.id) {
      alert("Please login");
      return;
    }

    localStorage.setItem("needRefreshQuery", "true");

    setGetPostId(postId);
    setTargetedUserId(targetedUserId);
    setIsDislikeClicked(true);

    setLikeStatuses((prevStatuses: any) => ({
      ...prevStatuses,
      [postId]: false,
    }));

    setTempLikeCounts((prevCounts: any) => ({
      ...prevCounts,
      [postId]: (prevCounts[postId] || likeCounts[postId] || 0) - 1,
    }));
  };

  function countLikeInPost() {
    const likeCount: any = {};

    getLikesQuery?.data?.body.forEach((item: any) => {
      const postID = item.post.postID;
      const status = item.status || 0;

      if (status === 1) {
        if (likeCount[postID]) {
          likeCount[postID]++;
        } else {
          likeCount[postID] = 1;
        }
      } else if (status === 0) {
        if (likeCount[postID]) {
          likeCount[postID]--;
        } else {
          likeCount[postID] = -1;
        }
      }
    });

    return likeCount;
  }

  // useEffect
  useEffect(() => {
    if (getAllPostsQuery?.data) {
      setGetAllPostsData(getAllPostsQuery?.data?.body);
    }
  }, [getAllPostsQuery?.data]);

  useEffect(() => {
    if (isLikeClicked || isDislikeClicked) {
      refetch();
    }
  }, [isLikeClicked, isDislikeClicked]);

  const refetch = () => {
    getAllPostsQuery.refetch();

    const postsData = getAllPostsQuery?.data?.body || [];
    setGetAllPostsData(postsData);

    // clear state
    setIsLikeClicked(false);
    setIsDislikeClicked(false);
    setGetPostId(null);
    // clear state
    setIsLikeClicked(false);
    setIsDislikeClicked(false);
    setGetPostId(null);
  };

  useEffect(() => {
    if (getAllPostsQuery?.data) {
      const postsData = getAllPostsQuery?.data?.body || [];
      const initialLikeCounts: any = {};

      postsData.forEach((post: any) => {
        initialLikeCounts[post.postID] = post.likes.length;
      });

      setGetAllPostsData(postsData);
      setLikeCounts(initialLikeCounts);
    }

    // Update likeCounts with temporary values after API call
    setLikeCounts((prevCounts: any) => ({
      ...prevCounts,
      ...tempLikeCounts,
    }));
  }, [getAllPostsQuery?.data, tempLikeCounts]);

  useEffect(() => {
    if (addLikeToPostQuery.data) {
      getLikesQuery?.refetch();
    }
  }, [addLikeToPostQuery.data]);

  useEffect(() => {
    if (addDislikeToPostQuery.data) {
      getLikesQuery?.refetch();
    }
  }, [addDislikeToPostQuery.data]);

  return (
    <div className="bg-[#F0F2F5] min-h-screen ">
      <Nav />
      <SideBar />
      <div className="flex pt-28">
        <div
          className={`flex ${
            widthSize.mediumDevice ? "w-2/12 mr-14" : "w-3/12 mr-5"
          } `}
        ></div>
        <div
          className={`${widthSize.mediumDevice ? "basis-6/12" : "basis-5/12"}`}
        >
          <AdvanceModalWithBtn
            modalOpenBtnName="Create a post"
            modalTitle="Create a post"
            className="bg-white h-10 ml-4 mb-5"
            isShowCreatePostModal={true}
          />
          {getAllPostsData
            ?.sort((a: any, b: any) => {
              const dateA: any = new Date(a.createdDate);
              const dateB: any = new Date(b.createdDate);
              return dateB - dateA;
            })
            .map((post: any, index: any) => {
              const matchingLike = post?.likes?.find(
                (like: any) => like.user.id === account?.id
              );

              if (post?.postType === "post" && post?.status === 1)
                return (
                  <Post
                    key={index}
                    postId={post?.postID}
                    postTitle={post?.postTitle}
                    postContent={post?.postContent}
                    profileImgSrc={post?.postImgPath}
                    likeCount={countLikeInPost()[post?.postID]}
                    commentCount={12}
                    targetedUserId={post?.user?.id}
                    nameAndDate={
                      post?.user?.firstName +
                      " . " +
                      convertDateTime(post?.createdDate)
                    }
                    isLikeStatus={
                      likeStatuses[post?.postID] !== undefined
                        ? likeStatuses[post?.postID]
                        : matchingLike?.status === 1
                    }
                    isDisikeStatus={
                      likeStatuses[post.postID] !== undefined
                        ? !likeStatuses[post.postID]
                        : matchingLike?.status === 0
                    }
                    isHomePage={true}
                    likeBtnFromHome={() => {
                      likeBtnFromHome(
                        post?.postID,
                        matchingLike?.status,
                        post?.user?.id
                      );
                    }}
                    dislikeBtnFromHome={() => {
                      dislikeBtnFromHome(
                        post?.postID,
                        matchingLike?.status,
                        post?.user?.id
                      );
                    }}
                  />
                );
            })}
        </div>
        <div
          className={`${widthSize.mediumDevice ? "basis-3/12" : "basis-1/6"}`}
        >
          <CommunityModal />
        </div>
      </div>
    </div>
  );
};

export default Home;
