import "./globals.css";
import { fonts } from "./fonts";
import { AppShell } from "@components/AppShell";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://youtube-homepage-chi.vercel.app/"),
  title: {
    default: "MammeyTube",
    template: "%s | MammeyTube"
  },
  description: "Explore and watch videos on MammeyTube",
  openGraph: {
    siteName: "MammeyTube",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mammeytube"
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://vjs.zencdn.net/7.11.4/video-js.css"
        />
      </head>
      <body className={`${fonts.rubik.variable} antialiased`}>
        <AppShell >{children}</AppShell>
      </body>
    </html>
  );
}
