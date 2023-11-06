import WidthSizeDetection from "../../assets/config/WidthSizeDetection";
import Nav from "../../components/Nav/Nav";
import { RoundedButton } from "../../components/button/Button";
import Link from "../../components/link/Link";
import RowStandardModal from "../../components/modal/RowStandardModal";

const MyCommunity = () => {
  const widthSize = WidthSizeDetection();

  return (
    <div className="bg-[#F0F2F5] min-h-screen ">
      <Nav />
      <div className="flex pt-28">
        <div
          className={`flex ${
            widthSize.mediumDevice ? "w-2/12" : "w-2/12 mr-20"
          } `}
        ></div>
        <div
          className={`${widthSize.mediumDevice ? "basis-9/12" : "basis-7/12"}`}
        >
          <RoundedButton
            text="Create community"
            className="bg-white h-10 ml-4 mb-5"
          />
          <p className="ml-5 mb-5 text-2xl font-bold">
            You haven't join any community yet.
          </p>
          <hr className="basis-1/2 pt-4 mt-4 space-y-2 font-medium border-t border-gray-200" />
          <p className="ml-5 mb-5 text-md font-bold">Recommended Communities</p>
          <div className="grid grid-cols-3 gap-4">
            <RowStandardModal
              className="bg-white shadow rounded-lg my-2 mx-2"
              isCommunityModal={true}
              btnText="Joined"
              btnClassName="w-[80px]"
              communityName="JavaGroup"
            />
            <RowStandardModal
              className="bg-white shadow rounded-lg my-2 mx-2"
              isCommunityModal={true}
              btnText="Join"
              communityName="JavaGroup"
            />
            <RowStandardModal
              className="bg-white shadow rounded-lg my-2 mx-2"
              isCommunityModal={true}
              btnText="Join"
              communityName="JavaGroup"
            />
            <RowStandardModal
              className="bg-white shadow rounded-lg my-2 mx-2"
              isCommunityModal={true}
              btnText="Join"
              communityName="JavaGroup"
            />
            <RowStandardModal
              className="bg-white shadow rounded-lg my-2 mx-2"
              isCommunityModal={true}
              btnText="Join"
              communityName="JavaGroup"
            />
            <RowStandardModal
              className="bg-white shadow rounded-lg my-2 mx-2"
              isCommunityModal={true}
              btnText="Join"
              communityName="JavaGroup"
            />
            <RowStandardModal
              className="bg-white shadow rounded-lg my-2 mx-2"
              isCommunityModal={true}
              btnText="Join"
              communityName="JavaGroup"
            />
            <RowStandardModal
              className="bg-white shadow rounded-lg my-2 mx-2"
              isCommunityModal={true}
              btnText="Join"
              communityName="JavaGroup"
            />
            <RowStandardModal
              className="bg-white shadow rounded-lg my-2 mx-2"
              isCommunityModal={true}
              btnText="Join"
              communityName="JavaGroup"
            />
          </div>
          <div className="text-center my-4">
            <Link
              text="See more"
              path="/"
              className="text-sm underline text-gray-700 hover:text-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCommunity;
