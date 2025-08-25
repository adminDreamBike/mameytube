import { AxiosError, AxiosResponse } from "axios";
import apiClient from "./apiClient";

export const searchChannel = async ({
  channelId,
}: {
  channelId: string;
}): Promise<AxiosResponse> => {
  try {
    const response = await apiClient.get("/channels", {
      params: {
        id: channelId,
        part: "snippet",
      },
    });
    return response;
  } catch (error) {
    throw error as AxiosError;
  }
};
