import { Box, Skeleton, VStack, HStack } from "@chakra-ui/react";

const VideoPlayerContainerSkeleton = () => {
  return (
    <Box
      maxW="6xl"
      mx="auto"
      bg="white"
      borderRadius="lg"
      overflow="hidden"
      shadow="lg"
    >
        <VStack spacing='0' align='stretch'>
            <Skeleton aspectRatio={16/9} />

            <VStack p='6' spacing='4' align='stretch'>
                <Skeleton height='24px' />
                <Skeleton height='16px' width='60%' />

                <HStack justify='space-between'>
                    <HStack spacing='3'>
                        <Skeleton borderRadius='full' boxSize='48px' />
                        <VStack spacing='2' align='start'>
                            <Skeleton height='16px' width='120px' />
                            <Skeleton height='12px' width='80px' />
                        </VStack>
                    </HStack>
                    <Skeleton height='32px' width='100px' />
                </HStack>
                <Skeleton height='60px' />
            </VStack>
        </VStack>
    </Box>
  );
};

export default VideoPlayerContainerSkeleton;