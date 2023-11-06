import React from "react";

interface Props {
  src?: string;
  className?: string;
  onClickButton?: (e?: any) => void;
}

const ImageContainer: React.FC<Props> = (props) => {
  const { src, className, onClickButton } = props;

  return <img src={src} className={className} onClick={onClickButton} />;
};

export default ImageContainer;
