"use client";

import "./globals.css";
import { fonts } from "./fonts";
import { ChakraUIProvider } from "../providers/ChakraUIProvider";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import { HydrationBoundary } from "@tanstack/react-query";
import { ThemeSwitcher } from "@/components/ThemeSwitcher/ThemeSwitcher";
import { SideBar } from "@/components/SideBar/SideBar";
import { Header } from "@/components/Header/Header";
import { useDisclosure } from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://vjs.zencdn.net/7.11.4/video-js.css"
        />
      </head>
      <body className={`${fonts.rubik.variable} pb-20 antialiased`}>
        <ReactQueryProvider>
          <HydrationBoundary state={null}>
            <Header onOpen={onOpen} />
            <SideBar isOpen={isOpen} onClose={onClose} />
            <ChakraUIProvider>
              <div
                style={{
                  marginLeft: isOpen ? "30vh" : "0",
                  transition: "margin-left 0.3s ease-in-out",
                  paddingLeft: "2.5rem",
                  paddingRight: "2.5rem",
                }}
              >
                {children}
              </div>
            </ChakraUIProvider>
            <ThemeSwitcher />
          </HydrationBoundary>
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
