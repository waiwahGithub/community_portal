import React, { useEffect, useRef, useState } from "react";
import ImageContainer from "../image/Image";
import carImg from "../../assets/img/mercedes.png";
import { RoundedButton } from "../button/Button";
import { AdvanceButton } from "../button/AdvanceButton";
import { imgBase64 } from "../../assets/base64/imgBase64";
import {
  useAddDislikeToPostQuery,
  useAddLikeToPostQuery,
  useCommentOnPostQuery,
  useGetCommentQuery,
  useGetLikeByUserAndPostQuery,
  useGetLikesQuery,
  useGetPostTabulationQuery,
  useGetShareQuery,
  useSharePostQuery,
  useUpdateLikeStatusByUserAndPostQuery,
} from "../../hooks/use-PostQuery";
import {
  useAddLikeToPostNotificationQuery,
  useCommentOnPostNotificationQuery,
  useSharePostNotificationQuery,
  useUpdateUserNotificationStatusQuery,
} from "../../hooks/use-NotificationQuery";
import RowStandardModal from "../modal/RowStandardModal";
import SocialSharing from "../modal/SocialSharing";
import AdvanceModalWithBtn from "../modal/AdvanceModalWithButton";
import { useNavigate } from "react-router-dom";

interface Props {
  className?: string;
  type?: string;
  placeholder?: string;
  postTitle?: string;
  postContent?: string;
  nameAndDate?: string;
  cardImgSrc?: string;
  profileImgSrc?: string;
  isBtnVisible?: boolean;
  btnText?: string;
  btnClassName?: string;
  postId?: any;
  likeCount?: any;
  commentCount?: any;
  shareCount?: any;
  targetedUserId?: any;
  isPostDetailPage?: boolean;
  isEditable?: boolean;
  postStatus?: any;
  isLikeStatus?: any;
  isDisikeStatus?: any;
  isHomePage?: any;
  onEditBtnClicked?: () => {};
  onDeleteBtnClicked?: () => {};
  likeBtnFromHome?: () => void;
  dislikeBtnFromHome?: () => void;
}

const Post: React.FC<Props> = (props) => {
  const {
    className,
    postTitle = "How you all feeling today",
    postContent = "Today the weather is much clean and clear and bbal bla blabla",
    nameAndDate = "Joe . 5hrs ago",
    profileImgSrc = "https://www.w3schools.com/w3images/team1.jpg",
    btnText,
    btnClassName,
    isBtnVisible = false,
    postId,
    likeCount,
    commentCount,
    shareCount,
    targetedUserId: TargetedUserId,
    isPostDetailPage,
    isEditable,
    postStatus,
    isLikeStatus,
    isDisikeStatus,
    isHomePage,
    onEditBtnClicked,
    onDeleteBtnClicked,
    likeBtnFromHome,
    dislikeBtnFromHome,
  } = props;
  const [accountQuery, setAccountQuery] = useState<any>(
    localStorage.getItem("jwt_token")
  );
  const account = JSON.parse(accountQuery);
  const navigate = useNavigate();
  const getLikesQuery = useGetLikesQuery();
  const getLikeByUserAndPostQuery = useGetLikeByUserAndPostQuery(
    account?.id,
    parseFloat(postId || "")
  );
  const checkUserStatus = () => {
    let isLikeByUser: any = false;
    let isDislikeByUser: any = false;
    let isUserFound: any = false;

    const getlikeStatus = getLikeByUserAndPostQuery?.data?.body;

    if (
      getlikeStatus?.status === 1 &&
      getlikeStatus?.post?.postID === parseFloat(postId || "")
    ) {
      isLikeByUser = true;
      isUserFound = true;
    } else if (
      getlikeStatus?.status === 0 &&
      getlikeStatus?.post?.postID === parseFloat(postId || "")
    ) {
      isDislikeByUser = true;
      isUserFound = true;
    } else {
      isUserFound = false;
    }

    return { isLikeByUser, isDislikeByUser, isUserFound };
  };

  const { isLikeByUser, isDislikeByUser, isUserFound } = checkUserStatus();

  // State
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisiked, setIsDisliked] = useState<boolean>(false);
  const [isShared, setIsShared] = useState<any>(false);
  const [likeCountInput, setLikeCountInput] = useState<number>(likeCount);
  const [commentCountInput, setCommentCountInput] =
    useState<number>(commentCount);
  const [shareCountInput, setShareCountInput] = useState<number>(shareCount);
  const [shareBtnClicked, setShareBtnClicked] = useState<boolean>(false);
  const [isComment, setIsComment] = useState<boolean>(false);
  const [commentInputValue, setCommentInputValue] = useState<any>();
  const [isLikeClicked, setIsLikeClicked] = useState<boolean>(false);
  const [isDislikeClicked, setIsDislikeClicked] = useState<boolean>(false);

  // API
  const getCommentQuery = useGetCommentQuery();
  const updateLikeStatusByUserAndPostQuery1 =
    useUpdateLikeStatusByUserAndPostQuery(
      isLikeClicked && isUserFound,
      account?.id,
      parseFloat(postId || ""),
      1
    );
  const updateLikeStatusByUserAndPostQuery2 =
    useUpdateLikeStatusByUserAndPostQuery(
      isDislikeClicked && isUserFound,
      account?.id,
      parseFloat(postId || ""),
      0
    );
  const getShareQuery = useGetShareQuery();
  const commentOnPostQuery = useCommentOnPostQuery(
    isComment,
    account?.id,
    parseFloat(postId || ""),
    commentInputValue
  );
  const addLikeToPostQuery = useAddLikeToPostQuery(
    isLikeClicked && !isUserFound,
    account?.id,
    parseFloat(postId || "")
  );
  const addDislikeToPostQuery = useAddDislikeToPostQuery(
    isDislikeClicked,
    account?.id,
    parseFloat(postId || "")
  );
  // const sharePostQuery = useSharePostQuery(
  //   shareBtnClicked,
  //   account?.id,
  //   postId
  // );

  // 0=Like, 1=dislike, 2=comment, 3=share, 4=follow, 5=unfollow,6=member

  const addLikeToPostNotificationQuery1 = useAddLikeToPostNotificationQuery(
    isLikeClicked,
    account?.id,
    postId,
    TargetedUserId,
    0
  );
  const addLikeToPostNotificationQuery2 = useAddLikeToPostNotificationQuery(
    isDislikeClicked,
    account?.id,
    postId,
    TargetedUserId,
    1
  );
  // const sharePostNotificationQuery = useSharePostNotificationQuery(
  //   isShared,
  //   account?.id,
  //   postId,
  //   TargetedUserId,
  //   3
  // );
  const commentOnPostNotificationQuery = useCommentOnPostNotificationQuery(
    isComment,
    account?.id,
    postId,
    TargetedUserId,
    2
  );
  const updateUserNotificationStatusQuery =
    useUpdateUserNotificationStatusQuery(
      isLikeClicked || isDislikeClicked || isShared,
      TargetedUserId,
      1
    );

  // Functional events
  const likeIconOnClickHandler = () => {
    if (!account?.id) {
      alert("Please login");
      return;
    }
    if (isHomePage) return;
    if (!isLiked) {
      localStorage.setItem("needRefreshQuery", "true");
      setIsLiked(true);
      setIsDisliked(false);
      setIsLikeClicked(true);
      setIsDislikeClicked(false);
    }
  };

  const dislikeIconOnClickHandler = () => {
    if (!account?.id) {
      alert("Please login");
      return;
    }
    if (isHomePage) return;
    if (!isDisiked) {
      localStorage.setItem("needRefreshQuery", "true");
      setIsDisliked(true);
      setIsLiked(false);
      setIsLikeClicked(false);
      setIsDislikeClicked(true);
    }
  };

  const shareOnclickHandler = () => {
    if (!account?.id) {
      alert("Please login");
      return;
    }
    setIsShared(true);
    localStorage.setItem("needRefreshQuery", "true");
  };

  const closeModal = () => {
    setIsShared(false);
  };

  const onChangeCommentHandler = (e: any) => {
    if (!account?.id) {
      alert("Please login");
      return;
    }
    setCommentInputValue(e.target.value);
  };

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

  function countCommentInPost() {
    const communityUsersCount: any = {};

    getCommentQuery?.data?.body.forEach((item: any) => {
      const postID = item.post.postID;
      const status = item.status;

      if (status === 1) {
        if (communityUsersCount[postID]) {
          communityUsersCount[postID]++;
        } else {
          communityUsersCount[postID] = 1;
        }
      }
    });

    return communityUsersCount;
  }

  function countShareInPost() {
    const shareCount: any = {};

    getShareQuery?.data?.body.forEach((item: any) => {
      const postID = item.post.postID;
      const status = item.status;

      if (status === 1) {
        if (shareCount[postID]) {
          shareCount[postID]++;
        } else {
          shareCount[postID] = 1;
        }
      }
    });

    return shareCount;
  }

  function countLikeInPost() {
    const likeCount: any = {};

    getLikesQuery?.data?.body.forEach((item: any) => {
      const postID = item.post.postID;
      const status = item.status || 0;

      if (status === 1) {
        if (likeCount[postID]) {
          likeCount[postID]++;
        } else {
          likeCount[postID] = 1;
        }
      } else if (status === 0) {
        if (likeCount[postID]) {
          likeCount[postID]--;
        } else {
          likeCount[postID] = -1;
        }
      }
    });

    return likeCount;
  }

  // useEffect
  useEffect(() => {
    if (commentOnPostQuery?.data) {
      // window.location.reload();
      getCommentQuery?.refetch();
      setCommentInputValue("");
    }
  }, [commentOnPostQuery.data]);

  useEffect(() => {
    if (addLikeToPostQuery.data) {
      getLikesQuery?.refetch();
      getLikeByUserAndPostQuery?.refetch();
    }
  }, [addLikeToPostQuery.data]);

  useEffect(() => {
    if (addDislikeToPostQuery.data) {
      getLikesQuery?.refetch();
      getLikeByUserAndPostQuery?.refetch();
    }
  }, [addDislikeToPostQuery.data]);

  useEffect(() => {
    if (updateLikeStatusByUserAndPostQuery1.data) {
      getLikesQuery?.refetch();
      getLikeByUserAndPostQuery?.refetch();
    }
  }, [updateLikeStatusByUserAndPostQuery1.data]);

  useEffect(() => {
    if (updateLikeStatusByUserAndPostQuery2.data) {
      getLikesQuery?.refetch();
      getLikeByUserAndPostQuery?.refetch();
    }
  }, [updateLikeStatusByUserAndPostQuery2.data]);

  useEffect(() => {
    if (updateLikeStatusByUserAndPostQuery2.data) {
      getLikesQuery?.refetch();
      getLikeByUserAndPostQuery?.refetch();
    }
  }, [updateLikeStatusByUserAndPostQuery2.data]);

  return (
    <div className={`mb-10 px-1 w-full lg:px-4 ${className}`}>
      <article className="overflow-hidden rounded-lg shadow-lg bg-white">
        <a
          href={`/post/post-detail?postId=${postId}&targetuserid=${TargetedUserId}`}
        >
          <ImageContainer
            src={profileImgSrc ? profileImgSrc : carImg}
            className="block h-auto w-full"
          />
        </a>

        <header className="flex items-center justify-between leading-tight px-2 pt-2">
          <h1 className="text-lg">
            <a
              className="no-underline hover:underline text-black text-xl"
              href="#"
            >
              {postTitle}
            </a>
          </h1>
          <p className="text-grey-darker text-sm">{nameAndDate}</p>
        </header>

        <header className="flex justify-between leading-tight px-2 md:pb-2">
          <p className="text-sm">{postContent}</p>
        </header>

        <footer className="flex items-center leading-none p-2 md:p-4">
          <AdvanceButton
            text={
              likeCount
                ? countLikeInPost()[parseFloat(postId || "")]
                  ? countLikeInPost()[parseFloat(postId || "")]
                  : 0
                : 0
            }
            className="bg-[#CFCFCF]"
            imgSrcFront={
              isLikeStatus
                ? imgBase64.likeIcon
                : isHomePage
                ? imgBase64.likeOutlineIcon
                : isLikeByUser
                ? imgBase64.likeIcon
                : imgBase64.likeOutlineIcon
            }
            imgSrcBack={
              isDisikeStatus
                ? imgBase64.dislikeIcon
                : isHomePage
                ? imgBase64.dislikeOutlineIcon
                : isDislikeByUser
                ? imgBase64.dislikeIcon
                : imgBase64.dislikeOutlineIcon
            }
            imgFrontClassName="mt-[1px]"
            imgBackClassName="mt-1"
            onClickFrontIcon={
              isHomePage ? likeBtnFromHome : likeIconOnClickHandler
            }
            onClickBackIcon={
              isHomePage ? dislikeBtnFromHome : dislikeIconOnClickHandler
            }
          />
          <AdvanceButton
            text={
              countCommentInPost()[parseFloat(postId || "")]
                ? countCommentInPost()[parseFloat(postId || "")]
                : 0
            }
            className="bg-[#CFCFCF] ml-4 cursor-pointer"
            onClickButton={() => {
              navigate(`/post/post-detail?postId=${postId}`);
            }}
            imgSrcFront={imgBase64.commentOutlineIcon}
            imgFrontClassName="mt-[2px]"
          />
          <AdvanceButton
            text={
              countShareInPost()[parseFloat(postId || "")]
                ? countShareInPost()[parseFloat(postId || "")]
                : 0
            }
            className="bg-[#CFCFCF] ml-4 cursor-pointer"
            onClickButton={shareOnclickHandler}
            imgSrcFront={imgBase64.shareOutlineIcon}
            imgFrontClassName="mt-[2px]"
          />
        </footer>

        {isEditable && (
          <>
            <hr />
            <div className="flex">
              <div className="basis-6/12 mt-3">
                <AdvanceModalWithBtn
                  modalOpenBtnName="Edit"
                  modalTitle="Edit Post"
                  className="bg-white h-10 "
                  modalOpenBtnClassName="text-green-900"
                  isEditModal={true}
                  editPostId={postId}
                  editTitlePlaceholder={postTitle}
                  editMessagePlaceholder={postContent}
                  editImagePlaceholder={profileImgSrc}
                />
                {postStatus === 1 ? (
                  <AdvanceModalWithBtn
                    modalOpenBtnName="Delete"
                    modalTitle="Delete Post"
                    className="bg-white h-10 "
                    isDeleteModal={true}
                    modalOpenBtnClassName="text-red-900"
                    editPostId={postId}
                    editTitlePlaceholder={postTitle}
                    editMessagePlaceholder={postContent}
                    editImagePlaceholder={profileImgSrc}
                  />
                ) : (
                  <AdvanceModalWithBtn
                    modalOpenBtnName="Activate"
                    modalTitle="Active Post"
                    className="bg-white h-10 "
                    isActivateModal={true}
                    modalOpenBtnClassName="text-blue-900"
                    editPostId={postId}
                    editTitlePlaceholder={postTitle}
                    editMessagePlaceholder={postContent}
                    editImagePlaceholder={profileImgSrc}
                  />
                )}
              </div>
              <div className="basis-6/12"></div>
              <div className="basis-3/12 mt-5">
                <p className="text-sm">
                  Status: {postStatus === 1 ? "Activated" : "Deleted"}
                </p>
              </div>
            </div>
          </>
        )}

        {isShared && (
          <SocialSharing
            onClose={closeModal}
            url={`http://localhost:3000/post/post-detail?postId=${postId}`}
            postId={postId}
            targetUserId={TargetedUserId}
          />
        )}

        {isPostDetailPage && (
          <div>
            <hr />
            <textarea
              rows={4}
              placeholder="comment..."
              className="mt-5 ml-2 mr-2 border w-5/6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 border-gray-500 p-2"
              value={commentInputValue}
              onChange={onChangeCommentHandler}
            />
            <RoundedButton
              text="Comment"
              className="text-white bg-red-700 hover:bg-red-500 ml-3 mt-3 mb-3"
              onClickButton={() => {
                if (!account?.id) {
                  alert("Please login");
                  return;
                }
                setIsComment(true);
                localStorage.setItem("needRefreshQuery", "true");
              }}
            />
            <hr className="mb-2" />
            {getCommentQuery?.data?.body &&
              getCommentQuery?.data?.body
                ?.sort((a: any, b: any) => {
                  const dateA: any = new Date(a.createdDate);
                  const dateB: any = new Date(b.createdDate);
                  return dateB - dateA;
                })
                .map((item: any) => {
                  if (item?.post?.postID === parseFloat(postId || ""))
                    return (
                      <RowStandardModal
                        isNotificationModal={true}
                        notificationTime={convertDateTime(item?.createdDate)}
                        notificationName={`${item?.user?.firstName} ${item?.user?.lastName}`}
                        className="bg-white rounded-lg mb-4"
                        comment={item?.comment}
                        logoPath={
                          item?.user?.profileImgPath
                            ? item?.user?.profileImgPath
                            : "https://picsum.photos/32/32/?random"
                        }
                      />
                    );
                })}
          </div>
        )}
      </article>
    </div>
  );
};
export default Post;
