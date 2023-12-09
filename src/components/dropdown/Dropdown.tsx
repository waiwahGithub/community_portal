import React, { ChangeEvent, useRef, useState } from "react";
import ImageContainer from "../image/Image";
import { useLocation, useNavigate } from "react-router-dom";
import { imgBase64 } from "../../assets/base64/imgBase64";

interface TextBoxProps {
  className?: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  imgSrc?: string;
  profileName?: string;
}

const Dropdown: React.FC<TextBoxProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { className, type, placeholder, onChange, value, imgSrc, profileName } =
    props;
  const [isShowDropdown, setIsShowDropdown] = useState(true);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const onClickHandler = () => {
    setIsShowDropdown(false);
  };

  const onBlurHandler = (e: React.FocusEvent<HTMLDivElement>) => {
    if (dropdownRef.current) {
      if (
        !dropdownRef.current.contains(e.relatedTarget) &&
        e.target !== document.getElementById("dropdownDefaultButton")
      ) {
        setIsShowDropdown(true);
      }
    }
  };

  const signOuBtnHandler = () => {
    localStorage.removeItem("fb_info");
    localStorage.removeItem("jwt_token");
    setIsShowDropdown(false);
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div onBlur={onBlurHandler}>
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="bg-white text-black hover:bg-[#d1d1d1e3] border h-9 flex items-center py-[2px] px-4 rounded shadow"
          type="button"
          onClick={onClickHandler}
        >
          {imgSrc && (
            <ImageContainer src={imgSrc} className="mr-2 rounded-full w-6" />
          )}
          {profileName}
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          id="dropdown"
          ref={dropdownRef}
          className={`${
            isShowDropdown ? "hidden" : ""
          } absolute z-10 bg-white  rounded-lg shadow w-46`}
        >
          <p className="ml-3 mt-3 text-xs">Settings</p>
          <ul className="mt-3">
            <li>
              <a
                href="/my-friend"
                className="flex px-4 py-2 hover:bg-gray-100 "
              >
                <ImageContainer
                  src={imgBase64.friendIcon}
                  className="w-5 mr-2"
                />
                Find your friends
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a className="flex pt-1 mt-1 space-y-1 font-medium border-t border-gray-200"></a>
            </li>
          </ul>
          <ul>
            <li>
              <a
                href="/my-community"
                className="flex px-4 py-2 hover:bg-gray-100 "
              >
                <ImageContainer
                  src={imgBase64.communityIcon}
                  className="w-5 mr-2"
                />
                Your community
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a className="flex pt-1 mt-1 space-y-1 font-medium border-t border-gray-200"></a>
            </li>
          </ul>
          <ul>
            <li>
              <a
                href="/dashboard/user"
                className="flex px-4 py-2 hover:bg-gray-100 "
              >
                <ImageContainer
                  src={imgBase64.userDashboardIcon}
                  className="w-5 mr-2"
                />
                User dashboard
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a className="flex pt-1 mt-1 space-y-1 font-medium border-t border-gray-200"></a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="/profile" className="flex px-4 py-2 hover:bg-gray-100 ">
                <ImageContainer
                  src={imgBase64.userProfileIcon}
                  className="w-5 mr-2"
                />
                User profile
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <a className="flex pt-1 mt-1 space-y-1 font-medium border-t border-gray-200"></a>
            </li>
          </ul>
          <ul>
            <li>
              <a
                href="#"
                className="flex px-4 py-2 hover:bg-gray-100 "
                onClick={signOuBtnHandler}
              >
                <ImageContainer
                  src={imgBase64.logoutIcon}
                  className="w-5 mr-2"
                />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Dropdown;
