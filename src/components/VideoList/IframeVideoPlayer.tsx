import React, { useState } from "react";
import {
  Box,
  AspectRatio,
  Text,
  VStack,
  HStack,
  Button,
  Flex,
  IconButton,
  useColorModeValue,
  Spinner,
  Fade,
  ScaleFade,
  BoxProps,
} from "@chakra-ui/react";
import { Play, Maximize2, Volume2, VolumeX } from "lucide-react";

interface IframeVideoPlayerProps {
  src: string;
  title: string;
  width: string;
  height: string;
  autoplay: boolean;
  muted: boolean;
  controls: boolean;
  allowFullscreen: boolean;
  onLoad: () => void;
  onError: () => void;
  placeholder: string;
  boxProps: BoxProps;
}
const IframeVideoPlayer: React.FC<IframeVideoPlayerProps> = ({
  src = "",
  title = "Video Player",
  width = "100%",
  height = "100%",
  autoplay = false,
  muted = false,
  controls = true,
  allowFullscreen = true,
  onLoad,
  onError,
  placeholder,
  ...boxProps
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(!autoplay);

  const bgColor = useColorModeValue("gray.900", "gray.800");
  const overlayBg = useColorModeValue("blackAlpha.400", "blackAlpha.600");
  const overlayHoverBg = useColorModeValue("blackAlpha.600", "blackAlpha.700");
  const errorBg = useColorModeValue("gray.800", "gray.700");

  const formatVideoUrl = (url: string) => {
    if (!url) return "";

    if (url.includes("youtube.com/watch?v=")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      const params = new URLSearchParams();
      if (autoplay) params.append("autoplay", "1");
      if (muted) params.append("mute", "1");
      if (!controls) params.append("controls", "0");
      const paramString = params.toString() ? `?${params.toString()}` : "";

      return `https://www.youtube.com/embed/${videoId}${paramString}`;
    }
    return url;
  };

  const handleIframeLoad = () => {
    setIsLoaded(true);
    setShowPlayButton(false);
    /* eslint-disable-next-line */
    onLoad && onLoad();
  };

  const handleIframeError = () => {
    setHasError(true);
    /* eslint-disable-next-line */
    onError && onError();
  };

  const handlePlayClick = () => {
    setShowPlayButton(false);
  };

  const embedUrl = formatVideoUrl(src);

  const iframeProps = {
    src: embedUrl,
    title: title,
    width: "100%",
    height: "100%",
    allowFullscreen: allowFullscreen,
    onLoad: handleIframeLoad,
    onError: handleIframeError,
    ...(allowFullscreen && {
      allow:
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowFullscreen: true,
    }),
  };

  return (
    <Box
      position="relative"
      bg={bgColor}
      borderRadius="lg"
      overflow="hidden"
      shadow="lg"
      {...boxProps}
    >
      <AspectRatio
        ratio={16 / 9}
        w={width === "100%" ? "full" : width}
        h={height === "100%" ? "auto" : height}
      >
        <Box position="relative" w="full" h="full">
          {hasError && (
            <Flex
              position="absolute"
              inset={0}
              align="center"
              justify="center"
              bg={errorBg}
            >
              <VStack spacing={3}>
                <Text fontSize="4xl" color="red.400">
                  ⚠️
                </Text>
                <VStack spacing={1}>
                  <Text fontSize="lg" fontWeight="medium" color="white">
                    Video unavailable
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    Please check the video URL
                  </Text>
                </VStack>
              </VStack>
            </Flex>
          )}
          {!isLoaded && !hasError && (
            <Flex
              position="absolute"
              inset={0}
              align="center"
              justify="center"
              bg={errorBg}
            >
              {placeholder ? (
                <Box
                  as="img"
                  src={placeholder}
                  alt={title}
                  w="full"
                  h="full"
                  objectFit="cover"
                />
              ) : (
                <VStack spacing={4}>
                  <Box
                    bg="gray.600"
                    borderRadius="full"
                    w={16}
                    h={16}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Spinner size="lg" color="white" />
                  </Box>
                  <Text color="white" fontSize="lg" fontWeight="medium">
                    {title}
                  </Text>
                </VStack>
              )}
              <ScaleFade in={showPlayButton}>
                <Button
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  onClick={handlePlayClick}
                  bg={overlayBg}
                  _hover={{
                    bg: overlayHoverBg,
                    transform: "translate(-50%, -50%) scale(1.1)",
                  }}
                  borderRadius="full"
                  p={6}
                  size="lg"
                  transition="all 0.2s"
                  w="auto"
                  h="auto"
                  minW="auto"
                >
                  <IconButton
                    aria-label="Play video"
                    icon={<Play size={48} />}
                    bg="red.600"
                    color="white"
                    borderRadius="full"
                    size="lg"
                    _hover={{ bg: "red.700" }}
                    p={4}
                  />
                </Button>
              </ScaleFade>
            </Flex>
          )}
          {embedUrl && !hasError && (
            <Fade in={isLoaded}>
              <Box
                as="iframe"
                {...iframeProps}
                borderRadius="lg"
                opacity={isLoaded ? 1 : 0}
                transition="opacity 0.3s"
                style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}                
                
                
              />
            </Fade>
          )}
        </Box>
      </AspectRatio>
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        bgGradient="linear(to-t, blackAlpha.800, transparent)"
        p={4}
        opacity={0}
        _hover={{ opacity: 1 }}
        transition="opacity 0.2s"
      >
        <HStack justify="space-between" color="white">
          <Text fontSize="sm" fontWeight="medium" noOfLines={1} flex={1}>
            {title}
          </Text>
          <HStack spacing={2}>
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            {allowFullscreen && <Maximize2 size={16} />}
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default IframeVideoPlayer;
