import React, { ChangeEvent, useState } from "react";
import { textBoxTypes } from "../../lib/filterConstants";
import Link from "../link/Link";
import TextBoxWithButton from "../textboxwithbutton/TextBoxWithButton";
import RadioButton from "../radiobutton/RadioButton";

interface Props {
  text?: string;
  path?: string;
  className?: string;
  onChangeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputValue?: string;
}

const SearchBox: React.FC<Props> = (props) => {
  const { text, path, className, onChangeHandler, inputValue } = props;
  const [isBuyFocused, setIsBuyFocus] = useState<boolean>(true);
  const [isSellFocused, setIsSellFocus] = useState<boolean>(false);
  const [searchPlaceholder, setSearchPlaceholder] = useState<string>("");
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const buyOnClickHandler = () => {
    setIsBuyFocus(true);
    setIsSellFocus(false);
  };

  const sellOnClickHandler = () => {
    setIsBuyFocus(false);
    setIsSellFocus(true);
  };

  return (
    <div
      className={`rounded-xl bg-slate-950 opacity-80 m-auto w-2/6 h-52 drop-shadow-xl ${className}`}
    >
      <div className="text-center mt-10 mb-5">
        <Link
          text="Buy"
          className={`col-start-3 text-3xl text-white font-bold hover:cursor-pointer ${
            isBuyFocused
              ? "underline underline-offset-8 decoration-[#c72a2e]"
              : "hover:text-[#c72a2e]"
          }`}
          onClick={buyOnClickHandler}
        />
        <Link
          text="Sell"
          className={`col-start-4 text-3xl text-white font-bold hover:cursor-pointer ${
            isSellFocused
              ? "underline underline-offset-8 decoration-[#c72a2e]"
              : "hover:text-[#c72a2e]"
          }`}
          onClick={sellOnClickHandler}
        />
      </div>
      <div className="px-10">
        <TextBoxWithButton
          className={"col-start-2 col-span-4 px-2 m-auto h-12"}
          type={textBoxTypes.Text}
          placeholder={searchPlaceholder}
          inputOnClick={() => {}}
          onFocus={onFocus}
          onBlur={onBlur}
          hasSearchPlaholder={true}
          onChange={onChangeHandler}
          value={inputValue}
        />
      </div>
      <div className="px-10 mt-4 text-center">
        <RadioButton
          type={textBoxTypes.Radio}
          name="car"
          text="Make"
          value="car"
          labelClassName="mx-4"
        />
        <RadioButton
          type={textBoxTypes.Radio}
          name="car"
          text="Model"
          value="model"
          labelClassName="mx-4"
        />
        <RadioButton
          type={textBoxTypes.Radio}
          name="car"
          text="Year"
          value="year"
          labelClassName="mx-4"
        />
      </div>
    </div>
  );
};

export default SearchBox;
