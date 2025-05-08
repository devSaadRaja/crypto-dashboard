import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import WagmiConfig from "./WagmiConfig";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-primary",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-secondary",
});

export const metadata: Metadata = {
  title: "Crypto",
  description: "Crypto Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable}`}>
        <WagmiConfig>
          <ThemeProvider attribute="class">
            <Toaster
              position="top-right"
              // reverseOrder={false}
              // containerClassName="mt-16 flex ml-[30px]"
              // containerStyle={{}}
              // toastOptions={{
              //   className: "",
              //   duration: 5000,
              //   style: {
              //     background: "#363636",
              //     color: "#fff",
              //   },
              //   success: {
              //     duration: 3000,
              //   },
              //   loading: {
              //     duration: 300000,
              //   },
              // }}
            />

            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#2C3E50]/50 to-transparent pointer-events-none" />
            <Header />

            <div>{children}</div>
          </ThemeProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
