import { useState } from "react";
import WidthSizeDetection from "../../assets/config/WidthSizeDetection";
import Nav from "../../components/Nav/Nav";
import { RoundedButton } from "../../components/button/Button";
import Link from "../../components/link/Link";
import AdvanceModalWithBtn from "../../components/modal/AdvanceModalWithButton";
import RowStandardModal from "../../components/modal/RowStandardModal";
import { useGetFollowedFriendsQuery } from "../../hooks/use-FriendQuery";

const MyFriend = () => {
  const widthSize = WidthSizeDetection();

  // State
  const [status, setStatus] = useState<number>(0);

  // API
  const getFollowedFriendsQuery = useGetFollowedFriendsQuery(status);

  return (
    <div className="bg-[#F0F2F5] min-h-screen ">
      <Nav />
      <div className="flex pt-28">
        <div
          className={`flex ${
            widthSize.mediumDevice ? "w-2/12" : "w-2/12 mr-20"
          } `}
        ></div>
        <div
          className={`${widthSize.mediumDevice ? "basis-9/12" : "basis-7/12"}`}
        >
          <AdvanceModalWithBtn
            modalOpenBtnName="Find friends"
            modalTitle="Find friends"
            className="bg-white h-10 ml-4 mb-5"
            isShowFindFriendModal={true}
          />
          <p className="ml-5 mb-5 text-2xl font-bold">
            You haven't follow any friend yet.
          </p>
          <hr className="basis-1/2 pt-4 mt-4 space-y-2 font-medium border-t border-gray-200" />
          <p className="ml-5 mb-5 text-md font-bold">Recommended Friends</p>
          <div className="grid grid-cols-3 gap-4">
            <RowStandardModal
              className="bg-white shadow rounded-lg my-2 mx-2"
              isFriendModal={true}
              followersCount={123}
              btnText="followed"
              btnClassName="w-[80px]"
              friendName="Kelvin"
            />
            <RowStandardModal
              className="bg-white shadow rounded-lg my-2 mx-2"
              isFriendModal={true}
              btnText="follow"
              btnClassName="w-[80px]"
              friendName="Kelvin"
            />
            <RowStandardModal
              className="bg-white shadow rounded-lg my-2 mx-2"
              isFriendModal={true}
              btnText="follow"
              btnClassName="w-[80px]"
              friendName="Kelvin"
            />
            <RowStandardModal
              className="bg-white shadow rounded-lg my-2 mx-2"
              isFriendModal={true}
              btnText="follow"
              btnClassName="w-[80px]"
              friendName="Kelvin"
            />
            <RowStandardModal
              className="bg-white shadow rounded-lg my-2 mx-2"
              isFriendModal={true}
              btnText="follow"
              btnClassName="w-[80px]"
              friendName="Kelvin"
            />
            <RowStandardModal
              className="bg-white shadow rounded-lg my-2 mx-2"
              isFriendModal={true}
              btnText="follow"
              btnClassName="w-[80px]"
              friendName="Kelvin"
            />
            <RowStandardModal
              className="bg-white shadow rounded-lg my-2 mx-2"
              isFriendModal={true}
              btnText="follow"
              btnClassName="w-[80px]"
              friendName="Kelvin"
            />
            <RowStandardModal
              className="bg-white shadow rounded-lg my-2 mx-2"
              isFriendModal={true}
              btnText="follow"
              btnClassName="w-[80px]"
              friendName="Kelvin"
            />
            <RowStandardModal
              className="bg-white shadow rounded-lg my-2 mx-2"
              isFriendModal={true}
              btnText="follow"
              btnClassName="w-[80px]"
              friendName="Kelvin"
            />
          </div>
          <div className="text-center my-4">
            <Link
              text="See more"
              path="/"
              className="text-sm underline text-gray-700 hover:text-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFriend;
