import React, { useEffect, useState } from "react";
import TextBox from "../textbox/TextBox";
import { RoundedButton } from "../button/Button";
import { textBoxTypes } from "../../lib/filterConstants";
import RowStandardModal from "./RowStandardModal";
import ImageContainer from "../image/Image";
import {
  useCreatePostQuery,
  useUpdatePostQuery,
} from "../../hooks/use-PostQuery";
import { useCreateCommunityQuery } from "../../hooks/use-CommunityQuery";
import useRegisterUserQuery from "../../hooks/use-RegisterUserQuery";
import {
  useUpdateUserStatusQuery,
  useUpdatedUserDetailsQuery,
} from "../../hooks/use-UploadUserDetailsQuery";
import { useCommentOnPostNotificationQuery } from "../../hooks/use-NotificationQuery";
import useGetUserDetailsQuery from "../../hooks/use-GetUserDetailsQuery";
import {
  useFollowFriendQuery,
  useGetAllFollowListQuery,
  useUnfollowFriendQuery,
} from "../../hooks/use-FriendQuery";

interface Props {
  className?: string;
  modalOpenBtnName?: string;
  modalOpenBtnClassName?: string;
  modalTitle?: string;
  closeBtnName?: string;
  actionBtnName?: string;
  inputValue?: string;
  isShowCreatePostModal?: boolean;
  isShowCreateCommunityModal?: boolean;
  isShowFindFriendModal?: boolean;
  isEditModal?: boolean;
  isDeleteModal?: boolean;
  isActivateModal?: boolean;
  isCreateUserModal?: boolean;
  isUserDeletModal?: boolean;
  communityId?: any;
  editTitlePlaceholder?: any;
  editMessagePlaceholder?: any;
  editImagePlaceholder?: any;
  editPostId?: any;
  isUserEditModal?: any;
  userIdPlaceholder?: any;
  fNamePlaceholder?: any;
  lNamePlaceholder?: any;
  emailPlaceholder?: any;
  bioPlaceholder?: any;
  typePlaceholder?: any;
  profileImgPathPlaceholder?: any;
}

const AdvanceModalWithBtn: React.FC<Props> = (props) => {
  const {
    modalOpenBtnName = "Open modal",
    modalOpenBtnClassName,
    modalTitle,
    isShowCreatePostModal = false,
    isShowCreateCommunityModal = false,
    isShowFindFriendModal = false,
    isEditModal = false,
    isDeleteModal = false,
    isActivateModal = false,
    isCreateUserModal = false,
    isUserEditModal = false,
    isUserDeletModal = false,
    communityId,
    editTitlePlaceholder = null,
    editMessagePlaceholder = null,
    editImagePlaceholder = null,
    editPostId,
    userIdPlaceholder,
    fNamePlaceholder,
    lNamePlaceholder,
    emailPlaceholder,
    bioPlaceholder,
    typePlaceholder,
    profileImgPathPlaceholder,
  } = props;

  // State
  const [showModal, setShowModal] = useState<boolean>(false);
  const [titleInput, setTitleInput] = useState<any>(editTitlePlaceholder);
  const [messageInput, setMessageInput] = useState<any>(editMessagePlaceholder);
  const [base64Image, setBase64Image] = useState<any>(null);
  const [image, setImage] = useState<any>(editImagePlaceholder);
  const [accountQuery, setAccountQuery] = useState<any>(
    localStorage.getItem("jwt_token")
  );
  const account = JSON.parse(accountQuery);
  const [isPostBtnClicked, setIsPostBtnClicked] = useState<boolean>(false);
  const [inputValueProfileImage, setInputValueProfileImage] = useState<any>(
    editImagePlaceholder || profileImgPathPlaceholder
  );
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [typeInputValue, setTypeInputValue] = useState(typePlaceholder);
  const [bioInputValue, setBioInputValue] = useState(bioPlaceholder);
  const [pwdInputValue, setPwdInputValue] = useState("");
  const [emailInputValue, setEmailInputValue] = useState(emailPlaceholder);
  const [lNameInputValue, setLNameInputValue] = useState(lNamePlaceholder);
  const [fNameInputValue, setFNameInputValue] = useState(fNamePlaceholder);
  const [friendId, setFriendId] = useState<number>(0);
  const [isJoinClicked, setIsJoinClicked] = useState<boolean>(false);
  const [isUnjoinClicked, setIsUnjoinClicked] = useState<boolean>(false);
  const [filterSearchFriend, setFilterSearchFriend] = useState<any>();
  const [selectedUserType, setSelectedUserType] =
    useState<any>(typePlaceholder);

  // API
  const createPostQuery = useCreatePostQuery(
    isShowCreatePostModal && isPostBtnClicked && isImageUploaded,
    account?.id,
    communityId ? communityId : 0,
    messageInput,
    inputValueProfileImage,
    titleInput,
    communityId ? "community" : "post",
    1
  );
  const updatePostQuery = useUpdatePostQuery(
    (isEditModal || isDeleteModal || isActivateModal) &&
      isPostBtnClicked &&
      isImageUploaded,
    account?.id,
    editPostId,
    messageInput,
    inputValueProfileImage,
    titleInput,
    communityId ? "community" : "post",
    isDeleteModal ? 0 : 1
  );
  const createCommunityQuery = useCreateCommunityQuery(
    isShowCreateCommunityModal && isPostBtnClicked && isImageUploaded,
    account?.id,
    messageInput,
    inputValueProfileImage,
    titleInput,
    1
  );
  const registerUserQuery = useRegisterUserQuery(
    isCreateUserModal && isPostBtnClicked && isImageUploaded,
    fNameInputValue + fNameInputValue,
    fNameInputValue,
    lNameInputValue,
    pwdInputValue,
    emailInputValue,
    selectedUserType,
    bioInputValue,
    1,
    inputValueProfileImage
  );
  const updatedUserDetailsQuery = useUpdatedUserDetailsQuery(
    isUserEditModal && isPostBtnClicked && isImageUploaded,
    userIdPlaceholder,
    fNameInputValue,
    lNameInputValue,
    selectedUserType,
    bioInputValue,
    inputValueProfileImage
  );
  const updateUserStatusQuery = useUpdateUserStatusQuery(
    isUserDeletModal && isPostBtnClicked && isImageUploaded,
    userIdPlaceholder,
    0
  );
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

  // onchange event function
  const titleInputOnChange = (e: any) => {
    setTitleInput(e.target.value);
  };

  const messageInputOnChange = (e: any) => {
    setMessageInput(e.target.value);
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Calculate dimensions for 3:2 aspect ratio
          let canvasWidth, canvasHeight, offsetX, offsetY;

          if (
            isCreateUserModal ||
            isShowCreateCommunityModal ||
            isUserEditModal
          ) {
            // Crop image in 1:1 aspect ratio
            let canvasWidth, canvasHeight, offsetX, offsetY;

            if (img.width > img.height) {
              canvasWidth = img.height;
              canvasHeight = img.height;
              offsetX = (img.width - img.height) / 2;
              offsetY = 0;
            } else {
              canvasWidth = img.width;
              canvasHeight = img.width;
              offsetX = 0;
              offsetY = (img.height - img.width) / 2;
            }

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            ctx?.drawImage(
              img,
              offsetX,
              offsetY,
              canvasWidth,
              canvasHeight,
              0,
              0,
              canvasWidth,
              canvasHeight
            );
          } else {
            if (img.width > img.height) {
              canvasWidth = img.height * (3 / 2);
              canvasHeight = img.height;
              offsetX = (img.width - canvasWidth) / 2;
              offsetY = 0;
            } else {
              canvasWidth = img.width;
              canvasHeight = img.width * (2 / 3);
              offsetX = 0;
              offsetY = (img.height - canvasHeight) / 2;
            }

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            // Crop the image to 3:2 aspect ratio
            ctx?.drawImage(
              img,
              offsetX,
              offsetY,
              canvasWidth,
              canvasHeight,
              0,
              0,
              canvasWidth,
              canvasHeight
            );
          }

          // Convert the cropped image to a base64 string
          const base64 = canvas.toDataURL("image/jpeg");

          setBase64Image(base64);

          // Convert the cropped image to a Blob
          canvas.toBlob((blob) => {
            setImage(blob); // Update the image state with the cropped image
          }, "image/jpeg");
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    const apiKey = process.env.REACT_APP_IMGBB_API_KEY;
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=" + apiKey,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Image uploaded successfully!", data?.data?.display_url);
        setInputValueProfileImage(data?.data?.display_url);
        setIsImageUploaded(true);
        setIsPostBtnClicked(true);
      } else {
        console.error("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onBtnClicked = () => {
    if (isEditModal) {
      if (base64Image) {
        uploadImage();
      } else {
        setIsImageUploaded(true);
        setIsPostBtnClicked(true);
      }
    } else if (isDeleteModal || isActivateModal || isUserDeletModal) {
      setIsImageUploaded(true);
      setIsPostBtnClicked(true);
    } else if (isUserEditModal) {
      if (base64Image) {
        uploadImage();
      } else {
        setIsImageUploaded(true);
        setIsPostBtnClicked(true);
      }
    } else {
      uploadImage();
    }
  };

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

  // useEffect
  useEffect(() => {
    if (createPostQuery.data) {
      window.location.reload();
      alert("Post created");
    }
  }, [createPostQuery.data]);

  useEffect(() => {
    if (updatePostQuery?.data) {
      window.location.reload();
      // alert("Post updated");
    }
  }, [updatePostQuery?.data]);

  useEffect(() => {
    if (createCommunityQuery.data?.body) {
      // console.log(createCommunityQuery.data?.body);
      setIsPostBtnClicked(false);
      window.location.reload();
      // alert("Community created");
    }
  }, [createCommunityQuery.data]);

  useEffect(() => {
    if (registerUserQuery.data) {
      window.location.reload();
    }
  }, [registerUserQuery.data]);

  useEffect(() => {
    if (updatedUserDetailsQuery?.data) {
      window.location.reload();
    }
  }, [updatedUserDetailsQuery?.data]);

  useEffect(() => {
    if (updateUserStatusQuery.data) {
      window.location.reload();
    }
  }, [updateUserStatusQuery.data]);

  return (
    <>
      <button
        className={`py-[2px] px-4 rounded-full shadow bg-white h-10 ml-4 mb-5 ${modalOpenBtnClassName}`}
        type="button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        {modalOpenBtnName}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-[400px] left-[40%]">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between">
                  <button
                    className="p-1 ml-auto bg-transparent text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className=" items-center text-center justify-between p-5 rounded-t">
                  <h3 className="text-3xl font-semibold">{modalTitle}</h3>
                </div>
                {isEditModal ||
                isShowCreateCommunityModal ||
                isShowCreatePostModal ? (
                  <>
                    <div className="relative p-6 text-center">
                      <TextBox
                        placeholder="Title "
                        type={textBoxTypes.Text}
                        className="w-full text-sm text-gray-900 mb-2 focus:ring-blue-500 focus:border-blue-500"
                        onChange={titleInputOnChange}
                        value={titleInput}
                      />
                      <textarea
                        id="message"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border focus:ring-blue-500 focus:border-blue-500 shadow appearance-none focus:outline-none focus:shadow-outline mb-2"
                        placeholder="Write your thoughts here..."
                        onChange={messageInputOnChange}
                        value={messageInput}
                      ></textarea>
                      {/* {editImagePlaceholder && ( */}
                      <ImageContainer
                        src={base64Image || image || editImagePlaceholder}
                      />
                      {/* )} */}
                      <TextBox
                        type={textBoxTypes.File}
                        onChange={handleImageUpload}
                        className="shadow-none border-none"
                      />
                      {/* <ImageContainer
                        src={base64Image || ""}
                        className="w-[10%]"
                      /> */}
                    </div>
                    <div className="relative px-6 pb-6 text-center">
                      <RoundedButton
                        text={
                          isShowCreatePostModal || isShowCreateCommunityModal
                            ? "Create"
                            : "Submit"
                        }
                        className="bg-[#d25a5f] text-white hover:bg-[#c72a2fe3] disabled disabled:opacity-[70%] outline-none focus:outline-none mt-2 mb-1 w-full h-9"
                        onClickButton={onBtnClicked}
                      />
                    </div>
                  </>
                ) : isShowFindFriendModal ? (
                  <>
                    <div className="relative p-6 text-center w-[400px] ">
                      <TextBox
                        placeholder="Search name"
                        type={textBoxTypes.Text}
                        className="w-full text-sm text-gray-900 mb-2 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => {
                          setFilterSearchFriend(e.target.value);
                        }}
                        value={filterSearchFriend}
                      />
                      <div className="h-[280px] overflow-auto">
                        {getUserDetailsQuery?.data?.body
                          ?.filter((user: any) =>
                            user?.firstName
                              .toLowerCase()
                              .includes(filterSearchFriend?.toLowerCase())
                          )
                          ?.map((user: any) => {
                            function checkFriendFollow(
                              fiendId: any,
                              userId: any
                            ) {
                              const friendFollow =
                                getAllFollowListQuery?.data?.body.find(
                                  (item: any) =>
                                    item.friendID === user?.id &&
                                    item.status === 1 &&
                                    item?.user?.id === userId
                                );
                              if (!friendFollow) {
                                return "Follow";
                              }

                              const userFound =
                                getAllFollowListQuery?.data?.body.find(
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

                            if (user?.status === 1)
                              return (
                                <RowStandardModal
                                  className="bg-white shadow rounded-lg my-2 mx-2"
                                  isFriendModal={true}
                                  followersCount={
                                    countUserFollowers()[user.id] || 0
                                  }
                                  btnText={checkFriendFollow(
                                    user?.id,
                                    account?.id
                                  )}
                                  btnClassName="w-[80px]"
                                  logoPath={user?.profileImgPath}
                                  friendName={
                                    user?.firstName + " " + user?.lastName
                                  }
                                  joinOnClicked={() => {
                                    joinOnClicked(
                                      user?.id,
                                      checkFriendFollow(user?.id, account?.id)
                                    );
                                  }}
                                />
                              );
                          })}
                      </div>
                    </div>
                  </>
                ) : isDeleteModal || isUserDeletModal ? (
                  <div className="relative px-6 pb-6 text-center">
                    <RoundedButton
                      text="Delete"
                      className="bg-[#d25a5f] text-white hover:bg-[#c72a2fe3] disabled disabled:opacity-[70%] outline-none focus:outline-none mt-2 mb-1 w-full h-9"
                      onClickButton={onBtnClicked}
                    />
                    <RoundedButton
                      text="Cancel"
                      className=" text-black hover:bg-gray-100 disabled disabled:opacity-[70%] outline-none focus:outline-none mt-2 mb-1 w-full h-9"
                      onClickButton={() => {
                        setShowModal(false);
                      }}
                    />
                  </div>
                ) : isActivateModal ? (
                  <div className="relative px-6 pb-6 text-center">
                    <RoundedButton
                      text="Activate"
                      className="bg-[#665ad2] text-white hover:bg-[#6b2ac7e3] disabled disabled:opacity-[70%] outline-none focus:outline-none mt-2 mb-1 w-full h-9"
                      onClickButton={onBtnClicked}
                    />
                    <RoundedButton
                      text="Cancel"
                      className=" text-black hover:bg-gray-100 disabled disabled:opacity-[70%] outline-none focus:outline-none mt-2 mb-1 w-full h-9"
                      onClickButton={() => {
                        setShowModal(false);
                      }}
                    />
                  </div>
                ) : isCreateUserModal || isUserEditModal ? (
                  <div className="relative p-6 text-center">
                    <div className="flex ">
                      <TextBox
                        placeholder="First Name"
                        type={textBoxTypes.Text}
                        className="w-full text-sm text-gray-900 mb-2 mr-1 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => {
                          setFNameInputValue(e.target.value);
                        }}
                        value={fNameInputValue}
                      />
                      <TextBox
                        placeholder="Last Name"
                        type={textBoxTypes.Text}
                        className="w-full text-sm text-gray-900 mb-2 ml-1 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => {
                          setLNameInputValue(e.target.value);
                        }}
                        value={lNameInputValue}
                      />
                    </div>
                    <TextBox
                      placeholder="Email"
                      type={textBoxTypes.Text}
                      className={`w-full text-sm text-gray-900 mb-2 focus:ring-blue-500 focus:border-blue-500 ${
                        isUserEditModal ? "opacity-70 text-blue-900" : ""
                      }`}
                      onChange={(e) => {
                        setEmailInputValue(e.target.value);
                      }}
                      value={emailInputValue}
                      disabled={isUserEditModal ? true : false}
                    />
                    {!isUserEditModal && (
                      <TextBox
                        placeholder="Password"
                        type={textBoxTypes.Password}
                        className="w-full text-sm text-gray-900 mb-2 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => {
                          setPwdInputValue(e.target.value);
                        }}
                        value={pwdInputValue}
                      />
                    )}
                    <TextBox
                      placeholder="User Bio (Optional)"
                      type={textBoxTypes.Text}
                      className="w-full text-sm text-gray-900 mb-2 focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) => {
                        setBioInputValue(e.target.value);
                      }}
                      value={bioInputValue}
                    />
                    {/* <TextBox
                      placeholder="User type"
                      type={textBoxTypes.Text}
                      className={`w-full text-sm text-gray-900 mb-2 focus:ring-blue-500 focus:border-blue-500 ${
                        isUserEditModal ? "opacity-70 text-blue-900" : ""
                      }`}
                      onChange={(e) => {
                        setTypeInputValue(e.target.value);
                      }}
                      value={typeInputValue}
                      // disabled={isUserEditModal ? true : false}
                    /> */}
                    <select
                      id="userType"
                      className="shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline w-full text-sm text-gray-900 mb-2 focus:ring-blue-500 focus:border-blue-500 "
                      value={selectedUserType}
                      onChange={(e) => {
                        setSelectedUserType(e.target.value);
                      }}
                    >
                      <option selected>Choose a type</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                    <ImageContainer
                      src={
                        base64Image ||
                        image ||
                        editImagePlaceholder ||
                        profileImgPathPlaceholder
                      }
                    />
                    <TextBox
                      type={textBoxTypes.File}
                      onChange={handleImageUpload}
                      className="shadow-none border-none"
                    />
                    <RoundedButton
                      text={`${
                        isCreateUserModal
                          ? "Create user"
                          : isUserEditModal
                          ? "Submit"
                          : ""
                      }`}
                      className="bg-[#d25a5f] text-white hover:bg-[#c72a2fe3] disabled disabled:opacity-[70%] outline-none focus:outline-none mt-2 mb-1 w-full h-9"
                      onClickButton={onBtnClicked}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default AdvanceModalWithBtn;
