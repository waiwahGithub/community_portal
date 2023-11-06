import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import banner from "../../assets/img/home-banner.png";
import ImageContainer from "../../components/image/Image";
import SearchBox from "../../components/searchbox/SearchBox";
import Card from "../../components/card/Card";
import useGetCarDetailsQuery from "../../hooks/use-GetCarDetailsQuery";
import Modal from "../../components/modal/Modal";
import TextBox from "../../components/textbox/TextBox";
import { RoundedButton } from "../../components/button/Button";
import carDefaultImg from "../../assets/img/default_car_pic.jpg";
import { textBoxTypes } from "../../lib/filterConstants";
import usePostCarQuery from "../../hooks/use-PostCarsQuery";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

interface Props {
  border: string;
}

const PostCar = () => {
  const navigate = useNavigate();
  const [fbInfo, setFBInfo] = useState<any>(localStorage.getItem("fb_info"));
  const [jwtToken, setJWTToken] = useState<any>(
    localStorage.getItem("jwt_token")
  );

  const fbInfoQuery = JSON.parse(fbInfo);
  const localInfoQuery = JSON.parse(jwtToken);
  let fbInfoSetInterval: any = undefined;

  // useEffect(() => {
  //   if (!localInfoQuery) {
  //     alert("Please login to access this feature");
  //     navigate("/");
  //     return;
  //   }
  // }, [localInfoQuery]);

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
        const storedData = JSON.parse(localStorage.getItem("jwt_token") || "");
        storedData.profileImage = data?.data?.display_url;
        // localStorage.setItem("jwt_token", JSON.stringify(storedData));
        // alert("Image uplodaed success");
        // window.location.reload();
        setInputValueCarProfileImg(data?.data?.display_url);
        setIsImageUploaded(true);
      } else {
        console.error("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const [inputValueMake, setInputValueMake] = useState<any>();
  const [inputValueModel, setInputValueModel] = useState<any>();
  const [inputValuePrice, setInputValuePrice] = useState<any>();
  const [inputValueRegisterNum, setInputValueRegisterNum] = useState<any>();
  const [inputValueCarProfileImg, setInputValueCarProfileImg] = useState<any>();
  const [inputValueSellerEmail, setInputValueSellerEmail] = useState<any>(
    localInfoQuery?.username
  );
  const [inputValueStatus, setInputValueStatus] = useState<any>(0);
  const [isSaveBtnClicked, setIsSaveBtnClicked] = useState<boolean>(false);

  const postCarQuery = usePostCarQuery(
    isSaveBtnClicked && isImageUploaded,
    inputValueMake,
    inputValueModel,
    inputValueRegisterNum,
    inputValuePrice,
    inputValueCarProfileImg,
    inputValueSellerEmail,
    inputValueStatus
  );

  const onChangeHandlerMake = (e: any) => {
    setInputValueMake(e.target.value);
  };

  const onChangeHandlerModel = (e: any) => {
    setInputValueModel(e.target.value);
  };
  const onChangeHandlerPrice = (e: any) => {
    setInputValuePrice(e.target.value);
  };
  const onChangeHandlerRegisterNum = (e: any) => {
    setInputValueRegisterNum(e.target.value);
  };

  const onClickSaveBtn = () => {
    if (
      inputValueMake &&
      inputValueModel &&
      inputValuePrice &&
      inputValueRegisterNum
    ) {
      uploadImage();
      setIsSaveBtnClicked(true);
    }
  };

  useEffect(() => {
    if (postCarQuery.isFetched && isImageUploaded) {
      alert("Post car successful");
      window.location.reload();
    }
  }, [postCarQuery.isFetched]);

  return (
    <div>
      {isSaveBtnClicked && <LoadingSpinner />}
      <Nav />
      <div className="mt-24 px-64">
        <p className="text-4xl font-medium">Post Car for Sale</p>
        <p className="text-2xl font-medium mt-10">Card Details</p>
        <p className="text-sm mt-10">Car image</p>
        <ImageContainer
          src={base64Image || carDefaultImg}
          className="w-[10%]"
        />
        <input type="file" onChange={handleImageUpload} className="mt-2" />
        {/* <div className="mt-2">
          <RoundedButton
            text="Save Image"
            className="border"
            onClickButton={uploadImage}
          />
        </div> */}
        <p className="text-sm mt-4">Car Make</p>
        <TextBox
          className="w-2/4 mt-1"
          placeholder="BMW"
          type={textBoxTypes.Text}
          value={inputValueMake}
          onChange={onChangeHandlerMake}
        />
        <p className="text-sm mt-4">Car Model</p>
        <TextBox
          className="w-2/4 mt-1"
          placeholder="GLC 200"
          type={textBoxTypes.Text}
          value={inputValueModel}
          onChange={onChangeHandlerModel}
        />
        <p className="text-sm mt-4">Price Range</p>
        <TextBox
          className="w-2/4 mt-1"
          placeholder="220011"
          type={textBoxTypes.Text}
          value={inputValuePrice}
          onChange={onChangeHandlerPrice}
        />
        <p className="text-sm mt-4">Car Registration Number</p>
        <TextBox
          className="w-2/4 mt-1"
          placeholder="ABC-123"
          type={textBoxTypes.Text}
          value={inputValueRegisterNum}
          onChange={onChangeHandlerRegisterNum}
        />
      </div>
      <div className="mt-10 mb-20 px-64">
        <RoundedButton
          text="Save"
          className="bg-[#d25a5f] text-white hover:bg-[#c72a2fe3] disabled disabled:opacity-[70%] outline-none focus:outline-none mt-2 mb-1 w-1/6 h-9 mr-2"
          onClickButton={onClickSaveBtn}
        />
        <RoundedButton
          text="Cancel"
          className="bg-[#ffffff] text-black hover:bg-[#d3d3d3e3] disabled disabled:opacity-[70%] outline-none focus:outline-none mt-2 mb-1 w-1/6 h-9 mr-2"
        />
      </div>
    </div>
  );
};

export default PostCar;
