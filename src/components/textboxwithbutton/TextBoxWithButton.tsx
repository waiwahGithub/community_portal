import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { RoundedButton } from "../button/Button";

interface TextBoxWithButtonProps {
  className?: string;
  type?: string;
  placeholder?: string;
  ref?: any;
  inputOnClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  hasSearchPlaholder?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  onClickButton?: () => void;
}

const TextBoxWithButton: React.FC<TextBoxWithButtonProps> = (props) => {
  const {
    className,
    type,
    placeholder,
    ref,
    inputOnClick,
    onFocus,
    onBlur,
    hasSearchPlaholder = false,
    onChange,
    value,
    onClickButton,
  } = props;
  const searchPlaceholderIntervalRef = useRef<number | any>(null);
  const [searchPlaceholder, setSearchPlaceholder] = useState<string>("BMW");

  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!hasSearchPlaholder) return;
    if (focused && searchPlaceholderIntervalRef.current !== null) {
      clearInterval(searchPlaceholderIntervalRef.current);
    } else {
      searchPlaceholderIntervalRef.current = setInterval(() => {
        const randomNum = Math.floor(Math.random() * 10);
        switch (randomNum) {
          case 1:
            setSearchPlaceholder("BMW");
            break;
          case 2:
            setSearchPlaceholder("Kia");
            break;
          case 3:
            setSearchPlaceholder("Lexus");
            break;
          case 4:
            setSearchPlaceholder("MINI");
            break;
          case 5:
            setSearchPlaceholder("Mazda");
            break;
          case 6:
            setSearchPlaceholder("Nissan");
            break;
          case 7:
            setSearchPlaceholder("Mercedes-Benz");
            break;
          case 8:
            setSearchPlaceholder("Toyota");
            break;
          case 9:
            setSearchPlaceholder("Honda");
            break;
          case 10:
            setSearchPlaceholder("Tesla");
            break;
        }
      }, 2000);
    }

    return () => {
      if (searchPlaceholderIntervalRef.current !== null) {
        clearInterval(searchPlaceholderIntervalRef.current);
      }
    };
  }, [focused, hasSearchPlaholder]);

  return (
    <>
      <input
        ref={ref}
        className={`shadow appearance-none border h-12 w-3/4 py-2 mx-0 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className} rounded-l-md`}
        id="username"
        type={type}
        placeholder={searchPlaceholder ? searchPlaceholder : placeholder}
        onClick={inputOnClick}
        onFocus={() => {
          setFocused(true);
          if (onFocus) {
            onFocus();
          }
        }}
        onBlur={() => {
          setFocused(false);
          if (onBlur) {
            onBlur();
          }
        }}
        onChange={onChange}
        value={value}
      />
      <RoundedButton
        text="Search"
        className="mx-0 h-12 w-1/4 bg-[#c72a2e] text-white border-none rounded-r-md hover:bg-[#c72a2fe3] hover:text-white"
        onClickButton={onClickButton}
      />
    </>
  );
};
export default TextBoxWithButton;
