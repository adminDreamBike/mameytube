/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputRightElement,
  InputGroup,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { BsMic } from "react-icons/bs";
import { StyledInputContainer } from "./SearchInput.styled";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const handleSearchQuery = (event: any) => {

    if (value.length === 0) {
      return;
    }

    if (event?.type === "click" || event?.key === "Enter") {
      router.push(`/results?q=${value}`);
      setValue("");
    }
  };
  return (
    <StyledInputContainer>
      <Flex height="40px" flexGrow="2" alignItems="center">
        <InputGroup size="md" marginRight="12px">
          <Input
            type="text"
            placeholder="Buscar"
            border="1px solid lightgray"
            height="40px"
            onChange={(event) => setValue(event.target.value)}
            value={value}
            onKeyDown={handleSearchQuery}
            width="100%"
            padding="20px"
            rounded={10}
          />
          <InputRightElement
            width="3.5rem"
            rounded={10}
            height="40px"
          >
            <IconButton
              aria-label="Search database"
              icon={<SearchIcon />}
              variant="ghost"
              size="md"
              onClick={handleSearchQuery}
            />
          </InputRightElement>
        </InputGroup>
        <IconButton
          aria-label="Search database"
          icon={<BsMic />}
          color="teal"
          colorScheme="teal"
          fontSize="20px"
          borderRadius="50px"
          backgroundColor="lightblue"
          variant="solid"
          minHeight="40px"
          minWidth="40px"
        />
      </Flex>
    </StyledInputContainer>
  );
};
