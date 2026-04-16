import { useQuery } from "@tanstack/react-query";
import { searchChannel } from "@lib/api/channel";
import { QUERY_KEYS } from "../queryKeys";

export const useChannel = ({ channelId }: { channelId: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.channels, channelId],
    queryFn: () => searchChannel({ channelId })
  });

  return { channels: data?.data?.items, isSuccess };
};
