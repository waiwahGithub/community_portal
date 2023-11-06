import { useState } from "react";
import WidthSizeDetection from "../../assets/config/WidthSizeDetection";
import Nav from "../../components/Nav/Nav";
import SideBar from "../../components/SideBar/SideBar";
import { RoundedButton } from "../../components/button/Button";
import CommunityModal from "../../components/modal/CommunityModal";
import Post from "../../components/post/Post";
import RowStandardModal from "../../components/modal/RowStandardModal";

const Notifications = () => {
  const widthSize = WidthSizeDetection();
  const [hasNotification, setHasNotification] = useState<any>(true);

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
          <p className="ml-4 mb-5 text-2xl font-bold">Notification</p>
          <hr className="basis-1/2 pt-4 mt-4 space-y-2 font-medium border-t border-gray-200" />
          {!hasNotification && (
            <p className="ml-4 mb-5 text-md font-bold">
              You don't have any notification yet
            </p>
          )}

          <RowStandardModal
            isNotificationModal={true}
            notificationTime={9}
            notificationName="John followed you"
            className="bg-white rounded-lg mb-4"
          />
          <RowStandardModal
            isNotificationModal={true}
            notificationTime={9}
            notificationName="John followed you"
            className="bg-white rounded-lg mb-4"
          />
          <RowStandardModal
            isNotificationModal={true}
            notificationTime={9}
            notificationName="John followed you"
            className="bg-white rounded-lg mb-4"
          />
          <RowStandardModal
            isNotificationModal={true}
            notificationTime={9}
            notificationName="John followed you"
            className="bg-white rounded-lg mb-4"
          />
          <RowStandardModal
            isNotificationModal={true}
            notificationTime={9}
            notificationName="John followed you"
            className="bg-white rounded-lg mb-4"
          />
          <RowStandardModal
            isNotificationModal={true}
            notificationTime={9}
            notificationName="John followed you"
            className="bg-white rounded-lg mb-4"
          />
          <RowStandardModal
            isNotificationModal={true}
            notificationTime={9}
            notificationName="John followed you"
            className="bg-white rounded-lg mb-4"
          />
          <RowStandardModal
            isNotificationModal={true}
            notificationTime={9}
            notificationName="John followed you"
            className="bg-white rounded-lg mb-4"
          />
        </div>
        <div
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
        </div>
      </div>
    </div>
  );
};

export default Notifications;
