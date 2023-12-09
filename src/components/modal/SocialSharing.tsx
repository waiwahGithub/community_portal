import { useEffect, useState } from "react";
import { useSharePostQuery } from "../../hooks/use-PostQuery";
import { useSharePostNotificationQuery } from "../../hooks/use-NotificationQuery";

interface Props {
  className?: string;
  url?: any;
  onClose: () => void;
  postId?: any;
  targetUserId?: any;
}

const SocialSharing: React.FC<Props> = ({
  url,
  onClose,
  postId,
  targetUserId,
}) => {
  // Global
  const [accountQuery, setAccountQuery] = useState<any>(
    localStorage.getItem("jwt_token")
  );
  const account = JSON.parse(accountQuery);

  // State
  const [isShowCopy, setIsShowCopy] = useState<boolean>(false);

  // API
  const sharePostQuery = useSharePostQuery(isShowCopy, account?.id, postId);
  const sharePostNotificationQuery = useSharePostNotificationQuery(
    isShowCopy,
    account?.id,
    postId,
    targetUserId,
    3
  );

  // useEffect
  useEffect(() => {
    if (sharePostQuery.isSuccess) {
      console.log("Shared");
      setIsShowCopy(false);
      localStorage.setItem("needRefreshQuery", "true");
    }
  }, [sharePostQuery.isSuccess]);

  return (
    <>
      <div>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-[400px] left-[40%]">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between">
                <button
                  className="p-1 ml-auto bg-transparent text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={onClose}
                >
                  <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className=" items-center text-center justify-between p-5 rounded-t">
                <div>
                  <div
                    className={`bg-white text-[#181028] p-8 space-y-5 rounded-xl px-8 text-center`}
                  >
                    <div className="w-full flex justify-end text-xl"></div>
                    <div>
                      <h3 className="text-xl font-bold">Share this article</h3>
                      <span>
                        If you liked this article share it with your friends.
                      </span>{" "}
                      <br />
                      <span>They will thank you later.</span>
                    </div>

                    <div className=" mb-2 flex flex-wrap justify-center">
                      <p className="mb-3 bg-slate-200 rounded-full px-2 py-2 text-sm">
                        {url}
                      </p>
                    </div>

                    <p
                      className="underline cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(url);
                        setIsShowCopy(true);

                        setTimeout(() => {
                          setIsShowCopy(false);
                        }, 1000);
                      }}
                    >
                      Copy this link
                    </p>
                    <p className={`${isShowCopy ? "" : "hidden"}`}>copy!</p>

                    {/* <span>4.5K Shares</span> */}

                    {/* <span className="text-red-400">Close this window</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </div>
    </>
  );
};

export default SocialSharing;
