import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallpapers",
  description:
    "Discover exquisite wallpapers for both desktop and mobile at WallMuse. Elevate your screens with stunning visuals. Your digital canvas awaits!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
