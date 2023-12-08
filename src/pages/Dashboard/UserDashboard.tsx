import { useState } from "react";
import WidthSizeDetection from "../../assets/config/WidthSizeDetection";
import Nav from "../../components/Nav/Nav";
import SideBar from "../../components/SideBar/SideBar";
import { RoundedButton } from "../../components/button/Button";
import CommunityModal from "../../components/modal/CommunityModal";
import Post from "../../components/post/Post";
import RowStandardModal from "../../components/modal/RowStandardModal";
import {
  useGetAllPostsQuery,
  useGetCommentQuery,
  useGetLikesQuery,
} from "../../hooks/use-PostQuery";
import { useGetNotificationLogByUserIdQuery } from "../../hooks/use-NotificationQuery";

const UserDashboard = () => {
  const widthSize = WidthSizeDetection();

  // State
  const [hasNotification, setHasNotification] = useState<any>(true);
  const [accountQuery, setAccountQuery] = useState<any>(
    localStorage.getItem("jwt_token")
  );
  const account = JSON.parse(accountQuery);

  // API
  const getAllPostsQuery = useGetAllPostsQuery();
  const getLikesQuery = useGetLikesQuery();
  const getCommentQuery = useGetCommentQuery();

  // Functional Events
  const countTotalPost = () => {
    const totalPostCountByUserId: any = {};

    getAllPostsQuery?.data?.body.forEach((item: any) => {
      const userId = item?.user?.id;
      if (userId) {
        if (totalPostCountByUserId[userId]) {
          totalPostCountByUserId[userId]++;
        } else {
          totalPostCountByUserId[userId] = 1;
        }
      }
    });

    return totalPostCountByUserId;
  };

  const countTotalLike = () => {
    const totalLikeCountByType: any = {};

    getLikesQuery?.data?.body.forEach((item: any) => {
      const userId = item?.user?.id;
      const status = item?.status;
      if (status === 1) {
        if (totalLikeCountByType[userId]) {
          totalLikeCountByType[userId]++;
        } else {
          totalLikeCountByType[userId] = 1;
        }
      }
    });

    return totalLikeCountByType;
  };

  const countTotalComment = () => {
    const totalCommentCount: any = {};

    getCommentQuery?.data?.body.forEach((item: any) => {
      const userId = item?.user?.id;
      const status = item?.status;
      if (status === 1) {
        if (totalCommentCount[userId]) {
          totalCommentCount[userId]++;
        } else {
          totalCommentCount[userId] = 1;
        }
      }
    });

    return totalCommentCount;
  };

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
          className={`${widthSize.mediumDevice ? "basis-7/12" : "basis-6/12"}`}
        >
          <p className="ml-4 mb-5 text-2xl font-bold">My Dashboard</p>
          <hr className="basis-1/2 pt-4 mt-4 space-y-2 font-medium border-t border-gray-200" />
          <div className="flex">
            <div className={`mb-0 px-1 w-1/3 lg:px-4 mt-16 `}>
              <article className="overflow-hidden rounded-lg shadow-lg bg-white text-center py-20">
                <p className="font-bold text-[60px]">
                  {countTotalPost()[account?.id]}
                </p>
                <p>Total Posts</p>
              </article>
            </div>
            <div className={`mb-0 px-1 w-1/3 lg:px-4 mt-16 `}>
              <article className="overflow-hidden rounded-lg shadow-lg bg-white text-center py-20">
                <p className="font-bold text-[60px]">154</p>
                <p>Total Following</p>
              </article>
            </div>
            <div className={`mb-0 px-1 w-1/3 lg:px-4 mt-16 `}>
              <article className="overflow-hidden rounded-lg shadow-lg bg-white text-center py-20">
                <p className="font-bold text-[60px]">34</p>
                <p>Total Followers</p>
              </article>
            </div>
          </div>
          <div className="flex">
            <div className={`mb-10 px-1 w-2/4 lg:px-4 mt-6 `}>
              <article className="overflow-hidden rounded-lg shadow-lg bg-white text-center py-20">
                <p className="font-bold text-[60px]">
                  {countTotalLike()[account?.id]}
                </p>
                <p>Total Likes</p>
              </article>
            </div>
            <div className={`mb-10 px-1 w-2/4 lg:px-4 mt-6 `}>
              <article className="overflow-hidden rounded-lg shadow-lg bg-white text-center py-20">
                <p className="font-bold text-[60px]">
                  {countTotalComment()[account?.id]}
                </p>
                <p>Total Comments</p>
              </article>
            </div>
          </div>
        </div>
        <div
          className={`${widthSize.mediumDevice ? "basis-3/12" : "basis-1/6"}`}
        ></div>
      </div>
    </div>
  );
};

export default UserDashboard;
