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
  modalOnClicked?: (e?: any) => void;
}

const RowStandardModal: React.FC<Props> = (props) => {
  const {
    className,
    followersCount = "123,123",
    membersCount = "123,566",
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
  } = props;

  return (
    <>
      <footer
        className={`flex items-center justify-between leading-none p-2 md:px-4 md:py-2 hover:bg-gray-100 ${className}`}
        onClick={modalOnClicked}
      >
        <div className="grid grid-rows-2 grid-flow-col cursor-pointer ">
          <div className="row-span-3">
            <img
              alt="Placeholder"
              className="block rounded-full w-full"
              src="https://picsum.photos/32/32/?random"
            />
          </div>
          <p className="ml-2 text-sm font-medium">
            {friendName || communityName || notificationName}
          </p>
          <p className="ml-2 text-sm text-gray-500 font-light">
            {isFriendModal
              ? followersCount + " Followers"
              : isCommunityModal
              ? membersCount + " Members"
              : isNotificationModal
              ? notificationTime + "hrs"
              : ""}
          </p>
        </div>
        {(isFriendModal || isCommunityModal) && (
          <RoundedButton
            text={btnText}
            className={`text-sm  row-end-4 bg-[#d25a5f] text-white ${
              btnClassName ? "" : "w-[60px]"
            }`}
            onClickButton={() => {}}
          />
        )}
      </footer>
    </>
  );
};
export default RowStandardModal;
