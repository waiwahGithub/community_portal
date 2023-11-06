import { useQuery } from "react-query";
import { sendSlackMessage } from "../lib/api";

const useSendSlackMessage = (enabled = false, text: any) => {
  const sendSlackMessageQuery = useQuery<any, Error>(
    ["sendSlackMessage"],
    () => sendSlackMessage(text),
    {
      enabled: enabled,
      retry: true,
      refetchInterval: 10000,
      cacheTime: 0,
      onError: () => {
        console.log(Error);
      },
    }
  );

  return sendSlackMessageQuery;
};

export default useSendSlackMessage;
