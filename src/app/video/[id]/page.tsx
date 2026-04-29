'use client'

import { useEffect } from 'react';
import dynamic from "next/dynamic";
import VideoGrid from "@components/VideoList/VideoGrid";
import { useVideoById, useVideos } from "@stores/videos";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import VideoPlayerContainerSkeleton from "@/components/VideoPlayer/VideoPlayerContainerSkeleton";

const VideoPlayerContainer = dynamic(
  () =>
    import("@components/VideoPlayer/VideoPlayerContainer").then(
      (m) => m.VideoPlayerContainer,
    ),
  { ssr: false, loading: () => <VideoPlayerContainerSkeleton /> },
);
interface VideoPageProps {
  params: { id: string };
}
export default function VideoPage({ params }: VideoPageProps) {
  const video = useVideoById(params.id);
  const relatedVideos = useVideos();

  return (
    <Container maxW="8xl" py="8">
      <Flex align="stretch" direction={{ base: "column", md: "row" }} gap="8">
        <Box maxW="6xl" mx="auto" w="100%">
          {video ? (
            <VideoPlayerContainer
              video={video}
              playerType="iframe"
              showInfo={true}
              autoPlay={true}
            />
          ) : (
            <Text>Video not found</Text>
          )}
        </Box>

        <VideoGrid
          videos={relatedVideos}
          title="Related Videos"
          isRelated={true}
        />
      </Flex>
    </Container>
  );
}
