import { useQuery } from "@tanstack/react-query";
import { getVideo, searchVideos } from "@/lib/api/video";
import { IVideo } from "../types";

export const useVideos = ({ q, initialVideos }: IVideo) => {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["videos", "items", q],
    queryFn: () => getVideo({ q }),
    initialData: initialVideos,
    retry: (failureCount, error) => {
      const err = error as { response?: { status?: number }; status?: number };
      // Don't retry on 403 errors (auth/permission issues)
      if (err?.response?.status === 403 || err?.status === 403) {
        return false;
      }
      // Don't retry on 400 errors (bad request)
      if (err?.response?.status === 400 || err?.status === 400) {
        return false;
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return { videos: data, isLoading, isError, error, isSuccess };
};

export const useSearchVideos = ({ q }: IVideo) => {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["videos", "search", q],
    queryFn: () => searchVideos({ q }),
    retry: (failureCount, error) => {
      const err = error as { response?: { status?: number }; status?: number };
      // Don't retry on 403 errors (auth/permission issues)
      if (err?.response?.status === 403 || err?.status === 403) {
        return false;
      }
      // Don't retry on 400 errors (bad request)
      if (err?.response?.status === 400 || err?.status === 400) {
        return false;
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return { videos: data, isLoading, isError, error, isSuccess };
};