import { useNavigate } from "react-router-dom";
import Link from "../link/Link";
import RowStandardModal from "./RowStandardModal";
import {
  useGetAllCommunityMembersQuery,
  useGetCommunitiesQuery,
  useJoinCommunity,
  useUnjoinCommunity,
} from "../../hooks/use-CommunityQuery";
import { useEffect, useState } from "react";

interface Props {
  className?: string;
  btnText?: string;
  communityName?: string;
}

const CommunityModal: React.FC<Props> = (props) => {
  const { className, btnText = "Join", communityName = "Java" } = props;
  const navigate = useNavigate();
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
    <>
      <div className={`mb-10 px-1 w-full lg:px-4 mt-16 ${className}`}>
        <article className="overflow-hidden rounded-lg shadow-lg bg-white">
          <header className="flex items-center justify-between leading-tight px-2 pt-2">
            <h1 className="text-lg mt-3 ml-2">Communities</h1>
          </header>
          {getCommunitiesQuery?.data?.body
            ?.sort((a: any, b: any) => {
              const dateA: any = new Date(a.createdDate);
              const dateB: any = new Date(b.createdDate);
              return dateB - dateA;
            })
            .slice(0, 4)
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
                  />
                );
            })}

          <footer className="flex items-center justify-between">
            <Link
              text="See more"
              path="/my-community"
              className="text-center mx-auto text-xs underline hover:text-gray-500 hover:cursor-pointer ml-5 mb-5 mt-1"
            />
          </footer>
        </article>
      </div>
    </>
  );
};

export default CommunityModal;
