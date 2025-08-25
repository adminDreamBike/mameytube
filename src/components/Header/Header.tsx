import {
  Avatar,
  Flex,
  Icon,
  IconButton,
  Link,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { SearchInput } from "../SearchInput/SearchInput";
import NextLink from "next/link";
import { BsBell } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiOutlinePlus } from "react-icons/hi2";
import { CirclePlay } from "lucide-react";

export const Header = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      padding="0 20px"
      gap="30px"
    >
      <Flex>
        <Wrap alignItems="center">
          <WrapItem alignSelf="center">
            <IconButton
              colorScheme="blue"
              onClick={onOpen}
              aria-label="button open drawer"
              icon={<RxHamburgerMenu />}
              size="lg"
              fontSize="25px"
            />
          </WrapItem>
          <WrapItem>
            <Link href="/" as={NextLink} alignItems="center" display="flex">
              <Icon as={CirclePlay} boxSize={30} color="#F4A644" />
              <Text fontWeight="bold" fontSize="20px">
                MaMeyTube
              </Text>
            </Link>
          </WrapItem>
        </Wrap>
      </Flex>
      <SearchInput />
      <Flex>
        <IconButton
          colorScheme="blue"
          onClick={onOpen}
          aria-label="post new video"
          icon={<HiOutlinePlus />}
          size="lg"
          fontSize="25px"
          margin="20px"
        />
        <IconButton
          colorScheme="blue"
          onClick={onOpen}
          aria-label="open notifications"
          icon={<BsBell />}
          size="lg"
          fontSize="25px"
          margin="20px"
        />
        <Link href="/" as={NextLink} alignItems="center" display="flex">
          <Avatar
            size="2xs"
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
            width="3rem"
            borderRadius="100px"
          />
        </Link>
      </Flex>
    </Flex>
  );
};
