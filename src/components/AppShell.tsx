"use client";

import dynamic from "next/dynamic";
import { ChakraUIProvider } from "@/providers/ChakraUIProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { useDisclosure } from "@chakra-ui/react";

const SideBar = dynamic(
  () => import("@/components/SideBar/SideBar").then((m) => m.SideBar),
  { ssr: false }
);

const ReactQueryDevtools = dynamic(
  () =>
    import("@tanstack/react-query-devtools").then((m) => m.ReactQueryDevtools),
  { ssr: false }
);

export function AppShell({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ReactQueryProvider>
      <ChakraUIProvider>
        <Header onOpen={onOpen} />
        <SideBar isOpen={isOpen} onClose={onClose} />
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
        <Footer />
      </ChakraUIProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryProvider>
  );
}
