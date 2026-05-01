import dynamic from "next/dynamic";
import VideoGrid from "@components/VideoList/VideoGrid";
import { Box, Container, Flex } from "@chakra-ui/react";
import VideoPlayerContainerSkeleton from "@/components/VideoPlayer/VideoPlayerContainerSkeleton";
import { getCachedVideo } from "@/lib/api/video";
import { getVideoId } from "@/lib/utils/utils";
import { notFound } from "next/navigation";
import { Item } from "@/lib/types";

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

export async function generateStaticParams() {
  const { data } = await getCachedVideo({});
  return data.items.map((v: string) => ({ id: getVideoId(v) }));
}

async function getVideos() {
  const response = await getCachedVideo({});
  return { data: response?.data, error: null };
}
export const revalidate = 3600;
export const dynamicParams = true;

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = params;

  const videos = await getVideos();

  if (!videos) notFound();

  const getVideoById = (id: string) => {
    const video = videos?.data?.items.find((video: Item) => video.id === id);

    return video;
  };

  const filteredVideo = getVideoById(id);

  if (!filteredVideo) notFound();

  return (
    <Container maxW="8xl" py="8">
      <Flex align="stretch" direction={{ base: "column", md: "row" }} gap="8">
        <Box maxW="6xl" mx="auto" w="100%">
          <VideoPlayerContainer
            video={filteredVideo}
            playerType="iframe"
            showInfo={true}
            autoPlay={true}
          />
        </Box>

        <VideoGrid
          videos={videos?.data}
          title="Related Videos"
          isRelated={true}
        />
      </Flex>
    </Container>
  );
}
