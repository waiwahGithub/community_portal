import { useEffect, useState } from "react";
import WidthSizeDetection from "../../assets/config/WidthSizeDetection";
import Nav from "../../components/Nav/Nav";
import { RoundedButton } from "../../components/button/Button";
import Link from "../../components/link/Link";
import AdvanceModalWithBtn from "../../components/modal/AdvanceModalWithButton";
import RowStandardModal from "../../components/modal/RowStandardModal";
import {
  useGetAllCommunityMembersQuery,
  useGetCommunitiesQuery,
  useJoinCommunity,
  useUnjoinCommunity,
} from "../../hooks/use-CommunityQuery";
import { useNavigate } from "react-router-dom";

const MyCommunity = () => {
  const navigate = useNavigate();
  const widthSize = WidthSizeDetection();
  const [accountQuery, setAccountQuery] = useState<any>(
    localStorage.getItem("jwt_token")
  );
  const account = JSON.parse(accountQuery);

  // State
  const [getAllCommunityMembers, setGetAllCommunityMembers] = useState<any>();
  const [isJoinClicked, setIsJoinClicked] = useState<boolean>(false);
  const [isUnjoinClicked, setIsUnjoinClicked] = useState<boolean>(false);
  const [joinCommunityId, setJoinCommunityId] = useState<boolean>(false);

  // API
  const getCommunitiesQuery = useGetCommunitiesQuery();
  const getAllCommunityMembersQuery = useGetAllCommunityMembersQuery();
  const joinCommunity = useJoinCommunity(
    isJoinClicked,
    account?.id,
    joinCommunityId
  );
  const unjoinCommunity = useUnjoinCommunity(
    isUnjoinClicked,
    account?.id,
    joinCommunityId
  );

  // Functional Events
  const joinOnClicked = (communityId?: any, joinStatus?: any) => {
    if (joinStatus === "Join") {
      setJoinCommunityId(communityId);
      setIsJoinClicked(true);
    } else if (joinStatus === "Joined") {
      setJoinCommunityId(communityId);
      setIsUnjoinClicked(true);
    }
  };

  // useEffect
  useEffect(() => {
    setGetAllCommunityMembers(getAllCommunityMembersQuery);
  }, [getAllCommunityMembersQuery?.data]);

  const modalOnClicked = (communityID?: any) => {
    navigate(`/community?communityid=${communityID}`);
  };

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
            modalOpenBtnName="Create a community"
            modalTitle="Create a community"
            className="bg-white h-10 ml-4 mb-5"
            isShowCreateCommunityModal={true}
          />
          <p className="ml-5 mb-5 text-2xl font-bold">
            {/* You haven't join any community yet. */}
          </p>
          <hr className="basis-1/2 pt-4 mt-4 space-y-2 font-medium border-t border-gray-200" />
          <p className="ml-5 mb-5 text-md font-bold">Recommended Communities</p>
          <div className="grid grid-cols-3 gap-4">
            {getCommunitiesQuery?.data?.body
              ?.sort((a: any, b: any) => {
                const dateA: any = new Date(a.createdDate);
                const dateB: any = new Date(b.createdDate);
                return dateB - dateA;
              })
              .map((community: any, index: any) => {
                function checkUserCommunityJoin(communityId: any, userId: any) {
                  const community = getAllCommunityMembers?.data?.body.find(
                    (item: any) =>
                      item.community.communityID === communityId &&
                      item.status === 1
                  );
                  if (!community) {
                    return "Join";
                  }

                  const userFound = getAllCommunityMembers?.data?.body.find(
                    (item: any) => item.user.id === userId && item.status === 1
                  );

                  if (userFound) {
                    return "Joined";
                  } else {
                    return "Join";
                  }
                }

                function countUsersInCommunities() {
                  const communityUsersCount: any = {};

                  getAllCommunityMembers?.data?.body.forEach((item: any) => {
                    const communityID = item.community.communityID;
                    const status = item.status;

                    if (status === 1) {
                      if (communityUsersCount[communityID]) {
                        communityUsersCount[communityID]++;
                      } else {
                        communityUsersCount[communityID] = 1;
                      }
                    }
                  });

                  return communityUsersCount;
                }

                if (community?.status == 1)
                  return (
                    <RowStandardModal
                      key={index}
                      isCommunityModal={true}
                      btnText={checkUserCommunityJoin(
                        community?.communityID,
                        account?.id
                      )}
                      logoPath={community?.communityLogoPath}
                      communityName={community?.communityName}
                      modalOnClicked={() => {
                        modalOnClicked(community?.communityID);
                      }}
                      communityId={community?.communityID}
                      btnClassName="pr-2"
                      membersCount={
                        countUsersInCommunities()[community?.communityID]
                      }
                      joinOnClicked={() => {
                        joinOnClicked(
                          community?.communityID,
                          checkUserCommunityJoin(
                            community?.communityID,
                            account?.id
                          )
                        );
                      }}
                      className="bg-white shadow rounded-lg my-2 mx-2"
                    />
                  );
              })}
          </div>
          {/* <div className="text-center my-4">
            <Link
              text="See more"
              path="/"
              className="text-sm underline text-gray-700 hover:text-gray-400"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MyCommunity;
