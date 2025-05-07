import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import WagmiConfig from "./WagmiConfig";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-primary",
});
const inter = Inter({
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
      <body className={`${poppins.variable} ${inter.variable}`}>
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
