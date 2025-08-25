import { useQuery } from "@tanstack/react-query";
import { getVideo, searchVideos } from "@/lib/api/video";
import { IVideo } from "../types";

export const useVideos = ({ q, initialVideos }: IVideo) => {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["videos", "items", q],
    queryFn: () => getVideo({ q }),
    initialData: initialVideos,
  });

  return { videos: data, isLoading, isError, error, isSuccess };
};

export const useSearchVideos = ({ q }: IVideo) => {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["videos", "search", q],
    queryFn: () => searchVideos({ q }),
  });

  return { videos: data, isLoading, isError, error, isSuccess };
};