"use client";

import VideoGrid from "@/components/VideoList/VideoGrid";
import { useSearchVideos } from "@/lib/queries/video";
import { useVideoActions } from "@/stores/videos";
import { Flex } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const q_param = searchParams.get("q") || "";
  const { videos } = useSearchVideos({ q: q_param });
  const { setVideos } = useVideoActions();
  
console.log("videos", videos)
  useEffect(() => {
    if (videos) {
        setVideos(videos?.data)
    }
}, [setVideos, videos])
  
  return (
    <Flex flexDirection="column" gap="20px" marginTop="20px">
     <VideoGrid videos={videos?.data} />
    </Flex>
  );
}
