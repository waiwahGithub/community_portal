import { imgBase64 } from "../../assets/base64/imgBase64";
import WidthSizeDetection from "../../assets/config/WidthSizeDetection";
import Nav from "../../components/Nav/Nav";
import { RoundedButton } from "../../components/button/Button";
import CommunityModal from "../../components/modal/CommunityModal";
import Post from "../../components/post/Post";

const Community = () => {
  const widthSize = WidthSizeDetection();

  return (
    <div className="bg-[#F0F2F5] min-h-screen ">
      <Nav />
      <div
        className={`mt-28 bg-white flex ${
          widthSize.mediumDevice ? "px-[150px]" : "px-[320px]"
        }`}
      >
        <div className="grid grid-rows-2 grid-flow-col w-[400px] justify-center align-middle justify-items-start mb-10">
          <div className="row-span-3">
            <img
              alt="Placeholder"
              className="block rounded-full h-auto w-16"
              src="https://picsum.photos/128/128/?random"
            />
          </div>
          <p className="ml-2 text-md font-medium">Java group</p>
          <p className="ml-2 text-sm text-gray-500 font-light">
            123,446 Members
          </p>
          <RoundedButton
            text="Joined"
            className="text-sm w-3/4 ml-2 row-end-4 bg-[#d25a5f] text-white cursor-default opacity-50"
            onClickButton={() => {}}
          />
        </div>
      </div>
      <div className="flex pt-10">
        <div
          className={`flex ${
            widthSize.mediumDevice ? "w-2/12" : "w-2/12 mr-20"
          } `}
        ></div>
        <div
          className={`${widthSize.mediumDevice ? "basis-6/12" : "basis-5/12"}`}
        >
          <RoundedButton
            text="Create a post"
            className="bg-white h-10 ml-4 mb-5"
          />
          <Post />
          <Post />
          <Post />
        </div>
        <div
          className={`${widthSize.mediumDevice ? "basis-3/12" : "basis-1/6"}`}
        >
          <div className={`mb-10 px-1 w-full lg:px-4 mt-16 `}>
            <article className="overflow-hidden rounded-lg shadow-lg bg-white">
              <header className="flex items-center justify-between leading-tight px-2 pt-2">
                <h1 className="text-lg my-3 ml-2 font-bold">About Community</h1>
              </header>
              <hr />
              <p className="px-3 my-3 text-sm text-gray-700">
                Welcome to JavaGroup: The place for anything in Java.
              </p>
              <p className="flex px-3 py-3">
                <img
                  src={imgBase64.clockOutlineIcon}
                  className="w-[15px] h-[15px]"
                />
                <span className="text-xs text-gray-600 ml-2">
                  Created since Jan 26, 2018
                </span>
              </p>
              <hr />
              <p className="text-center font-bold text-2xl my-5">
                123K Members
              </p>
              <hr />
              <p className="font-medium px-3 text-sm pt-3">Admin</p>
              <p className="flex px-3 pb-3">
                <img
                  src="https://picsum.photos/32/32/?random"
                  className="w-[40px] rounded-full"
                />
                <span className="text-sm text-gray-600 mt-2 ml-4">
                  Kelvin low
                </span>
              </p>
              <hr />
              <p className="text-center text-sm py-3 hover:bg-gray-100 hover:cursor-pointer">
                Leave community
              </p>
              <footer className="flex items-center justify-between"></footer>
            </article>
          </div>
          <CommunityModal />
        </div>
      </div>
    </div>
  );
};

export default Community;
