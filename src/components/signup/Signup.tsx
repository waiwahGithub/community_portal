import React from "react";
import Modal from "../modal/Modal";

interface Props {
  text?: React.ReactNode;
  onClickButton?: () => void;
  className?: string;
}

export const Signup: React.FC<Props> = (props) => {
  const { text, className, onClickButton } = props;

  return (
    <Modal
      modalOpenBtnClassName="'bg-white hover:bg-gray-100 mx-2"
      modalOpenBtnName="Signup"
      closeBtnName="Cancel"
      actionBtnName="Signup"
      modalTitle="Signup"
    />
  );
};
