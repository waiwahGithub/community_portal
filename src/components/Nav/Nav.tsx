import { useEffect, useState } from "react";
import logo from "../../assets/img/logo.png";
import Link from "../link/Link";
import LoginOrSignupModal from "../modal/LoginOrSignupModal";
import Dropdown from "../dropdown/Dropdown";
import profileImg from "../../assets/img/default_profile_pic.png";
import useViewUserDetailsById from "../../hooks/use-ViewUserDetailsByID";
import { useNavigate } from "react-router-dom";
import { emptyCacheAndHardReload } from "../../store/app-actions";
import WidthSizeDetection from "../../assets/config/WidthSizeDetection";
import NotificationDropdown from "../dropdown/NotificationDropdown";

const Nav = () => {
  const navigate = useNavigate();
  const widthSize = WidthSizeDetection();

  const [fbInfo, setFBInfo] = useState<any>(localStorage.getItem("fb_info"));
  const [jwtToken, setJWTToken] = useState<any>(
    localStorage.getItem("jwt_token")
  );

  const fbInfoQuery = JSON.parse(fbInfo);
  const localInfoQuery = JSON.parse(jwtToken);
  let fbInfoSetInterval: any = undefined;

  useEffect(() => {
    if (fbInfo || jwtToken) return;

    fbInfoSetInterval = window.setInterval(() => {
      setFBInfo(localStorage.getItem("fb_info"));
      setJWTToken(localStorage.getItem("jwt_token"));
    }, 300);

    return () => {
      clearfbInfoSetInterval();
    };
  }, [fbInfo]);

  const clearfbInfoSetInterval = () => {
    window.clearTimeout(fbInfoSetInterval);
    fbInfoSetInterval = undefined;
  };

  const [inputValueProfileImage, setInputValueProfileImage] = useState<any>();
  const [inputValuefirstName, setInputValuefirstName] = useState<any>();

  const [isViewUserDetailsQuery, setIsViewUserDetailsQuery] =
    useState<boolean>(false);
  const viewUserDetailsQuery = useViewUserDetailsById(
    isViewUserDetailsQuery,
    localInfoQuery?.id
  );

  useEffect(() => {
    if (!jwtToken) return;
    setIsViewUserDetailsQuery(true);
    setInputValuefirstName(viewUserDetailsQuery?.data?.body?.firstName);
    setInputValueProfileImage(viewUserDetailsQuery?.data?.body?.profileImage);
  }, [viewUserDetailsQuery]);

  useEffect(() => {
    if (!jwtToken) return;
    if (!viewUserDetailsQuery?.error?.message) return;

    let apiErrorInfo: any = JSON.parse(viewUserDetailsQuery?.error?.message);

    if (apiErrorInfo.status === 403) {
      navigate("/");
      emptyCacheAndHardReload();
      alert("Token expired, Please login again");
    }
  }, [viewUserDetailsQuery]);

  return (
    <>
      <div
        className={`flex text-center pt-4 pb-4 shadow-md fixed w-full top-0 bg-white z-50 ${
          widthSize.mediumDevice ? "px-20" : "px-64"
        }`}
      >
        <div className="flex-none mt-2">
          <img src={logo} className="w-10" alt="logo" />
        </div>
        <div className="flex-1 w-64 pt-1 pl-1 text-left">
          <Link text={"Home"} path={"/"} className="hover:underline" />
          <Link
            text={"Community"}
            path={"/my-community"}
            className="hover:underline"
          />
          <Link
            text={"Friends"}
            path={"/my-friend"}
            className="hover:underline"
          />
          <Link text={"About"} path={"about"} className="hover:underline" />
          <Link
            text={"Privacy Policy"}
            path={"/privacy-policy"}
            className="hover:underline"
          />
        </div>
        {fbInfoQuery || jwtToken ? (
          <div className="w-72 text-left flex">
            <NotificationDropdown />
            <Dropdown
              imgSrc={
                inputValueProfileImage ||
                fbInfoQuery?.data?.picture?.data?.url ||
                profileImg
              }
              profileName={fbInfoQuery?.data?.name || inputValuefirstName}
            />
          </div>
        ) : (
          <div className="flex-1 w-32 text-right">
            <LoginOrSignupModal
              modalOpenBtnClassName="'bg-white hover:bg-gray-100 mx-2"
              modalOpenBtnName="Login"
              closeBtnName="Cancel"
              actionBtnName="Login"
              modalTitle="Login"
            />
            <LoginOrSignupModal
              modalOpenBtnClassName="'bg-white hover:bg-gray-100 mx-2"
              modalOpenBtnName="Signup"
              closeBtnName="Cancel"
              actionBtnName="Login"
              modalTitle="Signup"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Nav;
