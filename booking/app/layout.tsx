import type { Metadata } from "next";
import { Inter, Cabin } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const cabin = Cabin({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookTrip",
  description: "BookTrip Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cabin.className}>
          {/*<Header />*/}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
