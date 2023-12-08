import { useGetAllCommunityMembersQuery } from "../../hooks/use-CommunityQuery";
import { RoundedButton } from "../button/Button";

interface Props {
  className?: string;
  followersCount?: number;
  membersCount?: number;
  notificationTime?: any;
  isFriendModal?: boolean;
  isCommunityModal?: boolean;
  isNotificationModal?: boolean;
  friendName?: string;
  communityName?: string;
  notificationName?: string;
  btnText?: string;
  btnClassName?: string;
  modalOnClicked?: (e?: any, communityID?: any) => void;
  comment?: any;
  communityId?: any;
  logoPath?: string;
  notificationLink?: any;
  joinOnClicked?: (userId?: any, communityId?: any) => void;
}

const RowStandardModal: React.FC<Props> = (props) => {
  const {
    className,
    followersCount = "123,123",
    membersCount = 0,
    notificationTime = "5",
    isFriendModal = false,
    isCommunityModal = false,
    isNotificationModal = false,
    friendName,
    communityName,
    notificationName,
    btnText,
    btnClassName,
    modalOnClicked,
    notificationLink,
    comment,
    communityId,
    logoPath = "https://picsum.photos/32/32/?random",
    joinOnClicked,
  } = props;

  // API
  return (
    <>
      <footer
        className={`flex items-center justify-between leading-none p-2 md:px-4 md:py-2 hover:bg-gray-100 ${className}`}
      >
        <div
          className="grid grid-rows-2 grid-flow-col cursor-pointer "
          onClick={modalOnClicked}
        >
          <div className="row-span-3">
            <img
              alt="Placeholder"
              className="block rounded-full w-[40px] h-[40px]"
              src={logoPath}
            />
          </div>
          <p className="ml-2 text-sm font-medium">
            {friendName || communityName || notificationName}
            {notificationLink && (
              <>
                <a href={notificationLink} className="underline">
                  post
                </a>
              </>
            )}
          </p>
          <p className="ml-2 text-sm text-gray-500 font-light">
            {isFriendModal
              ? followersCount + " Followers"
              : isCommunityModal
              ? membersCount + " Members"
              : isNotificationModal
              ? notificationTime
              : ""}
          </p>
          {comment && <p className="ml-2 text-sm mt-2">{comment}</p>}
        </div>
        {(isFriendModal || isCommunityModal) && (
          <RoundedButton
            text={btnText}
            className={`text-sm  row-end-4 bg-[#d25a5f] text-white ${
              btnClassName ? "" : "w-[60px]"
            }`}
            onClickButton={joinOnClicked}
          />
        )}
      </footer>
    </>
  );
};
export default RowStandardModal;
