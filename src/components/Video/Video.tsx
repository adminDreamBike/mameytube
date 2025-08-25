/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Flex,
  Link,
  Text,
  Image,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Item } from "@/lib/types";
import { Suspense } from "react";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";

export const Video = ({
  video,
  isLoading,
  isSuggested = false,
  channels,
}: {
  video: Item;
  isLoading?: boolean;
  isSuggested?: boolean;
  channels: any;
}) => {
  const { id, snippet, statistics } = video || {};

  return (
    <Flex
      flexDirection={{ base: "column", lg: isSuggested ? "row" : "column" }}
      gap="12px"
    >
      <Suspense fallback={<Skeleton isLoaded={!isLoading} />}>
        <VideoPlayer
          videoId={typeof id === "string" ? id : id?.videoId}
          title={snippet?.title}
          width={isSuggested ? "100%" : "-webkit-fill-available"}
        />
      </Suspense>

      <Flex flexDirection="row" gap="12px" marginTop="12px">
        {!isSuggested && (
          <SkeletonCircle size="10" isLoaded={!isLoading}>
            <Link as={NextLink} href="https://www.youtube.com/@cbssportsgolazo">
              {channels && (
                <Image
                  src={channels?.snippet?.thumbnails?.default?.url}
                  alt="image channel"
                  borderRadius="full"
                  boxSize="45px"
                />
              )}
            </Link>
          </SkeletonCircle>
        )}

        <Flex flexDirection="column">
          <Link as={NextLink} href={`/video/${id}`}>
            <Text fontWeight="bold">{snippet?.title}</Text>
          </Link>
          <Text color="#aaaaaa">{snippet?.channelTitle}</Text>
          <Flex flexDirection="row" color="#aaaaaa">
            {statistics && (
              <Text marginRight="5px">{statistics?.viewCount} Views </Text>
            )}
            <Text marginLeft="5px">{snippet?.publishedAt.toString()}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
