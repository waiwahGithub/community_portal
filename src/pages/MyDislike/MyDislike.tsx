import { useState } from "react";
import WidthSizeDetection from "../../assets/config/WidthSizeDetection";
import Nav from "../../components/Nav/Nav";
import SideBar from "../../components/SideBar/SideBar";
import { RoundedButton } from "../../components/button/Button";
import CommunityModal from "../../components/modal/CommunityModal";
import Post from "../../components/post/Post";
import RowStandardModal from "../../components/modal/RowStandardModal";
import {
  useGetAllNotificationQuery,
  useGetNotificationLogByUserIdQuery,
} from "../../hooks/use-NotificationQuery";

const MyDislike = () => {
  // Global
  const widthSize = WidthSizeDetection();
  const [accountQuery, setAccountQuery] = useState<any>(
    localStorage.getItem("jwt_token")
  );
  const account = JSON.parse(accountQuery);

  // State
  const [hasNotification, setHasNotification] = useState<any>(true);

  // API
  const getNotificationLogByUserIdQuery = useGetNotificationLogByUserIdQuery(
    account?.id
  );

  // Functional events
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
          <p className="ml-4 mb-5 text-2xl font-bold">My Disikes</p>
          <hr className="basis-1/2 pt-4 mt-4 space-y-2 font-medium border-t border-gray-200" />
          {!hasNotification && (
            <p className="ml-4 mb-5 text-md font-bold">
              You haven't dislike any post yet
            </p>
          )}
          {!account?.id && (
            <p className="ml-4 mb-5 text-md font-bold">
              Please login to see your dislikes
            </p>
          )}
          {getNotificationLogByUserIdQuery?.data?.body
            ?.sort((a: any, b: any) => {
              const dateA: any = new Date(a.createdDate);
              const dateB: any = new Date(b.createdDate);
              return dateB - dateA;
            })
            .map((log: any, index: any) => {
              const getNotificationType = () => {
                let type: any = "";
                if (log?.notificationType === 0) {
                  type = "liked";
                } else if (log?.notificationType === 1) {
                  type = "disliked";
                } else if (log?.notificationType === 2) {
                  type = "commented";
                } else if (log?.notificationType === 3) {
                  type = "shared";
                }

                return type;
              };
              if (log?.notificationType === 1)
                return (
                  <RowStandardModal
                    key={index}
                    logoPath={log?.user?.profileImgPath}
                    isNotificationModal={true}
                    notificationTime={convertDateTime(log?.createdDate)}
                    notificationName={`You ${getNotificationType()} this `}
                    notificationLink={`http://localhost:3000/post/post-detail?postId=${log?.post?.postID}`}
                    className="bg-white rounded-lg mb-4"
                  />
                );
            })}
        </div>
        {/* <div
          className={`${widthSize.mediumDevice ? "basis-3/12" : "basis-1/6"}`}
        >
          <div className={`mb-10 px-1 w-full lg:px-4 mt-16 `}>
            <article className="overflow-hidden rounded-lg shadow-lg bg-white">
              <header className="flex items-center justify-between leading-tight px-2 pt-2">
                <h1 className="text-lg mt-3 ml-2">Filter</h1>
              </header>
              <div className="px-4 py-4">
                <RoundedButton text="Like" className="mr-3 mb-3" />
                <RoundedButton text="Dislike" className="mr-3 mb-3" />
                <RoundedButton text="Follow" className="mr-3 mb-3" />
                <RoundedButton text="Unfollow" className="mr-3 mb-3" />
                <RoundedButton text="All" className="mr-3 mb-3 bg-gray-100" />
              </div>
            </article>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MyDislike;
