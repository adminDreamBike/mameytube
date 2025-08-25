export interface RootObject {
  etag: string;
  items: Item[];
  kind: string;
  pageInfo: PageInfo;
  regionCode?: string;
  nextPageToken?: string;
}

interface IID {
  kind: string;
  videoId: string;
}
export interface Item {
  etag: string;
  id: string | IID;
  kind: string;
  snippet: Snippet;
  statistics: Statistics;
}

export interface Snippet {
  categoryId?: string;
  channelId?: string;
  channelTitle?: string;
  description: string;
  liveBroadcastContent?: string;
  localized: Localized;
  publishedAt: Date;
  thumbnails: Thumbnails;
  title: string;
  country?: string;
  customUrl?: string;
}

export interface Localized {
  description: string;
  title: string;
}

export interface Thumbnails {
  default: Default;
  high: Default;
  medium: Default;
  standard: Default;
  maxres: Default;
}

export interface Default {
  height: number;
  url: string;
  width: number;
}

export interface Statistics {
  commentCount: string;
  favoriteCount: string;
  likeCount: string;
  viewCount: string;
}

export interface PageInfo {
  resultsPerPage: number;
  totalResults: number;
}

export type TypeVideo = "video" | "channel" | "playlist";

export interface IVideo {
  initialVideos?: Item[];
  q?: string;
  type?: TypeVideo;
}