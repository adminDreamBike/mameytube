import {
  Avatar,
  Flex,
  Icon,
  IconButton,
  Link,
  Text,
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
      <Flex alignItems="center" gap="2">
        <IconButton
          variant="ghost"
          onClick={onOpen}
          aria-label="button open drawer"
          icon={<RxHamburgerMenu />}
          size="lg"
          fontSize="20px"
          fontWeight={'bold'}
        />
        <Link href="/" as={NextLink} alignItems="center" display="flex">
          <Icon as={CirclePlay} boxSize={30} color="#F4A644" />
          <Text fontWeight="bold" fontSize="20px">
            MaMeyTube
          </Text>
        </Link>
      </Flex>
      <SearchInput />
      <Flex>
        <IconButton
          variant="ghost"
          onClick={onOpen}
          aria-label="post new video"
          icon={<HiOutlinePlus />}
          // size="lg"
          fontSize="25px"
          margin="15px"
        />
        <IconButton
          variant="ghost"
          onClick={onOpen}
          aria-label="open notifications"
          icon={<BsBell />}
          // size="lg"
          fontSize="25px"
          margin="15px"
        />
        <Link href="/" as={NextLink} alignItems="center" display="flex">
          <Avatar
            name="User"
            src="https://www.gravatar.com/avatar/?d=mp&s=200"
            width="3rem"
            borderRadius="100px"
          />
        </Link>
      </Flex>
    </Flex>
  );
};
