"use client";

import {
  Box,
  Flex,
  HStack,
  Icon,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CirclePlay } from "lucide-react";
import { FiLinkedin, FiGithub, FiMail } from "react-icons/fi";

export const Footer = () => {
  return (
    <Box
      as="footer"
      mt="16"
      bg="#1A1A1A"
      color="whiteAlpha.900"
    >
      <Box
        maxW="100%"
        px={{ base: "6", md: "12", lg: "16" }}
        py={{ base: "8", md: "12" }}
      >
        <Flex
          direction={{ base: "column", lg: "row" }}
          justify="space-between"
          align={{ base: "center", lg: "flex-start" }}
          gap={{ base: "8", lg: "0" }}
        >
          {/* Brand */}
          <VStack
            align={{ base: "center", lg: "flex-start" }}
            spacing="3"
            maxW="320px"
          >
            <HStack spacing="3">
              <Icon as={CirclePlay} boxSize={10} color="#F4A644" />
              <Text fontWeight="bold" fontSize="2xl" letterSpacing="tight">
                MaMeyTube
              </Text>
            </HStack>
            <Text fontSize="sm" color="whiteAlpha.600" lineHeight="1.6">
              A YouTube-like video platform built with Next.js, React, and
              TypeScript — showcasing modern full-stack development practices.
            </Text>
          </VStack>

          {/* About */}
          <VStack
            align={{ base: "center", lg: "flex-start" }}
            spacing="3"
          >
            <Text
              fontSize="xs"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="widest"
              color="whiteAlpha.500"
            >
              Developer
            </Text>
            <Text fontSize="md" fontWeight="semibold">
              Carlos Rodriguez
            </Text>
            <Text fontSize="sm" color="whiteAlpha.600">
              Senior Full-Stack Developer
            </Text>
            <Text fontSize="xs" color="whiteAlpha.500">
              React &middot; Next.js &middot; TypeScript &middot; Node.js
            </Text>
          </VStack>

          {/* Connect */}
          <VStack
            align={{ base: "center", lg: "flex-start" }}
            spacing="4"
          >
            <Text
              fontSize="xs"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="widest"
              color="whiteAlpha.500"
            >
              Connect
            </Text>
            <HStack spacing="5">
              <Link
                href="https://www.linkedin.com/in/carlosdumar/"
                isExternal
                aria-label="LinkedIn"
                color="whiteAlpha.700"
                _hover={{ color: "#0A66C2", transform: "translateY(-2px)" }}
                transition="all 0.2s"
              >
                <Icon as={FiLinkedin} boxSize={6} />
              </Link>
              <Link
                href="https://github.com/carlosdumar"
                isExternal
                aria-label="GitHub"
                color="whiteAlpha.700"
                _hover={{ color: "white", transform: "translateY(-2px)" }}
                transition="all 0.2s"
              >
                <Icon as={FiGithub} boxSize={6} />
              </Link>
              <Link
                href="mailto:carlosdumar@gmail.com"
                aria-label="Email"
                color="whiteAlpha.700"
                _hover={{ color: "#F4A644", transform: "translateY(-2px)" }}
                transition="all 0.2s"
              >
                <Icon as={FiMail} boxSize={6} />
              </Link>
            </HStack>
            <Link
              href="https://www.linkedin.com/in/carlosdumar/"
              isExternal
              fontSize="sm"
              color="#F4A644"
              fontWeight="medium"
              _hover={{ textDecoration: "underline" }}
            >
              Open to opportunities &rarr;
            </Link>
          </VStack>
        </Flex>
      </Box>

      {/* Bottom bar */}
      <Box borderTop="1px solid" borderColor="whiteAlpha.100">
        <Flex
          maxW="100%"
          px={{ base: "6", md: "12", lg: "16" }}
          py="4"
          justify="space-between"
          align="center"
          direction={{ base: "column", sm: "row" }}
          gap="2"
        >
          <Text fontSize="xs" color="whiteAlpha.400">
            &copy; {new Date().getFullYear()} Carlos Rodriguez. All rights
            reserved.
          </Text>
          <Text fontSize="xs" color="whiteAlpha.400">
            Built with Next.js, React &amp; Chakra UI
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};
