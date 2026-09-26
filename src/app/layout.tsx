import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { FitLogProvider } from "@/context/FitLogContext";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Your workout library and fitness planner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0d0f12] text-white">
        <FitLogProvider>
          <Navbar />
          {children}
          <Footer />
        </FitLogProvider>
      </body>
    </html>
  );
}