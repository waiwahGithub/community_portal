import { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import ImageContainer from "../../components/image/Image";
import TextBox from "../../components/textbox/TextBox";
import { RoundedButton } from "../../components/button/Button";
import profileImg from "../../assets/img/default_profile_pic.png";
import useViewUserDetailsById from "../../hooks/use-ViewUserDetailsByID";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import SideBar from "../../components/SideBar/SideBar";
import WidthSizeDetection from "../../assets/config/WidthSizeDetection";
import { useUpdatedUserDetailsQuery } from "../../hooks/use-UploadUserDetailsQuery";

const Profile = () => {
  const widthSize = WidthSizeDetection();

  const [fbInfo, setFBInfo] = useState<any>(localStorage.getItem("fb_info"));
  const [jwtToken, setJWTToken] = useState<any>(
    localStorage.getItem("jwt_token")
  );

  const fbInfoQuery = JSON.parse(fbInfo);
  const localInfoQuery = JSON.parse(jwtToken);
  let fbInfoSetInterval: any = undefined;

  useEffect(() => {
    if (fbInfo || localInfoQuery) return;

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

  const [base64Image, setBase64Image] = useState<any>(null);
  const [image, setImage] = useState<any>(null);

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

          // Calculate the dimensions for the square cropping
          const size = Math.min(img.width, img.height);
          canvas.width = size;
          canvas.height = size;

          // Crop the image to a square
          ctx?.drawImage(
            img,
            (img.width - size) / 2,
            (img.height - size) / 2,
            size,
            size,
            0,
            0,
            size,
            size
          );

          // Convert the cropped image to a base64 string
          const base64 = canvas.toDataURL("image/jpeg");

          setBase64Image(base64);

          // Convert the squared image to a Blob
          canvas.toBlob((blob) => {
            setImage(blob); // Update the image state with the squared image
          }, "image/jpeg");
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const [isImageUploaded, setIsImageUploaded] = useState(false);

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
        // console.log("Image uploaded successfully!", data?.data?.display_url);
        setInputValueProfileImage(data?.data?.display_url);
        setIsImageUploaded(true);
      } else {
        console.error("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const [inputValueUserId, setInputValueUserId] = useState<any>(
    localInfoQuery?.id
  );

  const [isViewUserDetailsQueryFetched, setIsViewUserDetailsQueryFetched] =
    useState<boolean>(false);
  const [isViewUserDetailsQuery, setIsViewUserDetailsQuery] =
    useState<boolean>(false);
  const viewUserDetailsQuery = useViewUserDetailsById(
    isViewUserDetailsQuery,
    inputValueUserId
  );

  const [inputValueEmail, setInputValueEmail] = useState<any>();
  const [inputValuefirstName, setInputValuefirstName] = useState<any>();
  const [inputValueLastName, setInputValueLastName] = useState<any>();
  const [inputValueProfileImage, setInputValueProfileImage] = useState<any>();
  const [isSaveBtnClicked, setIsSaveBtnClicked] = useState<boolean>(false);

  const uploadUserDetailsQuery = useUpdatedUserDetailsQuery(
    isSaveBtnClicked && isImageUploaded,
    inputValueUserId,
    inputValuefirstName,
    inputValueLastName,
    "user",
    null,
    inputValueProfileImage
  );

  const onChangeHandlerEmail = (e: any) => {
    setInputValueEmail(e.target.value);
  };

  const onChangeHandlerFirstName = (e: any) => {
    setInputValuefirstName(e.target.value);
  };
  const onChangeHandlerLastName = (e: any) => {
    setInputValueLastName(e.target.value);
  };

  const onClickSaveBtn = () => {
    if (
      inputValueUserId &&
      inputValueEmail &&
      inputValuefirstName &&
      inputValueLastName
    ) {
      if (image) {
        uploadImage();
        setIsSaveBtnClicked(true);
      } else {
        setIsImageUploaded(true);
        setIsSaveBtnClicked(true);
      }
    }
  };

  useEffect(() => {
    if (!jwtToken) return;
    setIsViewUserDetailsQuery(true);
  }, []);

  useEffect(() => {
    if (!jwtToken) return;
    if (viewUserDetailsQuery.isFetched) {
      setIsViewUserDetailsQueryFetched(true);
    }
  }, [viewUserDetailsQuery.isFetched]);

  useEffect(() => {
    if (!jwtToken) return;
    setInputValueEmail(viewUserDetailsQuery?.data?.body?.email);
    setInputValuefirstName(viewUserDetailsQuery?.data?.body?.firstName);
    setInputValueLastName(viewUserDetailsQuery?.data?.body?.lastName);
    setInputValueProfileImage(viewUserDetailsQuery?.data?.body?.profileImgPath);
  }, [isViewUserDetailsQueryFetched]);

  useEffect(() => {
    if (!jwtToken) return;
    if (uploadUserDetailsQuery.isFetched && isImageUploaded) {
      alert("Profile updated successful");
      window.location.reload();
    }
  }, [uploadUserDetailsQuery.isFetched, viewUserDetailsQuery?.isFetched]);

  return (
    <div className="bg-[#F0F2F5] min-h-screen ">
      {isSaveBtnClicked && isImageUploaded && <LoadingSpinner />}
      <Nav />
      <SideBar />
      <div className="flex pt-28">
        <div
          className={`flex ${
            widthSize.mediumDevice ? "w-2/12 mr-14" : "w-3/12 mr-5"
          } `}
        ></div>
        <div
          className={`${widthSize.mediumDevice ? "basis-9/12" : "basis-7/12"}`}
        >
          <p className="ml-4 mb-5 text-2xl font-bold">My profile</p>
          <hr className="basis-1/2 pt-4 mt-4 space-y-2 font-medium border-t border-gray-200" />
          <p className="ml-4 mb-5 text-md font-bold">Personal details</p>
          <div className="ml-4">
            <p className="text-sm mt-10">Profile image</p>
            <ImageContainer
              src={
                base64Image ||
                inputValueProfileImage ||
                fbInfoQuery?.data?.picture?.data?.url ||
                profileImg
              }
              className="w-[10%]"
            />
            <input type="file" onChange={handleImageUpload} className="mt-2" />
            <p className="text-sm mt-10">Email address</p>
            <TextBox
              className="w-2/4 mt-1 "
              value={fbInfoQuery?.data?.email || inputValueEmail}
              onChange={onChangeHandlerEmail}
              disabled={true}
            />
            <p className="text-sm mt-4">First name</p>
            <TextBox
              className="w-2/4 mt-1"
              value={fbInfoQuery?.data?.first_name || inputValuefirstName}
              onChange={onChangeHandlerFirstName}
            />
            <p className="text-sm mt-4">Last name</p>
            <TextBox
              className="w-2/4 mt-1"
              value={fbInfoQuery?.data?.last_name || inputValueLastName}
              onChange={onChangeHandlerLastName}
            />

            {/* <p className="text-sm mt-4">Mobile</p>
            <TextBox className="w-2/4 mt-1" placeholder="+65 9988 8899" /> */}
          </div>
          <div className="mt-10 mb-20 ml-4">
            <RoundedButton
              text="Save"
              onClickButton={onClickSaveBtn}
              className=" bg-red-800 text-white h-10 w-2/12 hover:bg-red-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
