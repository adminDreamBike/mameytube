export interface ContentDetails {
  caption: string;
  contentRating: {
    country: string;
    jurisdiction: string;
  };
  definition: string;
  dimension: string;
  duration: string;
  licensedContent: boolean;
  projection: string;
}

export interface VideoId {
  kind: string;
  videoId: string;
}

export type VideoPlayerType = "iframe" | "native";

export interface VideoPreview {
  contentDetails?: ContentDetails;
  etag: string;
  id: string | VideoId;
  kind: string;
  snippet: {
    categoryId: string;
    channelId: string;
    channelTitle: string;
    defaultAudioLanguage: string;
    defaultLanguage: string;
    description: string;
    liveBroadcastContent: string;
    localized: {
      description: string;
      title: string;
    };
    publishedAt: string;
    tags: string[];
    thumbnails: {
      default: {
        height: number;
        url: string;
        width: number;
      };
      high: {
        height: number;
        url: string;
        width: number;
      };
      medium: {
        height: number;
        url: string;
        width: number;
      };
      standard: {
        height: number;
        url: string;
        width: number;
      };
      maxres: {
        height: number;
        url: string;
        width: number;
      };
    };
    title: string;
  };
  statistics?: {
    commentCount: number;
    favoriteCount: number;
    likeCount: number;
    viewCount: number;
  };
}

export interface VideosResponse {
  items: VideoPreview[];
  kind: string;
  etag: string;
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}
