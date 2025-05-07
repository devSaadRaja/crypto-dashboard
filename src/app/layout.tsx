import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import WagmiConfig from "./WagmiConfig";
import { Toaster } from "react-hot-toast";

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

            <div>{children}</div>
          </ThemeProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
