/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { TypeVideo } from "../types";
import apiClient from "./apiClient";

const defaultParams = {
  part: "snippet",
  chart: "mostPopular",
  maxResults: 25,
};

interface GetVideoParams {
  q?: string;
  type?: TypeVideo;
}

// Helper function to check if API key is configured
const checkApiKey = () => {
  // Skip check in test environment as we're mocking the API calls
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  if (!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY) {
    throw new Error(
      'YouTube API key is not configured. Please set NEXT_PUBLIC_YOUTUBE_API_KEY in your environment variables.'
    );
  }
};

export const getVideo = async ({
  q,
  type = "video",
}: GetVideoParams): Promise<any> => {
  checkApiKey();

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
    const axiosError = error as AxiosError;

    // Log detailed error information
    console.error('getVideo API Error:', {
      status: axiosError.response?.status,
      message: axiosError.message,
      endpoint: '/videos',
      params: params,
    });

    // Re-throw with context
    throw error as AxiosError;
  }
};

export const searchVideos = async ({
  q,
  type = "video",
}: {
  q?: string;
  type?: TypeVideo;
}) => {
  checkApiKey();

  const params = {
    ...defaultParams,
    q: q,
    type: type,
    part: "snippet",
  };

  try {
    const response = await apiClient.get("/search", {
      params: params,
    });
    return response;
  } catch (error) {
    const axiosError = error as AxiosError;

    // Log detailed error information
    console.error('searchVideos API Error:', {
      status: axiosError.response?.status,
      message: axiosError.message,
      endpoint: '/search',
      params: params,
    });

    // Re-throw with context
    throw error as AxiosError;
  }
};
