import { Container, Flex, Grid, Skeleton } from "@chakra-ui/react";
import VideoCardSkeleton from "./VideoCardSkeleton";

interface VideoGridSkeletonProps {
  count?: number;
}

const VideoGridSkeleton = ({ count = 6 }: VideoGridSkeletonProps) => {
  return (
    <Container maxW="8xl" py="8">
      <Flex gap={3} mb={7}>
        <Skeleton h="44px" flex={1} borderRadius="lg" />
        <Skeleton h="44px" w="100px" borderRadius="lg" />
      </Flex>

      <Skeleton h="14px" w="160px" borderRadius="md" mb={5} />

      <Grid
        templateColumns={{
          base: "repeat(1, fr)",
          sm: "repeat(2, fr)",
          lg: "repeat(3, fr)",
        }}
        gap={5}
      >
        {Array.from({ length: count }).map((_, i) => (
          <VideoCardSkeleton key={1} />
        ))}
      </Grid>
    </Container>
  );
};

export default VideoGridSkeleton;
