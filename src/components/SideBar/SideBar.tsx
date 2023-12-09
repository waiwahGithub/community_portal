import { useLocation, useNavigate } from "react-router-dom";
import { imgBase64 } from "../../assets/base64/imgBase64";
import WidthSizeDetection from "../../assets/config/WidthSizeDetection";
import ImageContainer from "../image/Image";
import Link from "../link/Link";
import { useState } from "react";

const SideBar = () => {
  const widthSize = WidthSizeDetection();
  const navigate = useNavigate();
  const location = useLocation();
  const [accountQuery, setAccountQuery] = useState<any>(
    localStorage.getItem("jwt_token")
  );
  const account = JSON.parse(accountQuery);

  const signOuBtnHandler = () => {
    localStorage.removeItem("fb_info");
    localStorage.removeItem("jwt_token");
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40  h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 ${
          widthSize.mediumDevice ? "w-1/5" : "w-1/4"
        }`}
        aria-label="Sidebar"
      >
        <div
          className={`h-full px-3 pb-4 overflow-y-auto bg-white ${
            widthSize.mediumDevice ? "pt-5" : "pt-20"
          }`}
        >
          <ul className="space-y-2 font-medium">
            <li className="flex flex-row">
              <a
                className={`${
                  widthSize.mediumDevice ? "w-[70px]" : "basis-1/2"
                } `}
              ></a>
              <a
                href="#"
                className={`flex ${
                  widthSize.mediumDevice ? "basis-2/2" : "basis-1/2"
                } items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group`}
              >
                <ImageContainer src={imgBase64.homeIcon} className="w-5" />
                <Link
                  className="flex-1 ml-3 whitespace-nowrap"
                  text="Home"
                  path="/"
                />
              </a>
            </li>
          </ul>
          <ul>
            <li className="flex flex-row ">
              <a
                className={`${
                  widthSize.mediumDevice ? "w-[70px]" : "basis-1/2"
                } `}
              ></a>
              <a className="basis-1/2 pt-4 mt-4 space-y-2 font-medium border-t border-gray-200"></a>
            </li>
          </ul>
          <ul>
            <li className="flex flex-row">
              <a
                className={`${
                  widthSize.mediumDevice ? "w-[70px]" : "basis-1/2"
                } `}
              ></a>
              <a
                href="#"
                className={`flex ${
                  widthSize.mediumDevice ? "basis-2/2" : "basis-1/2"
                } items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group`}
              >
                <ImageContainer src={imgBase64.friendIcon} className="w-5" />
                <Link
                  className="flex-1 ml-3 whitespace-nowrap"
                  text="Find your friends"
                  path="/my-friend"
                />
              </a>
            </li>
            <li className="flex flex-row">
              <a
                className={`${
                  widthSize.mediumDevice ? "w-[70px]" : "basis-1/2"
                } `}
              ></a>
              <a
                href="#"
                className={`flex ${
                  widthSize.mediumDevice ? "basis-2/2" : "basis-1/2"
                } items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group`}
              >
                <ImageContainer src={imgBase64.postIcon} className="w-5" />
                <Link
                  className="flex-1 ml-3 whitespace-nowrap"
                  text="My posts"
                  path="/my-post"
                />
              </a>
            </li>
            <li className="flex flex-row">
              <a
                className={`${
                  widthSize.mediumDevice ? "w-[70px]" : "basis-1/2"
                } `}
              ></a>
              <a
                href="#"
                className={`flex ${
                  widthSize.mediumDevice ? "basis-2/2" : "basis-1/2"
                } items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group`}
              >
                <ImageContainer src={imgBase64.likeIcon} className="w-5" />
                <Link
                  className="flex-1 ml-3 whitespace-nowrap"
                  text="My likes"
                  path="/my-like"
                />
              </a>
            </li>
            <li className="flex flex-row">
              <a
                className={`${
                  widthSize.mediumDevice ? "w-[70px]" : "basis-1/2"
                } `}
              ></a>
              <a
                href="#"
                className={`flex ${
                  widthSize.mediumDevice ? "basis-2/2" : "basis-1/2"
                } items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group`}
              >
                <ImageContainer src={imgBase64.dislikeIcon} className="w-5" />
                <Link
                  className="flex-1 ml-3 whitespace-nowrap"
                  text="My dislike"
                  path="/my-dislike"
                />
              </a>
            </li>
            <li className="flex flex-row">
              <a
                className={`${
                  widthSize.mediumDevice ? "w-[70px]" : "basis-1/2"
                } `}
              ></a>
              <a
                href="#"
                className={`flex ${
                  widthSize.mediumDevice ? "basis-2/2" : "basis-1/2"
                } items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group`}
              >
                <ImageContainer src={imgBase64.commentIcon} className="w-5" />
                <Link
                  className="flex-1 ml-3 whitespace-nowrap"
                  text="My comments"
                  path="/my-comment"
                />
              </a>
            </li>
            <li className="flex flex-row">
              <a
                className={`${
                  widthSize.mediumDevice ? "w-[70px]" : "basis-1/2"
                } `}
              ></a>
              <a
                href="#"
                className={`flex ${
                  widthSize.mediumDevice ? "basis-2/2" : "basis-1/2"
                } items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group`}
              >
                <ImageContainer src={imgBase64.communityIcon} className="w-6" />
                <Link
                  className="flex-1 ml-3 whitespace-nowrap"
                  text="My community"
                  path="/my-community"
                />
              </a>
            </li>
          </ul>
          <ul>
            <li className="flex flex-row ">
              <a
                className={`${
                  widthSize.mediumDevice ? "w-[70px]" : "basis-1/2"
                } `}
              ></a>
              <a className="basis-1/2 pt-4 mt-4 space-y-2 font-medium border-t border-gray-200"></a>
            </li>
          </ul>
          <ul>
            <li className="flex flex-row">
              <a
                className={`${
                  widthSize.mediumDevice ? "w-[70px]" : "basis-1/2"
                } `}
              ></a>
              <a
                href="#"
                className={`flex ${
                  widthSize.mediumDevice ? "basis-2/2" : "basis-1/2"
                } items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group`}
              >
                <ImageContainer src={imgBase64.privacyIcon} className="w-5" />
                <Link
                  className="flex-1 ml-3 whitespace-nowrap"
                  text="Privacy policy"
                  path="privacy-policy"
                />
              </a>
            </li>
            {account?.id && (
              <>
                <li className="flex flex-row">
                  <a
                    className={`${
                      widthSize.mediumDevice ? "w-[70px]" : "basis-1/2"
                    } `}
                  ></a>
                  <a
                    href="#"
                    className={`flex ${
                      widthSize.mediumDevice ? "basis-2/2" : "basis-1/2"
                    } items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group`}
                  >
                    <ImageContainer
                      src={imgBase64.userDashboardIcon}
                      className="w-5"
                    />
                    <Link
                      className="flex-1 ml-3 whitespace-nowrap"
                      text=" User dashboard"
                      path="/dashboard/user"
                    />
                  </a>
                </li>
                <li className="flex flex-row">
                  <a
                    className={`${
                      widthSize.mediumDevice ? "w-[70px]" : "basis-1/2"
                    } `}
                  ></a>
                  <a
                    href="#"
                    className={`flex ${
                      widthSize.mediumDevice ? "basis-2/2" : "basis-1/2"
                    } items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group`}
                  >
                    <ImageContainer
                      src={imgBase64.userProfileIcon}
                      className="w-5"
                    />
                    <Link
                      className="flex-1 ml-3 whitespace-nowrap"
                      text="User profile"
                      path="/profile"
                    />
                  </a>
                </li>
                <li className="flex flex-row">
                  <a
                    className={`${
                      widthSize.mediumDevice ? "w-[70px]" : "basis-1/2"
                    } `}
                  ></a>
                  <a
                    href="#"
                    className={`flex ${
                      widthSize.mediumDevice ? "basis-2/2" : "basis-1/2"
                    } items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group`}
                  >
                    <ImageContainer
                      src={imgBase64.adminDashboardIcon}
                      className="w-5"
                    />
                    <Link
                      className="flex-1 ml-3 whitespace-nowrap"
                      text="Admin dashboard"
                      path="/dashboard/admin"
                    />
                  </a>
                </li>
                <li className="flex flex-row">
                  <a
                    className={`${
                      widthSize.mediumDevice ? "w-[70px]" : "basis-1/2"
                    } `}
                  ></a>
                  <a
                    href="#"
                    className={`flex ${
                      widthSize.mediumDevice ? "basis-2/2" : "basis-1/2"
                    } items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group`}
                  >
                    <ImageContainer
                      src={imgBase64.logoutIcon}
                      className="w-5"
                    />
                    <Link
                      className="flex-1 ml-3 whitespace-nowrap"
                      text="Logout"
                      onClick={signOuBtnHandler}
                    />
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
