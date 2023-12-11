import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import TextBox from "../textbox/TextBox";
import { RoundedButton } from "../button/Button";
import { textBoxTypes } from "../../lib/filterConstants";
import Link from "../link/Link";
import { LoginSocialFacebook } from "reactjs-social-login";
import { setFBInfo, setJWTToken } from "../../store/app-actions";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "./LoginOrSignupModal.css";
import useLoginUserQuery from "../../hooks/use-LoginUserQuery";
import useRegisterUserQuery from "../../hooks/use-RegisterUserQuery";

interface Props {
  className?: string;
  modalOpenBtnName?: string;
  modalOpenBtnClassName?: string;
  modalTitle?: string;
  closeBtnName?: string;
  actionBtnName?: string;
  inputValue?: string;
}

const enum ButtonLabels {
  Continue = "Continue",
  Save = "Save",
  Cancel = "Cancel",
  Login = "Login",
  Logout = "Logout",
}

const LoginOrSignupModal: React.FC<Props> = (props) => {
  const {
    className,
    modalOpenBtnName = "Open modal",
    modalOpenBtnClassName,
    modalTitle = "modalTitle",
    closeBtnName = "Close",
    actionBtnName = "Save",
    // onChangeHandler, inputValue
  } = props;

  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputPwdValue, setInputPwdValue] = useState("");
  const [inputFNameValue, setInputFNameValue] = useState("");
  const [inputLNameValue, setInputLNameValue] = useState("");
  const [facebookData, setFacebookData] = useState<any>();
  const [facebookLoginError, setFacebookLoginError] = useState<any>();
  const [isContinueBtn, setIsContinueBtn] = useState<boolean>(false);
  const [isEmailPwdFilled, setIsEmailPwdFilled] = useState<boolean>(false);
  const [isShowPWDVerificationModal, setIsShowPWDVerificationModal] =
    useState<boolean>(false);
  const [inputDateValue, setInputDateValue] = useState<any>("");

  // For PWD verification state
  const [isLowercaseLetter, setIsLowercaseLetter] = useState<boolean>(false);
  const [isUppercaseLetter, setIsUppercaseLetter] = useState<boolean>(false);
  const [isMin8Characters, setIsMin8Characters] = useState<boolean>(false);
  const [isAtLeastOneNumber, setIsAtLeastOneNumber] = useState<boolean>(false);
  const [isAtLeastOneSpecialCharacter, setIsAtLeastOneSpecialCharacter] =
    useState<boolean>(false);

  // Auth login
  const [isLoginBtnClicked, setIsLoginBtnClicked] = useState<boolean>(false);
  const token = useLoginUserQuery(isLoginBtnClicked, inputValue, inputPwdValue);

  // Auth Signup
  const [isSignupBtnClicked, setIsSignupBtnClicked] = useState<boolean>(false);
  const registerUserQuery = useRegisterUserQuery(
    isSignupBtnClicked,
    inputValue,
    inputFNameValue,
    inputLNameValue,
    inputPwdValue,
    inputValue,
    "user",
    null,
    1,
    null
  );

  const [continueBtnClass, setContinueBtnClass] = useState<string>(
    "opacity-[70%] cursor-not-allowed"
  );

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (e.target.value && emailRegex.test(e.target.value)) {
      setContinueBtnClass("");
    } else {
      setContinueBtnClass("opacity-[70%] cursor-not-allowed");
      setIsContinueBtn(false);
    }
  };

  const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPwdValue(e.target.value);

    setIsShowPWDVerificationModal(e.target.value !== "");
  };

  const onChangeFNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputFNameValue(e.target.value);
  };

  const onChangeLNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputLNameValue(e.target.value);
  };

  const onChangeDatePickerHandler = (data: any) => {
    setInputDateValue(data);
  };

  useEffect(() => {
    // Regular expressions to check for lowercase, uppercase, number, and special character
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]/;

    // Check if the password input value meets each condition and update the state variables accordingly
    setIsLowercaseLetter(lowercaseRegex.test(inputPwdValue));
    setIsUppercaseLetter(uppercaseRegex.test(inputPwdValue));
    setIsMin8Characters(inputPwdValue.length >= 8);
    setIsAtLeastOneNumber(numberRegex.test(inputPwdValue));
    setIsAtLeastOneSpecialCharacter(specialCharRegex.test(inputPwdValue));
  }, [inputPwdValue]);

  useEffect(() => {
    if (
      isLowercaseLetter &&
      isUppercaseLetter &&
      isMin8Characters &&
      isAtLeastOneNumber &&
      isAtLeastOneSpecialCharacter &&
      inputPwdValue
    ) {
      setContinueBtnClass("");
    } else {
      setContinueBtnClass("opacity-[70%] cursor-not-allowed");
    }
  }, [
    inputPwdValue,
    isLowercaseLetter,
    isUppercaseLetter,
    isMin8Characters,
    isAtLeastOneNumber,
    isAtLeastOneSpecialCharacter,
  ]);

  useEffect(() => {
    if (facebookLoginError) {
      alert("Facebook login failed, Please try again.");
    }

    if (facebookData?.data) {
      setShowModal(false);
      setFBInfo(facebookData);

      // Signup
      setInputValue(facebookData?.data?.email);
      setInputPwdValue("NewUser123!");
      setInputFNameValue(facebookData?.data?.last_name);
      setInputLNameValue(facebookData?.data?.last_name);
      // Tell SignupQuery we want to perform sign up
      setIsSignupBtnClicked(true);
    }
  }, [facebookData]);

  const onClickContinueBtn = () => {
    if (
      (inputValue && modalTitle === "Login") ||
      (inputValue && modalTitle === "Signup")
    ) {
      setIsContinueBtn(true);
    } else {
      setIsContinueBtn(false);
    }

    if (isEmailPwdFilled && modalTitle === "Login") {
      setIsLoginBtnClicked(true);
    }

    if (
      inputValue &&
      inputPwdValue &&
      inputFNameValue &&
      inputLNameValue &&
      modalTitle === "Signup"
    ) {
      setIsSignupBtnClicked(true);
    }
  };

  useEffect(() => {
    if (isSignupBtnClicked && registerUserQuery.isFetched) {
      alert("Register successfully");
      if (facebookData) {
        setInputValue(facebookData?.data?.email);
        setInputPwdValue("NewUser123!");
        setIsLoginBtnClicked(true);
      }
      window.location.reload();
    } else if (isSignupBtnClicked && facebookData) {
      setInputValue(facebookData?.data?.email);
      setInputPwdValue("NewUser123!");
      setIsLoginBtnClicked(true);
    }
  }, [isSignupBtnClicked, registerUserQuery.isFetched]);

  useEffect(() => {
    if (token?.data) {
      setJWTToken(token?.data?.body);
      window.location.reload();
    }
  }, token?.data);

  useEffect(() => {
    if (inputValue && inputPwdValue && modalTitle === "Login")
      setIsEmailPwdFilled(true);
    else setIsEmailPwdFilled(false);
  }, [inputValue, inputPwdValue]);

  useEffect(() => {
    if (token.error?.message === "User not found.") {
      alert(token.error?.message);
    } else if (token.error?.message === "Invalid password.") {
      alert(token.error?.message);
    }
  }, [token]);

  return (
    <>
      <button
        className={`py-[2px] px-4 border border-gray-400 rounded shadow ${modalOpenBtnClassName}`}
        type="button"
        onClick={() => setShowModal(true)}
      >
        {modalOpenBtnName}
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-[400px] left-[40%]">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between">
                  <button
                    className="p-1 ml-auto bg-transparent text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className=" items-center text-center justify-between p-5 rounded-t">
                  <h3 className="text-3xl font-semibold">{modalTitle}</h3>
                </div>
                <div className="relative p-6 text-center">
                  <p className="my-2 text-blueGray-500 text-md leading-relaxed">
                    Log in or sign up to get the most out of your xyz car portal
                    experience.
                  </p>
                  <TextBox
                    placeholder="email@gmail.com"
                    type={textBoxTypes.Email}
                    onChange={onChangeHandler}
                    value={inputValue}
                    className="w-full"
                  />
                  {isContinueBtn && (
                    <>
                      <TextBox
                        placeholder="password"
                        type={textBoxTypes.Password}
                        onChange={onChangePasswordHandler}
                        value={inputPwdValue}
                        className="mt-2 w-full"
                      />
                      {isShowPWDVerificationModal && (
                        <div className=" bg-white border p-2 shadow-lg rounded w-48 -right-48 fixed z-50 top-[39%] left-[60%]">
                          <ul>
                            <li
                              className={`text-xs ${
                                isLowercaseLetter
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              At least one lowercase letter (a-z)
                            </li>
                            <li
                              className={`text-xs ${
                                isUppercaseLetter
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              At least one uppercase letter (A-Z)
                            </li>
                            <li
                              className={`text-xs ${
                                isMin8Characters
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              Minimum 8 characters
                            </li>
                            <li
                              className={`text-xs ${
                                isAtLeastOneNumber
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              At least one number (0-9)
                            </li>
                            <li
                              className={`text-xs ${
                                isAtLeastOneSpecialCharacter
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              At least one special character
                            </li>
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                  {modalTitle === "Signup" && isContinueBtn && (
                    <>
                      <div className="flex">
                        <TextBox
                          placeholder="First name"
                          type={textBoxTypes.Text}
                          onChange={onChangeFNameHandler}
                          value={inputFNameValue}
                          className="mt-2 mr-1 w-full"
                        />
                        <TextBox
                          placeholder="Last name"
                          type={textBoxTypes.Text}
                          onChange={onChangeLNameHandler}
                          value={inputLNameValue}
                          className="mt-2 ml-1 w-full"
                        />
                      </div>
                      {/* <DatePicker
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                        selected={inputDateValue}
                        onChange={onChangeDatePickerHandler}
                        placeholderText="Date of birth"
                      /> */}
                    </>
                  )}
                  <RoundedButton
                    text={
                      isEmailPwdFilled && modalTitle === "Login"
                        ? ButtonLabels.Login
                        : ButtonLabels.Continue
                    }
                    className={`bg-[#d25a5f] text-white hover:bg-[#c72a2fe3] disabled disabled:opacity-[70%] outline-none focus:outline-none mt-2 mb-1 w-full h-9 ${continueBtnClass}`}
                    onClickButton={onClickContinueBtn}
                  />
                  {/* <Link
                    text="Forgot password"
                    className="text-xs underline text-blue-600 text-left"
                  /> */}
                </div>
                <>
                  <div className="relative p-0 text-center">
                    <p className="my-0 text-blueGray-400 text-sm leading-relaxed">
                      Or
                    </p>
                  </div>
                  <div className="relative p-6 text-center">
                    {/* <RoundedButton
                      text="Continue with Google"
                      className="bg-white text-black hover:bg-[#d1d1d1e3] border mt-2 mb-1 w-full h-9 flex items-center justify-center"
                      imgSrc="https://cdn.pgimgs.com/hive-ui/static/v0.1.28/logo/google.svg"
                    /> */}
                    <LoginSocialFacebook
                      appId={process.env.REACT_APP_FB_APP_ID!}
                      onResolve={(response: any) => {
                        setFacebookData(response);
                      }}
                      onReject={(error) => {
                        setFacebookLoginError(error);
                      }}
                    >
                      <RoundedButton
                        text="Continue with Facebook"
                        className="bg-white text-black hover:bg-[#d1d1d1e3] border mt-2 mb-1 w-full h-9 flex items-center justify-center"
                        imgSrc="https://cdn.pgimgs.com/hive-ui/static/v0.1.28/logo/facebook.svg"
                      />
                    </LoginSocialFacebook>
                  </div>
                </>
                <div className="text-center items-center justify-end p-2 rounded-b border-t-2">
                  <p className="text-xs">
                    I agree to XYZ Car Portal's Terms of Service and Privacy
                    Policy including the collection, use and disclosure of my
                    personal information.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default LoginOrSignupModal;
