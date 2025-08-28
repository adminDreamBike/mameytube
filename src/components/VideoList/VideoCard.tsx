import React, { useRef, FC } from "react";
import {
  Box,
  VStack,
  Text,
  Image,
  HStack,
  IconButton,
  Avatar,
  AspectRatio,
  Badge,
  useColorModeValue,
  Skeleton,
  useBoolean,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiPlay, FiEye, FiMoreVertical } from "react-icons/fi";
import { VideoPreview } from "@/types/video";
import Link from "next/link";
import { formatViews, getVideoId, YTDurationToSeconds } from "@/lib/utils/utils";

interface VideoCardProps {
  video: VideoPreview;
  showPreview?: boolean;
  onHover?: (videoId: string | undefined) => void;
  onLeave?: () => void;
  isRelated?: boolean;
}

const VideoCard: FC<VideoCardProps> = ({
  video,
  showPreview = true,
  onHover,
  onLeave,
  isRelated = false,
}) => {
  const [isHovered, setIsHovered] = useBoolean(false);
  const [imageLoaded, setImageLoaded] = useBoolean(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");

  const width = useBreakpointValue({
    base: "100%",
    md: "400px",
  });

  const { snippet, id, statistics, contentDetails } = video;

  const { title, publishedAt, thumbnails, channelTitle } = snippet;
  const { duration } = contentDetails || {};
  const { viewCount } = statistics || {};

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const uploadDate = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - uploadDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const handleMouseEnter = () => {
    if (showPreview) {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovered.on();
        onHover?.(getVideoId(id));
      }, 500);
    }
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsHovered.off();
    onLeave?.();
  };

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      overflow="hidden"
      transition="all 0.2s ease"
      _hover={{
        transform: "translateY(-2px)",
        shadow: "lg",
      }}
      cursor="pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      border="1px"
      borderColor={borderColor}
      maxW={isRelated ? width : "100%"}
    >
      <Link href={`/video/${getVideoId(id)}`}>
        <VStack spacing="0" align="stretch">
          <Box position="relative">
            <AspectRatio ratio={16 / 9}>
              <Box>
                {!imageLoaded && <Skeleton width="100%" height="100%" />}
                {isHovered && showPreview && id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${getVideoId(id)}`}
                    title={title}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Image
                    src={thumbnails?.high?.url}
                    alt={title}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    onLoad={() => setImageLoaded.on()}
                    fallback={<Skeleton width="100%" height="100%" />}
                  />
                )}
                {duration && (
                <Badge
                  position="absolute"
                  bottom="2"
                  right="2"
                  bg="blackAlpha.800"
                  color="white"
                  fontSize="xs"
                  px="2"
                  py="1"
                  borderRadius="md"
                  fontFamily="mono"
                >
                    {YTDurationToSeconds(duration)} ddd
                  </Badge>
                )}
                {/* Play Icon Overlay */}
                {!isHovered && (
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    opacity="0"
                    transition="opacity 0.2s"
                    _groupHover={{ opacity: 0.9 }}
                  >
                    <IconButton
                      aria-label="Play video"
                      icon={<FiPlay />}
                      size="lg"
                      colorScheme="whiteAlpha"
                      variant="solid"
                      borderRadius="full"
                      fontSize="xl"
                      pointerEvents="none"
                    />
                  </Box>
                )}
              </Box>
            </AspectRatio>
          </Box>
          {/* Video Info */}
          <VStack p="4" spacing="3" align="stretch">
            <HStack position="relative" justifyContent='space-between' gap='2'>
              <Text
                fontSize="md"
                fontWeight="semibold"
                lineHeight="1.3"
                noOfLines={2}
                minH="2.6em" // Ensures consistent height
              >
                {title}
              </Text>
              {/* More Options */}
              <IconButton
                aria-label="More options"                
                variant="ghost"
                colorScheme="whiteAlpha"
                _groupHover={{ opacity: 1 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Handle more options
                }}
              >
                <FiMoreVertical color="#606060" />
              </IconButton>
            </HStack>

            {/* Author and Metadata */}
            <HStack justify="space-between" align="center">
              <HStack spacing="3" flex="1" minW="0">
                <Avatar
                  size="sm"
                  //   name={video.author.name}
                  //   src={video.author.avatar}}
                />
                <VStack spacing="0" align="start" flex="1" minW="0">
                  <Text fontSize="sm" fontWeight="medium" noOfLines={1}>
                    {channelTitle}
                  </Text>
                  <HStack spacing="1" fontSize="xs" color={textColor}>
                    <HStack spacing="1">
                      <FiEye />
                      <Text>{formatViews(viewCount || 0)}</Text>
                    </HStack>
                    <Text>•</Text>
                    <Text>{formatTimeAgo(publishedAt)}</Text>
                  </HStack>
                </VStack>
              </HStack>
            </HStack>
          </VStack>
        </VStack>
      </Link>
    </Box>
  );
};

export default VideoCard;
