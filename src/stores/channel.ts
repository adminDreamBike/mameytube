import { Item } from "@lib/types";
import { create } from "zustand";

interface ChannelState {
  kind: string;
  etag: string;
  items: Item[];
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

interface ChannelStoreState {
  channel: ChannelState;
  setChannel: (channel: ChannelState) => void;
}

const INITIAL_STATE: ChannelStoreState = {
  channel: {
    kind: "",
    etag: "",
    items: [],
    nextPageToken: "",
    pageInfo: {
      totalResults: 0,
      resultsPerPage: 0,
    },
  },
  setChannel: () => {},
};
export const useChannelStore = create<ChannelStoreState>((set) => ({
  channel: INITIAL_STATE.channel,
  setChannel: (channel) => set(() => ({ channel })),
}));
