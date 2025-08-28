import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
