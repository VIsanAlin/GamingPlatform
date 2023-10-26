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
      {/*Init. UserProvider for Auth0 */}
      <UserProvider>
        <body className={inter.className}>
          <Navbar />
          {/* Use Suspense for code-splitting and show Loading component while content is loading */}
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
}
