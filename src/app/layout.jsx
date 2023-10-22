import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Suspense } from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Loading from "./loading";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pixel Pulse",
  description:
    "Gaming store with keys for every game new and old for any platform from pc to playstation or xbox and even nintendo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <Navbar />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
}
