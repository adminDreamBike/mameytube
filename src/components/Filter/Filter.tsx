/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getCategories } from "@lib/utils/utils";
import { useVideoActions } from "@stores/videos";
import { Button, ButtonGroup, HStack, IconButton } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

export const Filter = () => {
  const { setVideosByCategory } = useVideoActions();
  const buttonRef = useRef<HTMLDivElement>(null);

  const [category] = useState<Array<any>>(getCategories());
  const [activeButton] = useState<string>("0");

  const handleNav = (direction: string) => {
    if (direction === "prev" && buttonRef.current) {
      buttonRef.current.scrollLeft -= 100;
    } else if (direction === "next" && buttonRef.current) {
      buttonRef.current.scrollLeft += 100;
    }
  };
  return (
    <HStack gap='0' justifyContent='center'>
      <IconButton
        onClick={() => handleNav("prev")}
        aria-label="prev"
        size="md"
        variant="ghost"
        rounded="full"
      >
        <MdArrowBackIosNew />
      </IconButton>
      <ButtonGroup
        spacing="4"
        display="flex"
        flexWrap="nowrap"
        justifyContent="center"        
        ref={buttonRef}
        width={{ base: "320px", md: "670px", lg: "1280px" }}
        overflowX="hidden"
        flexGrow={2}
      >
        <Button
          className={activeButton === "0" ? "bg-black text-white" : ""}
          onClick={() => setVideosByCategory("all")}
          height="30px"
        >
          All
        </Button>
        {category?.map((item) => {
          const keyItem = Object.keys(item).toString();
          return (
            <Button
              value={Object.keys(item)}
              key={keyItem}
              onClick={(event) =>
                setVideosByCategory(event.currentTarget.value)
              }
              height="30px"
              className={activeButton === keyItem ? "bg-black text-white" : ""}
              minWidth={"fit-content"}
            >
              {Object.values(item)}
            </Button>
          );
        })}
      </ButtonGroup>
      <IconButton
        onClick={() => handleNav("next")}
        aria-label="next"
        size="md"
        variant="ghost"
        rounded="full"
      >
        <MdArrowForwardIos />
      </IconButton>
    </HStack>
  );
};
