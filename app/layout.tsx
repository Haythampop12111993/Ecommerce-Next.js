"use client";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./_components/_sharedComponents/Header";
import Footer from "./_components/_sharedComponents/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { cartContext } from "./_context/CartContext";
import { useState } from "react";

const inter = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cart, setCart] = useState([]);
  return (
    <ClerkProvider>
      <cartContext.Provider
        value={{
          cart,
          setCart,
        }}
      >
        <html lang="en">
          <body className={inter.className}>
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </cartContext.Provider>
    </ClerkProvider>
  );
}
