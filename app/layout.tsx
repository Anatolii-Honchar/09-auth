import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Footer from "@/components/Footer/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: "NoteHub",
  description: "Convenient notes by category",

  openGraph: {
    title: "NoteHub",
    description: "Convenient notes by category",
    url: baseUrl,
    siteName: "NoteHub",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "NoteHub",
    description: "Convenient notes by category",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
