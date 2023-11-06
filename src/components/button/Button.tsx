import React from "react";
import ImageContainer from "../image/Image";

interface Props {
  text?: React.ReactNode;
  onClickButton?: (e?: any, carId?: any) => void;
  className?: string;
  imgSrc?: string;
  type?: string;
  onChangekButton?: (e?: any) => void;
}

export const RoundedButton: React.FC<Props> = (props) => {
  const { text, className, onClickButton, imgSrc, type, onChangekButton } =
    props;

  return (
    <button
      className={`py-[2px] px-4 rounded-full shadow ${className}`}
      onClick={onClickButton}
      onChange={onChangekButton}
    >
      {imgSrc && <ImageContainer src={imgSrc} className="mr-2" />}
      {text}
      {type}
    </button>
  );
};
