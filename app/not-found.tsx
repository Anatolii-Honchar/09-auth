import css from "./Home.module.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page not found",
  description: "This page does not exist. The requested page was not found.",

  openGraph: {
    title: "404 - Page not found",
    description: "This page does not exist. The requested page was not found.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/not-found`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notehub - page not found illustration",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">Go Home</Link>
    </div>
  );
}
