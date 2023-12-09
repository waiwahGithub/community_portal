import { useEffect, useState } from "react";
import WidthSizeDetection from "../../assets/config/WidthSizeDetection";
import Nav from "../../components/Nav/Nav";
import { RoundedButton } from "../../components/button/Button";
import Link from "../../components/link/Link";
import AdvanceModalWithBtn from "../../components/modal/AdvanceModalWithButton";
import RowStandardModal from "../../components/modal/RowStandardModal";
import {
  useFollowFriendQuery,
  useGetAllFollowListQuery,
  useGetFollowedFriendsQuery,
  useUnfollowFriendQuery,
} from "../../hooks/use-FriendQuery";
import useGetUserDetailsQuery from "../../hooks/use-GetUserDetailsQuery";
import { useNavigate } from "react-router-dom";

const MyFriend = () => {
  const navigate = useNavigate();
  const widthSize = WidthSizeDetection();
  const [accountQuery, setAccountQuery] = useState<any>(
    localStorage.getItem("jwt_token")
  );
  const account = JSON.parse(accountQuery);

  // State
  const [status, setStatus] = useState<number>(0);
  const [friendId, setFriendId] = useState<number>(0);
  const [isJoinClicked, setIsJoinClicked] = useState<boolean>(false);
  const [isUnjoinClicked, setIsUnjoinClicked] = useState<boolean>(false);

  // API
  const getUserDetailsQuery = useGetUserDetailsQuery();
  const getAllFollowListQuery = useGetAllFollowListQuery();
  const followFriendQuery = useFollowFriendQuery(
    isJoinClicked,
    account?.id,
    friendId
  );
  const unfollowFriendQuery = useUnfollowFriendQuery(
    isUnjoinClicked,
    account?.id,
    friendId
  );

  // Functional Events
  const countUserFollowers = () => {
    const totalFollowers: any = {};

    getAllFollowListQuery?.data?.body.forEach((item: any) => {
      const friendID = item?.friendID;
      const status = item?.status;
      if (status === 1) {
        if (totalFollowers[friendID]) {
          totalFollowers[friendID]++;
        } else {
          totalFollowers[friendID] = 1;
        }
      }
    });

    return totalFollowers;
  };

  const joinOnClicked = (friendId?: any, joinStatus?: any) => {
    if (joinStatus === "Follow") {
      setFriendId(friendId);
      setIsJoinClicked(true);
    } else if (joinStatus === "Unfollow") {
      setFriendId(friendId);
      setIsUnjoinClicked(true);
    }
  };

  const modalOnClicked = (friendId?: any) => {
    navigate(`/friend?friendid=${friendId}`);
  };

  // useEffect
  useEffect(() => {
    if (followFriendQuery.data) {
      window.location.reload();
    }
  }, [followFriendQuery.data]);

  useEffect(() => {
    if (unfollowFriendQuery.data) {
      window.location.reload();
    }
  }, [unfollowFriendQuery.data]);

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
            {/* You haven't follow any friend yet. */}
          </p>
          <hr className="basis-1/2 pt-4 mt-4 space-y-2 font-medium border-t border-gray-200" />
          <p className="ml-5 mb-5 text-md font-bold">Recommended Friends</p>
          <div className="grid grid-cols-3 gap-4">
            {getUserDetailsQuery?.data?.body?.map((user: any) => {
              function checkFriendFollow(fiendId: any, userId: any) {
                const friendFollow = getAllFollowListQuery?.data?.body.find(
                  (item: any) =>
                    item.friendID === user?.id &&
                    item.status === 1 &&
                    item?.user?.id === userId
                );
                if (!friendFollow) {
                  return "Follow";
                }

                const userFound = getAllFollowListQuery?.data?.body.find(
                  (item: any) =>
                    item.friendID === user?.id &&
                    item.status === 1 &&
                    item?.user?.id === userId
                );

                if (userFound) {
                  return "Unfollow";
                } else {
                  return "Follow";
                }
              }

              if (user?.status === 1 && user.id !== account?.id)
                return (
                  <RowStandardModal
                    className="bg-white shadow rounded-lg my-2 mx-2"
                    isFriendModal={true}
                    followersCount={countUserFollowers()[user.id] || 0}
                    btnText={checkFriendFollow(user?.id, account?.id)}
                    btnClassName="w-[80px]"
                    logoPath={user?.profileImgPath}
                    friendName={user?.firstName + " " + user?.lastName}
                    joinOnClicked={() => {
                      joinOnClicked(
                        user?.id,
                        checkFriendFollow(user?.id, account?.id)
                      );
                    }}
                    modalOnClicked={() => {
                      modalOnClicked(user?.id);
                    }}
                  />
                );
            })}
          </div>
          <div className="text-center my-4">
            {/* <Link
              text="See more"
              path="/"
              className="text-sm underline text-gray-700 hover:text-gray-400"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFriend;
