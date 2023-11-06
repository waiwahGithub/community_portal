import { useNavigate } from "react-router-dom";
import Link from "../link/Link";
import RowStandardModal from "./RowStandardModal";

interface Props {
  className?: string;
}

const CommunityModal: React.FC<Props> = (props) => {
  const { className } = props;
  const navigate = useNavigate();

  const modalOnClicked = () => {
    navigate("/community");
  };

  return (
    <>
      <div className={`mb-10 px-1 w-full lg:px-4 mt-16 ${className}`}>
        <article className="overflow-hidden rounded-lg shadow-lg bg-white">
          <header className="flex items-center justify-between leading-tight px-2 pt-2">
            <h1 className="text-lg mt-3 ml-2">Communities</h1>
          </header>
          <RowStandardModal
            isCommunityModal={true}
            btnText="Join"
            communityName="FirdausGroup"
            modalOnClicked={modalOnClicked}
          />
          <RowStandardModal
            isCommunityModal={true}
            btnText="Join"
            communityName="Javagroup"
            modalOnClicked={modalOnClicked}
          />
          <RowStandardModal
            isCommunityModal={true}
            btnText="Join"
            communityName="Javagroup"
            modalOnClicked={modalOnClicked}
          />
          <RowStandardModal
            isCommunityModal={true}
            btnText="Join"
            communityName="Javagroup"
            modalOnClicked={modalOnClicked}
          />
          <footer className="flex items-center justify-between">
            <Link
              text="See more"
              className="text-center mx-auto text-xs underline hover:text-gray-500 hover:cursor-pointer ml-5 mb-5 mt-1"
            />
          </footer>
        </article>
      </div>
    </>
  );
};

export default CommunityModal;
