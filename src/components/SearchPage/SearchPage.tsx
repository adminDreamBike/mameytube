"use client";

import VideoGrid from "@components/VideoList/VideoGrid";
import ErrorDisplay from "@components/ErrorDisplay";
import { useSearchVideos } from "@lib/queries/video";
import { Flex } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const q_param = searchParams.get("q") || "";
  const { videos, isLoading, isError, error } = useSearchVideos({ q: q_param });

  if (isError) {
    return (
      <Flex flexDirection="column" gap="20px" marginTop="20px">
        <ErrorDisplay error={error} title={`Search Error for "${q_param}"`} />
      </Flex>
    );
  }

  return (
    <Flex flexDirection="column" gap="20px" marginTop="20px">
      <VideoGrid videos={videos?.data} isLoading={isLoading} />
    </Flex>
  );
}

export default SearchPageContent;
