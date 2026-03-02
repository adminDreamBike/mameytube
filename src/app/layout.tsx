import "./globals.css";
import { fonts } from "./fonts";
import { AppShell } from "@/components/AppShell";

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
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
