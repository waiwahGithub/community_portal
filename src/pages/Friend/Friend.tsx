import { imgBase64 } from "../../assets/base64/imgBase64";
import WidthSizeDetection from "../../assets/config/WidthSizeDetection";
import Nav from "../../components/Nav/Nav";
import { RoundedButton } from "../../components/button/Button";
import CommunityModal from "../../components/modal/CommunityModal";
import AdvanceModalWithBtn from "../../components/modal/AdvanceModalWithButton";
import Post from "../../components/post/Post";
import {
  useGetCommunitiesQuery,
  useGetActiveCommunitiesQuery,
  useJoinCommunity,
  useUnjoinCommunity,
  useCreateCommunityQuery,
  useGetUserByCommunityQuery,
  useGetAllCommunityMembersQuery,
} from "../../hooks/use-CommunityQuery";
import { useEffect, useRef, useState } from "react";
import { useGetAllPostsQuery } from "../../hooks/use-PostQuery";
import { useLocation } from "react-router-dom";
import useGetUserDetailsQuery from "../../hooks/use-GetUserDetailsQuery";
import {
  useFollowFriendQuery,
  useGetAllFollowListQuery,
  useUnfollowFriendQuery,
} from "../../hooks/use-FriendQuery";

const Friend = () => {
  const widthSize = WidthSizeDetection();
  const location = useLocation();
  const [accountQuery, setAccountQuery] = useState<any>(
    localStorage.getItem("jwt_token")
  );
  const account = JSON.parse(accountQuery);
  const [communityId, setCommunityId] = useState<any>(null);
  const queryParams = new URLSearchParams(location.search);
  const paramFriendId = queryParams.get("friendid");

  // State
  const [getUserData, setGetUserData] = useState<any>();
  const [getAllCommunityMembers, setGetAllCommunityMembers] = useState<any>();
  const [isJoinClicked, setIsJoinClicked] = useState<boolean>(false);
  const [isUnjoinClicked, setIsUnjoinClicked] = useState<boolean>(false);

  // API
  // Get communities
  const getAllPostsQuery = useGetAllPostsQuery();
  const getCommunitiesQuery = useGetCommunitiesQuery();
  const getAllCommunityMembersQuery = useGetAllCommunityMembersQuery();
  const getUserDetailsQuery = useGetUserDetailsQuery();
  const getAllFollowListQuery = useGetAllFollowListQuery();
  // join
  const [isJoinBtnClicked, setIsJoinBtnClicked] = useState<boolean>(false);
  const joinCommunity = useJoinCommunity(
    isJoinBtnClicked,
    account?.id,
    communityId
  );
  // unjoin
  const [isUnjoinBtnClicked, setIsUnjoinBtnClicked] = useState<boolean>(false);
  const unjoinCommunity = useUnjoinCommunity(
    isUnjoinBtnClicked,
    account?.id,
    communityId
  );
  // create community
  const [isCreateCommunityBtnClicked, setIsCreateCommunityBtnClicked] =
    useState<boolean>(false);
  const [communityBio, setcommunityBio] = useState<any>(null);
  const [communityLogoPath, setcommunityLogoPath] = useState<any>(null);
  const [communityName, setcommunityName] = useState<any>(null);
  const createCommunityQuery = useCreateCommunityQuery(
    isCreateCommunityBtnClicked,
    account?.id,
    communityBio,
    communityLogoPath,
    communityName
  );
  const followFriendQuery = useFollowFriendQuery(
    isJoinClicked,
    account?.id,
    parseFloat(paramFriendId || "")
  );
  const unfollowFriendQuery = useUnfollowFriendQuery(
    isUnjoinClicked,
    account?.id,
    parseFloat(paramFriendId || "")
  );

  // Functional Events
  // click on the button to setEnabled to true so that useJoinCommunity() will get trigger and run
  const onJoinCommunityBtnClicked = () => {
    setIsJoinBtnClicked(true);
  };

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

  const convertDate = (dateTime?: any) => {
    const date = new Date(dateTime);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const year = date.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    return `${day} ${month}, ${year}`;
  };

  function countUsersInCommunities() {
    const communityUsersCount: any = {};

    getAllCommunityMembersQuery?.data?.body.forEach((item: any) => {
      const communityID = item.community.communityID;
      const status = item.status;
      if (status === 1) {
        if (communityUsersCount[communityID]) {
          communityUsersCount[communityID]++;
        } else {
          communityUsersCount[communityID] = 1;
        }
      }
    });

    return communityUsersCount;
  }

  const countUserFollowers = () => {
    const totalFollowers: any = {};

    getAllFollowListQuery?.data?.body.forEach((item: any) => {
      const friendID = item?.friendID;
      const status = item?.status;
      if (status === 1) {
        if (totalFollowers[friendID]) {
          totalFollowers[friendID]++;
        } else {
          totalFollowers[friendID] = 1;
        }
      }
    });

    return totalFollowers;
  };

  function checkFriendFollow() {
    const friendFollow = getAllFollowListQuery?.data?.body.find(
      (item: any) =>
        item.friendID === parseFloat(paramFriendId || "") &&
        item.status === 1 &&
        item?.user?.id === account?.id
    );
    if (!friendFollow) {
      return "Follow";
    }

    const userFound = getAllFollowListQuery?.data?.body.find(
      (item: any) =>
        item.friendID === parseFloat(paramFriendId || "") &&
        item.status === 1 &&
        item?.user?.id === account?.id
    );

    if (userFound) {
      return "Unfollow";
    } else {
      return "Follow";
    }
  }

  const joinOnClicked = () => {
    if (checkFriendFollow() === "Follow") {
      setIsJoinClicked(true);
    } else if (checkFriendFollow() === "Unfollow") {
      setIsUnjoinClicked(true);
    }
  };

  // useEffect
  useEffect(() => {
    const userData = getUserDetailsQuery.data?.body.find(
      (item: any) =>
        item.id === parseFloat(paramFriendId || "") && item.status === 1
    );
    setGetUserData(userData);
  });

  useEffect(() => {
    if (followFriendQuery.data) {
      window.location.reload();
    }
  }, [followFriendQuery.data]);

  useEffect(() => {
    if (unfollowFriendQuery.data) {
      window.location.reload();
    }
  }, [unfollowFriendQuery.data]);

  return (
    <div className="bg-[#F0F2F5] min-h-screen ">
      <Nav />
      <div
        className={`mt-28 bg-white flex ${
          widthSize.mediumDevice ? "px-[150px]" : "px-[320px]"
        }`}
      >
        <div className="grid grid-rows-2 grid-flow-col w-[400px] justify-center align-middle justify-items-start mb-10">
          <div className="row-span-3">
            <img
              alt="Placeholder"
              className="block rounded-full h-auto w-16"
              src={getUserData?.profileImgPath}
            />
          </div>
          <p className="ml-2 text-md font-medium">{`${getUserData?.firstName} ${getUserData?.lastName}`}</p>
          <p className="ml-2 text-sm text-gray-500 font-light">
            {countUserFollowers()?.[parseFloat(paramFriendId || "")] ?? 0}{" "}
            Followers
          </p>
          <RoundedButton
            text={checkFriendFollow()}
            className="text-sm w-3/4 ml-2 row-end-4 bg-[#d25a5f] text-white mr-5"
            onClickButton={joinOnClicked}
          />
        </div>
      </div>
      <div className="flex pt-10">
        <div
          className={`flex ${
            widthSize.mediumDevice ? "w-2/12" : "w-2/12 mr-20"
          } `}
        ></div>
        <div
          className={`${widthSize.mediumDevice ? "basis-6/12" : "basis-5/12"}`}
        >
          {/* <AdvanceModalWithBtn
            modalOpenBtnName="Create a post"
            modalTitle="Create a post"
            className="bg-white h-10 ml-4 mb-5"
            isShowCreatePostModal={true}
            communityId={paramFriendId}
          /> */}
          {getAllPostsQuery?.data?.body
            ?.filter(
              (post: any) => post?.user?.id === parseFloat(paramFriendId || "")
            )
            ?.sort((a: any, b: any) => {
              const dateA: any = new Date(a.createdDate);
              const dateB: any = new Date(b.createdDate);
              return dateB - dateA;
            })
            .map((post: any, index: any) => (
              <Post
                key={index}
                postId={post?.postID}
                postTitle={post?.postTitle}
                postContent={post?.postContent}
                profileImgSrc={post?.postImgPath}
                likeCount={12}
                commentCount={12}
                shareCount={45}
                targetedUserId={post?.user?.id}
                nameAndDate={
                  post?.user?.firstName +
                  " . " +
                  convertDateTime(post?.createdDate)
                }
              />
            ))}
          {getAllPostsQuery?.data?.body?.filter(
            (post: any) => post?.user?.id === parseFloat(paramFriendId || "")
          )?.length === 0 && <p>No posts created for this user.</p>}
        </div>
        <div
          className={`${widthSize.mediumDevice ? "basis-3/12" : "basis-1/6"}`}
        >
          <div className={`mb-10 px-1 w-full lg:px-4 mt-16 `}>
            <article className="overflow-hidden rounded-lg shadow-lg bg-white">
              <header className="flex items-center justify-between leading-tight px-2 pt-2">
                <h1 className="text-lg my-3 ml-2 font-bold">About User</h1>
              </header>
              <hr />
              <p className="px-3 my-3 text-sm text-gray-700">
                {getUserData?.communityBio}
              </p>
              <p className="flex px-3 py-3">
                <img
                  src={imgBase64.clockOutlineIcon}
                  className="w-[15px] h-[15px]"
                />
                <span className="text-xs text-gray-600 ml-2">
                  Created since {convertDate(getUserData?.createdDate)}
                </span>
              </p>
              <hr />
              <p className="text-center font-bold text-2xl my-5">
                {countUserFollowers()?.[parseFloat(paramFriendId || "")] ?? 0}{" "}
                Followers
              </p>
              <hr />
              <p className="font-medium px-3 text-sm pt-3">User</p>
              <p className="flex px-3 pb-3">
                <img
                  src={getUserData?.profileImgPath}
                  className="w-[40px] rounded-full"
                />
                <span className="text-sm text-gray-600 mt-2 ml-4">
                  {`${getUserData?.firstName} ${getUserData?.lastName}`}
                </span>
              </p>
              <hr />
              <p
                className="text-center text-sm py-3 hover:bg-gray-100 hover:cursor-pointer"
                onClick={joinOnClicked}
              >
                {checkFriendFollow()}
              </p>
              <footer className="flex items-center justify-between"></footer>
            </article>
          </div>
          <CommunityModal />
        </div>
      </div>
    </div>
  );
};

export default Friend;
