import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/header"; 
import Footer from "./components/Footer"; 
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DE LA ROPA",
  description: "Official Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        
        <Header />
        
        <div className="announcement-bar">
          <p>Free Shipping to Indonesia + Singapore!</p>
        </div>
        
        <main style={{ minHeight: "80vh" }}>
          {children}
        </main>

        <Footer />
        
      </body>
    </html>
  );
}