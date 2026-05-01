import { Box, Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react"

const VideoCardSkeleton = () => {
    return (
        <Box
            borderRadius="xl"
            overflow="hidden"
            border="1px solid"
            borderColor="gray.100"
            _dark={{ borderColor: "gray.700" }}
        >
            {/* Thumbnail */}
            <Skeleton aspectRatio={16 / 9} w="100%" />

            <Flex p={3} gap={3}>
                <SkeletonCircle size="9" flexShrink={0} />
                <Flex direction="column" gap={2} flex={1}>
                    <Skeleton h="11px" w="90%" borderRadius="md" />
                    <Skeleton h="11px" w="65%" borderRadius="md" />
                    <Skeleton h="11px" w="45%" borderRadius="md" />
                </Flex>
            </Flex>
        </Box>
    )
}

export default VideoCardSkeleton