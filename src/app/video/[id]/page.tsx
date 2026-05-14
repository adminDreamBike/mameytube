import dynamic from "next/dynamic";
import VideoGrid from "@components/VideoList/VideoGrid";
import { Box, Container, Flex } from "@chakra-ui/react";
import VideoPlayerContainerSkeleton from "@/components/VideoPlayer/VideoPlayerContainerSkeleton";
import { getCachedVideo } from "@/lib/api/video";
import { getVideoId } from "@/lib/utils/utils";
import { notFound } from "next/navigation";
import { Item, RootObject } from "@/lib/types";
import { Metadata } from "next";

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

const getVideoById = (id: string, videos: RootObject) => {
  if(!videos) return undefined;

  const { items } = videos

  const videoById = items?.find((video: Item) => video.id === id);
  

  return videoById;
};

export async function generateStaticParams() {
  const { items } = await getCachedVideo({});
  return items.map((v: string) => ({ id: getVideoId(v) }));
}

export async function generateMetadata({ params }: VideoPageProps): Promise<Metadata> {
  const { id } = params;

  const { data } = await getCachedVideo({});
  const filteredVideo = getVideoById(id, data);
  return {
    title: filteredVideo?.snippet.title,
  };
}

export const revalidate = 3600;
export const dynamicParams = true;

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = params;

  const videos = await getCachedVideo({});
  
  if (!videos) notFound();

  const filteredVideo = getVideoById(id, videos);
  
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
          videos={videos?.items}
          title="Related Videos"
          isRelated={true}
        />
      </Flex>
    </Container>
  );
}
