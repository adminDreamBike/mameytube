"use client";

import VideoGrid from "@/components/VideoList/VideoGrid";
import { VideoPlayerContainer } from "@/components/VideoPlayer/VideoPlayerContainer";
import { useVideoById, useVideos } from "@/stores/videos";
import { Box, Container, Flex, Text } from "@chakra-ui/react";

interface VideoPageProps {
  params: { id: string };
}
export default function VideoPage({ params }: VideoPageProps) {
  const video = useVideoById(params.id);
  const relatedVideos = useVideos();
  console.log("video", video);

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

        <VideoGrid videos={relatedVideos} title="Related Videos" isRelated={true} />
      </Flex>
    </Container>
  );
}
