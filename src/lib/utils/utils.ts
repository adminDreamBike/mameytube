/* eslint-disable @typescript-eslint/no-explicit-any */
import { VideoId } from "@/types/video";

export function getCategories() {
  const newCategories = [
    { 1: "Film & Animation" },
    { 2: "Autos & Vehicles" },
    { 10: "Music" },
    { 15: "Pets & Animals" },
    { 17: "Sports" },
    { 18: "Short Movies" },
    { 19: "Travel & Events" },
    { 20: "Gaming" },
    { 21: "Videoblogging" },
    { 22: "People & Blogs" },
    { 23: "Comedy" },
    { 24: "Entertainment" },
    { 25: "News & Politics" },
    { 26: "Howto & Style" },
    { 27: "Education" },
    { 28: "Science & Technology" },
    { 29: "Nonprofits & Activism" },
    { 30: "Movies" },
  ];
  return newCategories;
}

export const YTDurationToSeconds = (duration: any) => {
  if (!duration) return 0;

  let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  if (!match) return 0;

  match = match.slice(1).map(function(x: any) {
    if (x != null) {
        return x.replace(/\D/, '');
    }
  });

  const hours = (parseInt(match[0]) || 0);
  const minutes = (parseInt(match[1]) || 0);
  const seconds = (parseInt(match[2]) || 0);

  return hours * 3600 + minutes * 60 + seconds;
}

export const formatViews = (views: number) => {
  if (!views) return "0";

  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

export const formatDuration = (duration: string) => {
  if (!duration) return '0s';
  const seconds = YTDurationToSeconds(duration);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const parts = [];
  if (hours > 0) {
    parts.push(`${hours}h`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }
  if (remainingSeconds > 0 || parts.length === 0) {
    parts.push(`${remainingSeconds}s`);
  }
  return parts.join(' ');
}

export const formatUploadDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;

  return `${Math.floor(diffDays / 365)} years ago`;
};

export const getVideoId = (id: string | VideoId | undefined)  => {
  if (typeof id === "string") return id;

  return id?.videoId;

}