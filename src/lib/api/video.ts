import { AxiosError } from "axios";
import { TypeVideo } from "../types";
import apiClient from "./apiClient";

const defaultParams = {
  part: "snippet",
  chart: "mostPopular",
  maxResults: 25,
}

export const getVideo = async ({
  q,
  type = "video",
}: {
  q?: string;
  type?: TypeVideo;
}): Promise<unknown> => {
  const withStatistics = q
    ? "snippet"
    : "id, statistics, snippet, contentDetails";
  const params = {
    part: withStatistics,
    chart: "mostPopular",
    maxResults: 25,
    q: q,
    type: type,
  };

  try {
    const response = await apiClient.get("/videos", {
      params: params,
    });
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};

export const searchVideos = async ({
  q,
  type = 'video'
}: {
  q?: string;
  type?: TypeVideo;
}) => {
  const params = {
    ...defaultParams,
    q: q,
    type: type,
    part: "snippet",
  }

  try {
    const response = await apiClient.get("/search", {
      params: params,
    });
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
}