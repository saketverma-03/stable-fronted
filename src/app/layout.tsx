import { TopBar } from "@/components";
import { NavBar } from "@/components/Nabbar";
import ReactQueryWrapper from "@/components/wrapper/react-query";
import { ThemeProvider } from "@/components/wrapper/theme-provider";
import { Web3Modal } from "@/components/wrapper/web3-modal";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stable Task",
  description: "A simple Side Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-full w-full`}>
        <Web3Modal>
          <ThemeProvider attribute="class">
            <ReactQueryWrapper>
              <TopBar />
              <NavBar />
              {children}
            </ReactQueryWrapper>
          </ThemeProvider>
        </Web3Modal>
      </body>
    </html>
  );
}
