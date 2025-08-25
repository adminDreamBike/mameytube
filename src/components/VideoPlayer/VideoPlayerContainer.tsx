"use client";

import React, { useState, useCallback } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Avatar,
  Button,
  IconButton,
  Divider,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Flex,
  useColorModeValue,
  useToast,
  Collapse,
  Link as ChakraLink,  
} from "@chakra-ui/react";
import {
  FiHeart,
  FiShare2,
  FiDownload,
  FiMoreVertical,
  FiFlag,
  FiBookmark,
  FiExternalLink,
  FiCopy,
  FiEye,
  FiCalendar,  
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import Link from "next/link";
import { VideoPlayerType, VideoPreview } from "@/types/video";
//import { NativeVideoPlayer } from "./NativeVideoPlayer";
import VideoPlayerContainerSkeleton from "./VideoPlayerContainerSkeleton";
import IframeVideoPlayer from "../VideoList/IframeVideoPlayer";
import { formatDuration, formatUploadDate, formatViews, getVideoId } from "@/lib/utils/utils";

interface VideoPlayerContainerProps {
  video: VideoPreview;
  playerType: VideoPlayerType;
  showInfo?: boolean;
  showRelatedVideos?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  onLike?: (videoId: string | undefined, isLiked: boolean) => void;
  onShare?: (video: VideoPreview) => void;
  onSubscribe?: (authorId: string, isSubscribed: boolean) => void;
  onReport?: (videoId: string | undefined, reason: string) => string;
  onDownload?: (video: VideoPreview) => void;
  isLiked?: boolean;
  isSubscribed?: boolean;
  isBookmarked?: boolean;
  loading?: boolean;
  className?: string;
}

export const VideoPlayerContainer: React.FC<VideoPlayerContainerProps> = ({
  video,
  playerType = "iframe",
  showInfo = true,
  muted = false,
  onLike,
  onShare,
  onSubscribe,
  onReport,
  onDownload,
  isLiked = false,
  isSubscribed = false,
  isBookmarked = false,
  loading = false,
  className,
}) => {
  const [liked, setLiked] = useState(isLiked || false);
  const [subscribed, setSubscribed] = useState(isSubscribed || false);
  const [bookmarked, setBookmarked] = useState(isBookmarked || false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const mutedTextColor = useColorModeValue("gray.500", "gray.400");

  const { snippet, id, contentDetails } = video || {};

  const videoId = getVideoId(id);

  const handleLike = useCallback(() => {
    const newLikedState = !liked;
    setLiked(newLikedState);
    onLike?.(videoId, newLikedState);

    toast({
      title: newLikedState
        ? "Added to liked videos"
        : "Removed from liked videos",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }, [liked, onLike, toast, videoId]);

  const handleSubscribe = useCallback(() => {
    const newSubscribedState = !subscribed;
    setSubscribed(newSubscribedState);
    onSubscribe?.(snippet.channelId, newSubscribedState);

    toast({
      title: newSubscribedState
        ? `Subscribed to ${snippet.channelTitle}`
        : `Unsubscribed from ${snippet.channelTitle}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }, [subscribed, onSubscribe, snippet.channelId, snippet.channelTitle, toast]);

  const handleShare = useCallback(
    async (method?: "native" | "copy" | "social") => {
      const shareData = {
        title: snippet.title,
        text: snippet.description,
        url: window.location.href,
      };

      if (method === "native" && navigator.share) {
        try {
          await navigator.share(shareData);
          toast({
            title: "Shared successfully",
            status: "success",
            duration: 2000,
          });
        } catch (error) {
          // User cancelled the share
          console.log("error", error)
        }
      } else if (method === "copy") {
        try {
          await navigator.clipboard.writeText(window.location.href);
          toast({
            title: "Link copied to clipboard",
            status: "success",
            duration: 2000,
          });
        } catch (error) {
          console.log("error", error)
          toast({
            title: "Failed to copy link",
            status: "error",
            duration: 2000,
          });
        }
      } else {
        onShare?.(video);
      }
    },
    [onShare, toast, video, snippet.title, snippet.description]
  );

  const handleBookmark = useCallback(() => {
    const newBookmarkedState = !bookmarked;
    setBookmarked(newBookmarkedState);

    toast({
      title: newBookmarkedState
        ? "Added to bookmarks"
        : "Removed from bookmarks",
      status: "success",
      duration: 2000,
    });
  }, [bookmarked, toast]);

  const handleReport = useCallback(
    (reason: string) => {
      const report = onReport?.(getVideoId(id), reason);
      if (report) {
        toast({
          title: report,
        });
      }
    },
    [onReport, toast, id]
  );

  if (loading) {
    return <VideoPlayerContainerSkeleton />;
  }

  return (
    <Box
      className={className}
      maxW="6xl"
      mx="auto"
      bg={bgColor}
      borderRadius="lg"
      overflow="hidden"
      shadow="lg"
      border="1px"
      borderColor={borderColor}
    >
      <VStack spacing="0" align="stretch">
        <Box position="relative">
          {playerType === "iframe" ? (
            <IframeVideoPlayer
              muted={muted}
              src={`https://www.youtube.com/watch?v=${video?.id}`}
              title={video?.snippet?.title}
              controls={true}
              allowFullscreen={true}
              onLoad={() => {}}
              onError={() => {}}
              placeholder={video?.snippet?.thumbnails?.high?.url}
              width="100%"
              height="100%"
              autoplay={true}
              boxProps={{
                width: "100%",
                height: "100%",
              }}
            />
          ) : // <NativeVideoPlayer
          //   video={video}
          //   autoplay={autoPlay}
          //   controls={true}
          // />
          null}
        </Box>
        {showInfo && (
          <VStack p={{ base: 4, md: 6 }} spacing="4" align="stretch">
            <Flex direction={{ base: "column", md: "row" }} gap="4">
              <VStack flex="1" spacing="3" align="stretch">
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="bold"
                  lineHeight="1.3"
                >
                  {snippet.title}
                </Text>
                <HStack
                  spacing="4"
                  color={mutedTextColor}
                  fontSize="sm"
                  flexWrap="wrap"
                >
                  <HStack spacing="1">
                    <FiEye />
                    <Text>{formatViews(video?.statistics?.viewCount || 0)}</Text>
                  </HStack>
                  <Text>.</Text>
                  <HStack spacing="1">
                    <FiCalendar />
                    <Text>{formatUploadDate(video?.snippet?.publishedAt)}</Text>
                  </HStack>
                  <Text>.</Text>
                  <Text>{contentDetails?.hasOwnProperty('duration') && formatDuration(contentDetails?.duration || '')}</Text>
                  {/* TODO: Add video category */}
                </HStack>
              </VStack>
              <VStack spacing="2" flexShrink={0}>
                <HStack spacing="2">
                  <Button
                    leftIcon={<FiHeart />}
                    colorScheme={liked ? "red" : "gray"}
                    variant={liked ? "solid" : "outline"}
                    size="sm"
                    onClick={handleLike}                    
                  >
                    {liked ? "Liked" : "Like"}
                  </Button>
                  <Menu>
                    <MenuButton
                      as={Button}
                      leftIcon={<FiShare2 />}
                      variant="outline"
                      size="sm"
                    >
                      Share
                    </MenuButton>
                    <MenuList>
                      {typeof navigator.share === 'function' && (
                        <MenuItem
                          icon={<FiExternalLink />}
                          onClick={() => handleShare("native")}
                        >
                          Share via...
                        </MenuItem>
                      )}
                      <MenuItem
                        icon={<FiCopy />}
                        onClick={() => handleShare("copy")}
                      >
                        Copy link
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem onClick={() => handleShare("social")}>
                        More options
                      </MenuItem>
                    </MenuList>
                  </Menu>
                  <IconButton
                    aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
                    icon={<FiBookmark />}
                    variant={bookmarked ? "solid" : "outline"}
                    colorScheme={bookmarked ? "blue" : "gray"}
                    size="sm"
                    onClick={handleBookmark}
                  />
                  {onDownload && (
                    <IconButton
                      aria-label="Download video"
                      icon={<FiDownload />}
                      variant="outline"
                      size="sm"
                      onClick={() => onDownload(video)}
                    />
                  )}
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="More options"
                      icon={<FiMoreVertical />}
                      variant="ghost"
                      size="sm"
                    />
                    <MenuList>
                      <MenuItem
                        icon={<FiFlag />}
                        onClick={() => handleReport("inappropriate")}
                      >
                        Report video
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
              </VStack>
            </Flex>

            <Divider />

            <VStack justify="space-between" align="flex-start">
              <HStack spacing="3" flex="1">
                <Link href={`/channel/${video.snippet?.channelId}`} passHref>
                  <ChakraLink>
                    <Avatar
                      size="md"
                      // name={video.author.name}
                      // src={video.author.avatar}
                    />
                  </ChakraLink>
                </Link>
                <VStack spacing="0" align="start" flex="1" minW="0">
                  <HStack spacing="2">
                    <Link href={`/channel/${video.snippet?.channelId}`} passHref>
                      <ChakraLink
                        fontWeight="semibold"
                        _hover={{ textDecoration: "underline" }}
                      >
                        {/* {video.author.name} */}
                      </ChakraLink>
                    </Link>
                    {/* {video.author.verified && (
                      <Badge colorScheme="blue" size="sm">
                        Verified
                      </Badge>
                    )} */}
                    {/* <Text fontSize="sm" color={mutedTextColor}>
                      {video.author.subscribers} subscribers
                    </Text>

                    {video.author.description && (
                      <Text fontSize="sm" color={textColor} noOfLines={1}>
                        {video.author.description}
                      </Text>
                    )} */}
                  </HStack>
                </VStack>
                <Button
                  backgroundColor={subscribed ? "gray" : "#F4A644"}
                  variant={subscribed ? "outline" : "solid"}
                  size="sm"
                  onClick={handleSubscribe}
                  minW="100px"
                >
                  {subscribed ? "Subscribed" : "Subscribe"}
                </Button>
              </HStack>

              {video.snippet?.description && (
                <Box>
                  <Collapse
                    in={showFullDescription}
                    startingHeight={60}
                    endingHeight="auto"
                  >
                    <Text
                      fontSize="sm"
                      color={textColor}
                      lineHeight="1.6"
                      whiteSpace="pre-wrap"
                    >
                      {video.snippet?.description}
                    </Text>
                  </Collapse>

                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={
                      showFullDescription ? <FiChevronUp /> : <FiChevronDown />
                    }
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    mt="2"
                  >
                    {showFullDescription ? "Show less" : "Show more"}
                  </Button>
                </Box>
              )}

              {video.snippet?.tags && video.snippet?.tags.length > 0 && (
                <HStack spacing="2" flexWrap="wrap">
                  {video.snippet?.tags.slice(0, 5).map((tag) => (
                    <Badge
                      key={tag}
                      variant="subtle"
                      colorScheme="gray"
                      fontSize="xs"
                      cursor="pointer"
                      _hover={{ bg: "gray.200" }}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </HStack>
              )}
            </VStack>
          </VStack>
        )}
      </VStack>
    </Box>
  );
};
