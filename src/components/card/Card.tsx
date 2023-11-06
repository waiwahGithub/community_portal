import React, { useEffect, useRef, useState } from "react";
import ImageContainer from "../image/Image";
import carImg from "../../assets/img/mercedes.png";
import { RoundedButton } from "../button/Button";

interface Props {
  className?: string;
  type?: string;
  placeholder?: string;
  carMake?: string;
  carModel?: string;
  datePosted?: string;
  sellerName?: string;
  cardImgSrc?: string;
  profileImgSrc?: string;
  isBtnVisible?: boolean;
  btnText?: string;
  btnClassName?: string;
  btnOnClickHandler?: (e?: any, carId?: any) => void;
}

const CarCardList: React.FC<Props> = (props) => {
  const {
    className,
    type,
    placeholder,
    carMake = "BMW 5 Series",
    carModel = "",
    datePosted = "",
    sellerName = "",
    cardImgSrc = "",
    profileImgSrc = "https://picsum.photos/32/32/?random",
    btnText,
    btnClassName,
    btnOnClickHandler,
    isBtnVisible = false,
  } = props;

  return (
    <div className={`mb-10 px-1 w-full lg:px-4 ${className}`}>
      <article className="overflow-hidden rounded-lg shadow-lg bg-white">
        <a href="#">
          <ImageContainer
            src={cardImgSrc ? cardImgSrc : carImg}
            className="block h-auto w-full"
          />
        </a>

        <header className="flex items-center justify-between leading-tight px-2 pt-2">
          <h1 className="text-lg">
            <a className="no-underline hover:underline text-black" href="#">
              {carMake}
            </a>
          </h1>
          <p className="text-grey-darker text-sm">{datePosted}</p>
        </header>

        <header className="flex justify-between leading-tight px-2 md:pb-2">
          <p className="text-sm">{carModel}</p>
        </header>

        <footer className="flex items-center justify-between leading-none p-2 md:p-4">
          <div className="flex items-center">
            <img
              alt="Placeholder"
              className="block rounded-full w-[15%]"
              src={profileImgSrc}
            />
            <p className="ml-2 text-sm">{sellerName}</p>
          </div>
          {isBtnVisible && (
            <RoundedButton
              text={btnText}
              className={btnClassName}
              onClickButton={btnOnClickHandler}
            />
          )}
        </footer>
      </article>
    </div>
  );
};
export default CarCardList;
