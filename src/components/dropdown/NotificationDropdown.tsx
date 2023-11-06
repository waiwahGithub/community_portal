import { useState, useEffect, useRef } from "react";
import { imgBase64 } from "../../assets/base64/imgBase64";
import Link from "../link/Link";
import RowStandardModal from "../modal/RowStandardModal";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <img
        className="bg-gray-100 rounded-full w-[25px] h-[25px]  mt-1 mr-5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        src={imgBase64.notificationIcon}
      />
      {isOpen && (
        <div
          ref={dropdownRef}
          className="px-2 origin-top-right absolute right-0 mt-2 w-72 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div className="py-2">
            <span className="text-sm font-bold pl-4">Notifications</span>
            <ul className="mt-3">
              <li>
                <RowStandardModal
                  isNotificationModal={true}
                  notificationTime={6}
                  notificationName="Kelvin liked your post"
                />
              </li>
              <li>
                <RowStandardModal
                  isNotificationModal={true}
                  notificationTime={7}
                  notificationName="Gilbert shared your post"
                />
              </li>
              <li>
                <RowStandardModal
                  isNotificationModal={true}
                  notificationTime={8}
                  notificationName="Era commented your post"
                />
              </li>
              <li>
                <RowStandardModal
                  isNotificationModal={true}
                  notificationTime={9}
                  notificationName="John followed you"
                />
              </li>
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
