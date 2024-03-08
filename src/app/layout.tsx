import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import strings from "@/values/strings";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: strings.app_name,
  description: strings.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={strings.lang}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
