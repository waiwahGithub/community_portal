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

const Community = () => {
  const widthSize = WidthSizeDetection();
  const location = useLocation();
  const [accountQuery, setAccountQuery] = useState<any>(
    localStorage.getItem("jwt_token")
  );
  const account = JSON.parse(accountQuery);
  const [communityId, setCommunityId] = useState<any>(null);
  const queryParams = new URLSearchParams(location.search);
  const paramCommunityId = queryParams.get("communityid");

  // State
  const [getCommunityData, setGetCommunityData] = useState<any>();
  const [getAllCommunityMembers, setGetAllCommunityMembers] = useState<any>();

  // API
  // Get communities
  const getAllPostsQuery = useGetAllPostsQuery();
  const getCommunitiesQuery = useGetCommunitiesQuery();
  const getAllCommunityMembersQuery = useGetAllCommunityMembersQuery();
  const getActiveCommunitiesQuery = useGetActiveCommunitiesQuery();
  const getUserByCommunityQuery = useGetUserByCommunityQuery(account?.id);
  // join
  const [isJoinBtnClicked, setIsJoinBtnClicked] = useState<boolean>(false);
  const [isJoinClicked, setIsJoinClicked] = useState<boolean>(false);
  const [isUnjoinClicked, setIsUnjoinClicked] = useState<boolean>(false);
  const [joinCommunityId, setJoinCommunityId] = useState<any>();
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
  const joinCommunity = useJoinCommunity(
    isJoinClicked,
    account?.id,
    parseFloat(paramCommunityId || "")
  );
  const unjoinCommunity = useUnjoinCommunity(
    isUnjoinClicked,
    account?.id,
    parseFloat(paramCommunityId || "")
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

  function checkUserCommunityJoin() {
    const community = getAllCommunityMembersQuery?.data?.body.find(
      (item: any) =>
        item.community.communityID === parseFloat(paramCommunityId || "") &&
        item.status === 1
    );
    if (!community) {
      return "Join";
    }

    const userFound = getAllCommunityMembersQuery?.data?.body.find(
      (item: any) => item.user.id === account?.id && item.status === 1
    );

    if (userFound) {
      return "Joined";
    } else {
      return "Join";
    }
  }

  const joinOnClicked = () => {
    if (!account?.id) {
      alert("Please login");
      return;
    }
    if (checkUserCommunityJoin() === "Join") {
      setIsJoinClicked(true);
    } else if (checkUserCommunityJoin() === "Joined") {
      setIsUnjoinClicked(true);
    }
  };

  // useEffect
  useEffect(() => {
    const communityData = getCommunitiesQuery.data?.body.find(
      (item: any) =>
        item.communityID === parseFloat(paramCommunityId || "") &&
        item.status === 1
    );
    setGetCommunityData(communityData);
  });

  useEffect(() => {
    if (unjoinCommunity.data) {
      getCommunitiesQuery?.refetch();
    }
  }, [unjoinCommunity.data]);

  useEffect(() => {
    if (joinCommunity.data) {
      getCommunitiesQuery?.refetch();
    }
  }, [joinCommunity.data]);

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
              src={getCommunityData?.communityLogoPath}
            />
          </div>
          <p className="ml-2 text-md font-medium">
            {getCommunityData?.communityName}
          </p>
          <p className="ml-2 text-sm text-gray-500 font-light">
            {countUsersInCommunities()?.[parseFloat(paramCommunityId || "")] ??
              0}{" "}
            Members
          </p>
          <RoundedButton
            text={checkUserCommunityJoin()}
            className="text-sm w-4/4 ml-2 row-end-4 bg-[#d25a5f] text-white cursor-default opacity-50"
            onClickButton={() => {}}
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
          {account?.id && (
            <AdvanceModalWithBtn
              modalOpenBtnName="Create a post"
              modalTitle="Create a post"
              className="bg-white h-10 ml-4 mb-5"
              isShowCreatePostModal={true}
              communityId={paramCommunityId}
            />
          )}
          {getAllPostsQuery?.data?.body
            ?.filter(
              (post: any) =>
                post?.community?.communityID ===
                parseFloat(paramCommunityId || "")
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
            (post: any) =>
              post?.community?.communityID ===
              parseFloat(paramCommunityId || "")
          )?.length === 0 && <p>No posts created for this community.</p>}
        </div>
        <div
          className={`${widthSize.mediumDevice ? "basis-3/12" : "basis-1/6"}`}
        >
          <div className={`mb-10 px-1 w-full lg:px-4 mt-16 `}>
            <article className="overflow-hidden rounded-lg shadow-lg bg-white">
              <header className="flex items-center justify-between leading-tight px-2 pt-2">
                <h1 className="text-lg my-3 ml-2 font-bold">About Community</h1>
              </header>
              <hr />
              <p className="px-3 my-3 text-sm text-gray-700">
                {getCommunityData?.communityBio}
              </p>
              <p className="flex px-3 py-3">
                <img
                  src={imgBase64.clockOutlineIcon}
                  className="w-[15px] h-[15px]"
                />
                <span className="text-xs text-gray-600 ml-2">
                  Created since {convertDate(getCommunityData?.createdDate)}
                </span>
              </p>
              <hr />
              <p className="text-center font-bold text-2xl my-5">
                {
                  countUsersInCommunities()?.[
                    parseFloat(paramCommunityId || "")
                  ]
                }{" "}
                Members
              </p>
              <hr />
              <p className="font-medium px-3 text-sm pt-3">Admin</p>
              <p className="flex px-3 pb-3">
                <img
                  src={getCommunityData?.user?.profileImgPath}
                  className="w-[40px] rounded-full"
                />
                <span className="text-sm text-gray-600 mt-2 ml-4">
                  {`${getCommunityData?.user?.firstName} ${getCommunityData?.user?.lastName}`}
                </span>
              </p>
              <hr />
              <p
                className="text-center text-sm py-3 hover:bg-gray-100 hover:cursor-pointer"
                onClick={joinOnClicked}
              >
                {checkUserCommunityJoin() === "Joined"
                  ? "Leave community"
                  : "Join community"}
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

export default Community;
