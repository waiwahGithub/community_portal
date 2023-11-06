import React from "react";

interface Props {
  text?: string;
  path?: string;
  className?: string;
  onClick?: () => void;
}

const Link: React.FC<Props> = (props) => {
  const { text, path, className, onClick } = props;

  return (
    <a href={path} className={`mx-3 ${className}`} onClick={onClick}>
      {text}
    </a>
  );
};

export default Link;
