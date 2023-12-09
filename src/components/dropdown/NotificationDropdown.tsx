import { useState, useEffect, useRef } from "react";
import { imgBase64 } from "../../assets/base64/imgBase64";
import Link from "../link/Link";
import RowStandardModal from "../modal/RowStandardModal";
import {
  useGetNotificationLogByUserIdQuery,
  useUpdateUserNotificationStatusQuery,
} from "../../hooks/use-NotificationQuery";
import useGetUserDetailsQuery from "../../hooks/use-GetUserDetailsQuery";

const NotificationDropdown = () => {
  // Global
  const [accountQuery, setAccountQuery] = useState<any>(
    localStorage.getItem("jwt_token")
  );
  const account = JSON.parse(accountQuery);
  const [needRefreshQuery, setNeedRefreshQuery] = useState<any>(
    localStorage.getItem("needRefreshQuery")
  );

  setInterval(() => {
    setNeedRefreshQuery(localStorage.getItem("needRefreshQuery"));
  }, 1000);

  // State
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>(null);
  const [isNotificationClick, setIsNotificationClick] =
    useState<boolean>(false);
  const [getUserData, setGetUserData] = useState<any>();

  // API
  const getNotificationLogByUserIdQuery = useGetNotificationLogByUserIdQuery(
    account?.id
  );
  const updateUserNotificationStatusQuery =
    useUpdateUserNotificationStatusQuery(isNotificationClick, account?.id, 0);
  const getUserDetailsQuery = useGetUserDetailsQuery();

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

  // useEffect
  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        localStorage.setItem("needRefreshQuery", "false");
        getNotificationLogByUserIdQuery?.refetch();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (needRefreshQuery === "true") {
      getNotificationLogByUserIdQuery?.refetch();
    }
  }, [needRefreshQuery]);

  return (
    <div className="relative inline-block text-left">
      <img
        className="bg-gray-100 rounded-full w-[25px] h-[25px]  mt-1 mr-5 cursor-pointer"
        onClick={() => {
          getNotificationLogByUserIdQuery?.refetch();
          localStorage.setItem("needRefreshQuery", "false");
          setIsNotificationClick(true);
          setIsOpen(!isOpen);
        }}
        src={
          getUserData?.notificationStatus === 1
            ? imgBase64.notificationIcon
            : imgBase64.notificationIcon
        }
      />

      {needRefreshQuery === "true" && (
        <div className="absolute top-0 left-0 h-3 w-3 bg-red-700 rounded-full"></div>
      )}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="px-2 origin-top-right absolute right-0 mt-2 w-72 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div className="py-2">
            <span className="text-sm font-bold pl-4">Notifications</span>
            <ul className="mt-3">
              {Array.isArray(getNotificationLogByUserIdQuery?.data?.body) &&
                getNotificationLogByUserIdQuery?.data?.body
                  ?.sort((a: any, b: any) => {
                    const dateA: any = new Date(a.createdDate);
                    const dateB: any = new Date(b.createdDate);
                    return dateB - dateA;
                  })
                  .slice(0, 4)
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
                    return (
                      <li>
                        <RowStandardModal
                          key={index}
                          logoPath={log?.user?.profileImgPath}
                          isNotificationModal={true}
                          notificationTime={convertDateTime(log?.createdDate)}
                          notificationName={`${
                            log?.user?.firstName
                          } ${getNotificationType()} your post`}
                        />
                      </li>
                    );
                  })}
            </ul>
            <div className="text-center mb-2">
              <Link
                text="See more"
                className="text-xs underline hover:text-gray-700 hover:cursor-pointer"
                path="/notifications"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
