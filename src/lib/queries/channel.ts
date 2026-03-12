import { useQuery } from "@tanstack/react-query";
import { searchChannel } from "@lib/api/channel";

export const useChannel = ({ channelId }: { channelId: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ["channels", channelId],
    queryFn: () => searchChannel({ channelId })
  });

  return { channels: data?.data?.items, isSuccess };
};
