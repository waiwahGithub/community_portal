import { useState } from "react";
import WidthSizeDetection from "../../assets/config/WidthSizeDetection";
import Nav from "../../components/Nav/Nav";
import SideBar from "../../components/SideBar/SideBar";
import { RoundedButton } from "../../components/button/Button";
import CommunityModal from "../../components/modal/CommunityModal";
import Post from "../../components/post/Post";
import RowStandardModal from "../../components/modal/RowStandardModal";
import AdvanceModalWithBtn from "../../components/modal/AdvanceModalWithButton";
import {
  useGetAllPostsQuery,
  useGetPostTabulationQuery,
} from "../../hooks/use-PostQuery";

const MyPost = () => {
  const widthSize = WidthSizeDetection();
  const [hasNotification, setHasNotification] = useState<any>(true);
  const [accountQuery, setAccountQuery] = useState<any>(
    localStorage.getItem("jwt_token")
  );
  const account = JSON.parse(accountQuery);

  // State
  const [postId, setPostId] = useState<any>(68);
  const [showControlByStatus, setShowControlByStatus] = useState<any>(3);

  // API
  const getAllPostsQuery = useGetAllPostsQuery();
  const GetPostTabulationQuery = useGetPostTabulationQuery(postId);

  // Funtional Events
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

  return (
    <div className="bg-[#F0F2F5] min-h-screen ">
      <Nav />
      <SideBar />
      <div className="flex pt-28">
        <div
          className={`flex ${
            widthSize.mediumDevice ? "w-2/12 mr-14" : "w-3/12 mr-5"
          } `}
        ></div>
        <div
          className={`${widthSize.mediumDevice ? "basis-6/12" : "basis-5/12"}`}
        >
          <p className="ml-4 mb-5 text-2xl font-bold">My Posts</p>
          <hr className="basis-1/2 pt-4 mt-4 space-y-2 font-medium border-t border-gray-200" />
          {!account?.id && (
            <p className="ml-4 mb-5 text-md font-bold">
              Please login to see your posts
            </p>
          )}
          {account?.id && (
            <AdvanceModalWithBtn
              modalOpenBtnName="Create a post"
              modalTitle="Create a post"
              className="bg-white h-10 ml-4 mb-5"
              isShowCreatePostModal={true}
            />
          )}
          {account?.id &&
            getAllPostsQuery?.data?.body
              ?.sort((a: any, b: any) => {
                const dateA: any = new Date(a.createdDate);
                const dateB: any = new Date(b.createdDate);
                return dateB - dateA;
              })
              .map((post: any, index: any) => {
                if (
                  showControlByStatus === 3
                    ? post?.user?.id === account?.id
                    : showControlByStatus === 1
                    ? post?.user?.id === account?.id && post?.status === 1
                    : post?.user?.id === account?.id && post?.status === 0
                )
                  return (
                    <Post
                      key={index}
                      postId={post?.postID}
                      postTitle={post?.postTitle}
                      postContent={post?.postContent}
                      profileImgSrc={post?.postImgPath}
                      likeCount={12}
                      commentCount={12}
                      shareCount={45}
                      targetedUserId={post?.user?.id}
                      nameAndDate={
                        post?.user?.firstName +
                        " . " +
                        convertDateTime(post?.createdDate)
                      }
                      isEditable={true}
                      postStatus={post?.status}
                    />
                  );
              })}
        </div>
        <div
          className={`${widthSize.mediumDevice ? "basis-3/12" : "basis-1/6"}`}
        >
          <div className={`mb-10 px-1 w-full lg:px-4 mt-32 `}>
            <article className="overflow-hidden rounded-lg shadow-lg bg-white">
              <header className="flex items-center justify-between leading-tight px-2 pt-2">
                <h1 className="text-lg mt-3 ml-2">Filter</h1>
              </header>
              <div className="px-4 py-4">
                <RoundedButton
                  text="All"
                  className={`mr-3 mb-3 ${
                    showControlByStatus === 3 ? "bg-gray-200" : ""
                  }`}
                  onClickButton={() => {
                    setShowControlByStatus(3);
                  }}
                />
                <RoundedButton
                  text="Activated"
                  className={`mr-3 mb-3 ${
                    showControlByStatus === 1 ? "bg-gray-200" : ""
                  }`}
                  onClickButton={() => {
                    setShowControlByStatus(1);
                  }}
                />
                <RoundedButton
                  text="Deleted"
                  className={`mr-3 mb-3 ${
                    showControlByStatus === 0 ? "bg-gray-200" : ""
                  }`}
                  onClickButton={() => {
                    setShowControlByStatus(0);
                  }}
                />
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPost;
