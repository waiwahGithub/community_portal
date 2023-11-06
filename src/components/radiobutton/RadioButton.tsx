import React from "react";

interface radioButtonProps {
  inputClassName?: string;
  labelClassName?: string;
  type?: string;
  value?: string;
  text?: string;
  name?: string;
  radioButtonChecked?: boolean;
  hasLabel?: boolean;
}

const RadioButton: React.FC<radioButtonProps> = (props) => {
  const {
    inputClassName,
    labelClassName,
    type,
    value,
    text,
    name,
    radioButtonChecked = true,
    hasLabel = true,
  } = props;

  return (
    <>
      <input
        id={value}
        type={type}
        value={value}
        name={name}
        checked={radioButtonChecked}
        className={`w-4 h-4 text-blue-600 bg-gray-100 ${inputClassName}`}
      />
      {hasLabel && (
        <label
          htmlFor={value}
          className={`ml-2 text-sm font-medium text-white ${labelClassName}`}
        >
          {text}
        </label>
      )}
    </>
  );
};
export default RadioButton;
