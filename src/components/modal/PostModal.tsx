import React, { useState } from "react";
import TextBox from "../textbox/TextBox";
import { RoundedButton } from "../button/Button";
import { textBoxTypes } from "../../lib/filterConstants";

interface Props {
  className?: string;
  modalOpenBtnName?: string;
  modalOpenBtnClassName?: string;
  modalTitle?: string;
  closeBtnName?: string;
  actionBtnName?: string;
  inputValue?: string;
  isShowCreatePostModal?: boolean;
}

const PostModalWithBtn: React.FC<Props> = (props) => {
  const {
    modalOpenBtnName = "Open modal",
    modalOpenBtnClassName,
    modalTitle,
  } = props;

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className={`py-[2px] px-4 rounded-full shadow bg-white h-10 ml-4 mb-5 ${modalOpenBtnClassName}`}
        type="button"
        onClick={() => {
          setShowModal(true);
        }}
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
                  <TextBox
                    placeholder="Title"
                    type={textBoxTypes.Text}
                    className="w-full text-sm text-gray-900 mb-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <textarea
                    id="message"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border focus:ring-blue-500 focus:border-blue-500 shadow appearance-none focus:outline-none focus:shadow-outline mb-2"
                    placeholder="Write your thoughts here..."
                  ></textarea>
                  <TextBox
                    placeholder="Title"
                    type={textBoxTypes.File}
                    className="shadow-none border-none"
                  />
                </div>
                <div className="relative px-6 pb-6 text-center">
                  <RoundedButton
                    text="Post now"
                    className="bg-[#d25a5f] text-white hover:bg-[#c72a2fe3] disabled disabled:opacity-[70%] outline-none focus:outline-none mt-2 mb-1 w-full h-9"
                  />
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

export default PostModalWithBtn;
