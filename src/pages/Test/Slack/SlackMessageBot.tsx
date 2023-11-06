import { useEffect, useRef, useState } from "react";
import Nav from "../../../components/Nav/Nav";
import { RoundedButton } from "../../../components/button/Button";
import useSendSlackMessage from "../../../hooks/use-SendSlackMessage";

const Slack = () => {
  const onSaveBtnClickedRef = useRef<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const sendSlackMessage = useSendSlackMessage(
    onSaveBtnClickedRef.current,
    message
  );

  useEffect(() => {
    if (sendSlackMessage.data) {
      window.location.reload();
      alert("Message sent");
    } else if (
      sendSlackMessage.isFetchedAfterMount &&
      sendSlackMessage.isError
    ) {
      alert("Error in sending message, please refresh the page and try again");
    }
  }, [sendSlackMessage]);

  const onSaveBtnClicked = () => {
    onSaveBtnClickedRef.current = true;
    sendSlackMessage.refetch();
  };

  return (
    <div>
      <Nav />
      <div className="mt-24 px-64">
        <p className="text-4xl font-medium">My Slack</p>
        <p className="text-2xl font-medium mt-10">Message Details</p>
        <p className="text-sm mt-4">Message</p>
        <textarea
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Write your slack message here..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
        ></textarea>
      </div>
      <div className="mt-10 mb-20 px-64">
        <RoundedButton
          text="Save"
          className="bg-[#d25a5f] text-white hover:bg-[#c72a2fe3] mr-4"
          onClickButton={onSaveBtnClicked}
        />
        <RoundedButton
          text="Cancel"
          className="bg-white text-black hover:bg-[#d1d1d1e3] border"
        />
      </div>
    </div>
  );
};

export default Slack;
