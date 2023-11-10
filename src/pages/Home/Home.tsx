import WidthSizeDetection from "../../assets/config/WidthSizeDetection";
import Nav from "../../components/Nav/Nav";
import SideBar from "../../components/SideBar/SideBar";
import CommunityModal from "../../components/modal/CommunityModal";
import AdvanceModalWithBtn from "../../components/modal/AdvanceModalWithButton";
import Post from "../../components/post/Post";

const Home = () => {
  const widthSize = WidthSizeDetection();

  return (
    <div className="bg-[#F0F2F5] min-h-screen ">
      <Nav />
      <SideBar />
      <div className="flex pt-28">
        <div
          className={`flex ${
            widthSize.mediumDevice ? "w-2/12 mr-14" : "w-3/12 mr-5"
          } `}
        ></div>
        <div
          className={`${widthSize.mediumDevice ? "basis-6/12" : "basis-5/12"}`}
        >
          <AdvanceModalWithBtn
            modalOpenBtnName="Create ckl post"
            modalTitle="Create a post"
            className="bg-white h-10 ml-4 mb-5"
          />
          <Post />
          <Post />
          <Post />
        </div>
        <div
          className={`${widthSize.mediumDevice ? "basis-3/12" : "basis-1/6"}`}
        >
          <CommunityModal />
        </div>
      </div>
    </div>
  );
};

export default Home;
