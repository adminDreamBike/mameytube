'use client'

import React, { FC, useEffect, useState } from "react";
import {
  VStack,
  Text,
  Skeleton,
  Button,
  useBreakpointValue,
  SimpleGrid,
} from "@chakra-ui/react";
import VideoCard from "./VideoCard";
import { useVideoActions } from "@/stores/videos";
import { VideosResponse } from "@/types/video";
import { getVideoId } from "@/lib/utils/utils";

interface VideoGridProps {
    videos: VideosResponse;
    isLoading?: boolean;
    hasNextPage?: boolean;
    onLoadMore?: () => void;
    isLoadingMore?: boolean;
    title?: string;
    isRelated?: boolean;
}

const VideoGrid: FC<VideoGridProps> = ({
    videos,
    isLoading = false,
    hasNextPage = false,
    onLoadMore,
    isLoadingMore = false,
    title = 'Videos',
    isRelated = false,
}) => {
    const [hoveredVideo, setHoveredVideo] = useState<string | null>(null)
    const { setVideos } = useVideoActions()
    
    const columns = useBreakpointValue({
        base: isRelated ? 2 : 1,
        sm: 2,
        md: isRelated ? 1 : 2,
        lg: isRelated ? 1 : 3,
        xl: isRelated ? 1 : 4,
    })

    const handleVideoHover = (videoId: string | undefined) => {
        setHoveredVideo(videoId || null)
    }

    const handleVideoLeave = (): void => {
        setHoveredVideo(null)
    }

    useEffect(() => {
        if (videos) {
            setVideos(videos)
        }
    }, [setVideos, videos])

    if (isLoading) {
        return (
            <VStack spacing='6' align='stretch'>
                <Text fontSize='2xl' fontWeight='bold'>{title}</Text>
                <SimpleGrid columns={columns} spacing={6}>
                    {Array.from({ length: 12 }).map((_, index) => (
                        <VStack key={index} spacing='3'>
                            <Skeleton height='200px' borderRadius='lg' />
                            <VStack spacing='2' align='stretch' w='100%'>
                                <Skeleton height='20px' />
                                <Skeleton height='16px' />
                                <Skeleton height='16px' width='60%' />
                            </VStack>
                        </VStack>
                    ))}
                </SimpleGrid>
            </VStack>
        )
    }

    return (
        <VStack spacing='6' align='stretch'>
            <Text fontSize='2xl' fontWeight='bold'>{title}</Text>
            <SimpleGrid columns={columns} spacing={6}>
                {videos?.items?.map((video) => (
                    <VideoCard
                        key={getVideoId(video.id)}
                        video={video}
                        showPreview={hoveredVideo === video.id}
                        onHover={handleVideoHover}
                        onLeave={handleVideoLeave}
                        isRelated={isRelated}
                    />
                ))}
            </SimpleGrid>

            {hasNextPage && (
                <Button
                    onClick={onLoadMore}
                    isLoading={isLoadingMore}
                    colorScheme='blue'
                    variant='outline'
                >
                    Load More Videos
                </Button>
            )}
        </VStack>
    )
}

export default VideoGrid;