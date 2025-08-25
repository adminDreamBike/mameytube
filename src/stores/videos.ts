/* eslint-disable @typescript-eslint/no-explicit-any */
import { Item } from "@/lib/types";
import { getVideoId } from "@/lib/utils/utils";
import { VideoPreview } from "@/types/video";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface VideoState {
  kind: string;
  etag: string;
  items: VideoPreview[];
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}
interface Actions {
  setVideos: (video: any) => void;
  getVideoById: (id: string) => Item | undefined;
  setSelectedCategoryId: (selectedCategoryId: string) => void;
  setVideosByCategory: (categoryId: string) => void;
  clearFilters: () => void;
  getChannelId: () => void;
}

export interface VideoStore {
  video: VideoState;
  filteredVideosByCategory?: any;
  filteredVideos?: any;
  selectedCategoryId: string | null;
  channelIds: string;
  actions: Actions;
}

const INITIAL_STATE = {
  video: {
    kind: "",
    etag: "",
    items: [],
    nextPageToken: "",
    pageInfo: {
      totalResults: 0,
      resultsPerPage: 0,
    },
  },
  filteredVideosByCategory: undefined,
};

const useVideoStore = create<VideoStore>()(
  persist(
    (set, get) => ({
      video: INITIAL_STATE.video,
      filteredVideosByCategory: null,
      selectedCategoryId: "all",
      channelIds: "",
      actions: {
        setVideos: (video) => set(() => ({ video })),
        getVideoById: (id) => {
          return get().video.data?.items.find((item) => item.id === id);
        },
        setSelectedCategoryId: (categoryId) =>
          set({ selectedCategoryId: categoryId }),
        setVideosByCategory: (categoryId) => {
          const { video } = get();
          if (categoryId === "all") {
            set({
              filteredVideosByCategory: video.items,
              selectedCategoryId: categoryId,
            });
            return;
          }
          const filteredVideos = video.items.filter(
            (item) => item.snippet.categoryId === categoryId
          );
          set({
            filteredVideosByCategory: filteredVideos,
            selectedCategoryId: categoryId,
          });
        },
        getChannelId: () => {
          const { video } = get();
          const channelIds = video.items
            .map((item) => item.snippet.channelId)
            .join(",");
          set({ channelIds });
        },
        clearFilters: () =>
          set({
            filteredVideos: null,
            selectedCategoryId: "all",
            channelIds: "",
          }),
      },
    }),
    {
      name: "video-store",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);

export const useFilteredVideos = () =>
  useVideoStore((state) => {
    if (!state.selectedCategoryId || state.selectedCategoryId === "all") {
      return state.video.data?.items;
    }
    return state.filteredVideosByCategory;
  });
export const useSelectedCategoryId = () =>
  useVideoStore((state) => state.selectedCategoryId);
export const useVideoActions = () => useVideoStore((state) => state.actions);
export const useVideos = () => useVideoStore((state) => state.video);
export const useChannelIds = () => useVideoStore((state) => state.channelIds);
export const useVideoById = (id: string) => {
  return useVideoStore((state) => {
    const videoId = getVideoId(id);
    console.log("videoId", videoId)
    console.log("state.video.items", state.video)
    return state.video.items.find((video) => getVideoId(video.id) === videoId)
  });
};
