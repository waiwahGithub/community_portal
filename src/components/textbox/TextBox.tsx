import React, { ChangeEvent, useEffect, useRef, useState } from "react";

interface TextBoxProps {
  className?: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
}

const TextBox: React.FC<TextBoxProps> = (props) => {
  const { className, type, placeholder, onChange, value, disabled } = props;

  return (
    <input
      className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      disabled={disabled}
    />
  );
};
export default TextBox;
