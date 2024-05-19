import type { Metadata } from "next";
import { Inter, Cabin } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Transition from "./components/Transition";

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
          <Transition>{children}</Transition>
        </body>
      </html>
    </ClerkProvider>
  );
}
