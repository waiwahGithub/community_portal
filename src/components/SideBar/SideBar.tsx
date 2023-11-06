import { useLocation, useNavigate } from "react-router-dom";
import { imgBase64 } from "../../assets/base64/imgBase64";
import WidthSizeDetection from "../../assets/config/WidthSizeDetection";
import ImageContainer from "../image/Image";
import Link from "../link/Link";

const SideBar = () => {
  const widthSize = WidthSizeDetection();
  const navigate = useNavigate();
  const location = useLocation();

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
                  text="Your posts"
                  path="privacy-policy"
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
                  text="Your likes"
                  path="privacy-policy"
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
                  text="Your dislike"
                  path="privacy-policy"
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
                  text="Your comments"
                  path="privacy-policy"
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
                  text="Your community"
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
                  path="privacy-policy"
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
            {/* // Todo: need to handle the check whether the user type it is admin or user */}
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
                  path="privacy-policy"
                />
              </a>
            </li>
            {/* // Todo: need to handle the check whether it is login or logout */}
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
                <ImageContainer src={imgBase64.logoutIcon} className="w-5" />
                <Link
                  className="flex-1 ml-3 whitespace-nowrap"
                  text="Logout"
                  onClick={signOuBtnHandler}
                />
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
