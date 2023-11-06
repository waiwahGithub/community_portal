import React, { useEffect, useRef, useState } from "react";
import ImageContainer from "../image/Image";
import carImg from "../../assets/img/mercedes.png";
import { RoundedButton } from "../button/Button";
import { AdvanceButton } from "../button/AdvanceButton";
import { imgBase64 } from "../../assets/base64/imgBase64";

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
  } = props;
  const [isLiked, setIsLiked] = useState<any>(true);
  const [isDisiked, setIsDisliked] = useState<any>(false);
  const [likeCount, setLikeCount] = useState<number>(1134);
  const [commentCount, setCommentCount] = useState<number>(1134);
  const [shareCount, setShareCount] = useState<number>(1134);

  const likeIconOnClickHandler = () => {
    if (!isLiked) {
      setIsLiked(true);
      setIsDisliked(false);
      setLikeCount(likeCount + 1);
    }
  };

  const dislikeIconOnClickHandler = () => {
    if (!isDisiked) {
      setIsDisliked(true);
      setIsLiked(false);
      setLikeCount(likeCount - 1);
    }
  };

  return (
    <div className={`mb-10 px-1 w-full lg:px-4 ${className}`}>
      <article className="overflow-hidden rounded-lg shadow-lg bg-white">
        <a href="#">
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
            text={likeCount}
            className="bg-[#CFCFCF]"
            imgSrcFront={
              isLiked ? imgBase64.likeIcon : imgBase64.likeOutlineIcon
            }
            imgSrcBack={
              !isLiked ? imgBase64.dislikeIcon : imgBase64.dislikeOutlineIcon
            }
            imgFrontClassName="mt-[1px]"
            imgBackClassName="mt-1"
            onClickFrontIcon={likeIconOnClickHandler}
            onClickBackIcon={dislikeIconOnClickHandler}
          />
          <AdvanceButton
            text={commentCount}
            className="bg-[#CFCFCF] ml-4 cursor-pointer"
            onClickButton={() => {}}
            imgSrcFront={imgBase64.commentOutlineIcon}
            imgFrontClassName="mt-[2px]"
          />
          <AdvanceButton
            text={shareCount}
            className="bg-[#CFCFCF] ml-4 cursor-pointer"
            onClickButton={() => {}}
            imgSrcFront={imgBase64.shareOutlineIcon}
            imgFrontClassName="mt-[2px]"
          />
        </footer>
      </article>
    </div>
  );
};
export default Post;
