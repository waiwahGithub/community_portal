import React from "react";
import ImageContainer from "../image/Image";

interface Props {
  text?: React.ReactNode;
  onClickButton?: (e?: any) => void;
  className?: string;
  imgSrcFront?: string;
  imgSrcBack?: string;
  type?: string;
  onChangekButton?: (e?: any) => void;
  imgFrontClassName?: string;
  imgBackClassName?: string;
  onClickFrontIcon?: (e?: any) => void;
  onClickBackIcon?: (e?: any) => void;
}

export const AdvanceButton: React.FC<Props> = (props) => {
  const {
    text,
    className,
    onClickButton,
    imgSrcFront,
    imgSrcBack,
    type,
    onChangekButton,
    imgFrontClassName,
    imgBackClassName,
    onClickFrontIcon,
    onClickBackIcon,
  } = props;

  return (
    <button
      className={`py-[8px] px-4 rounded-full shadow flex ${className} cursor-default`}
      onChange={onChangekButton}
    >
      <ImageContainer
        src={imgSrcFront}
        className={`mr-2 w-[16px] hover:cursor-pointer ${imgFrontClassName}`}
        onClickButton={onClickFrontIcon}
      />
      <span className="text-sm">{text}</span>
      <ImageContainer
        src={imgSrcBack}
        className={`ml-2 hover:cursor-pointer ${
          imgSrcBack ? "w-[16px]" : ""
        } ${imgBackClassName}`}
        onClickButton={onClickBackIcon}
      />
    </button>
  );
};
