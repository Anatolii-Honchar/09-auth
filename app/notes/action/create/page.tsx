import css from "@/components/CreateNote/CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

export const metadata: Metadata = {
  title: "Create note",
  description: "Create a new note in NoteHub",
  openGraph: {
    title: "Create note",
    description: "Create a new note in NoteHub",
    url: `${baseUrl}/notes/action/create`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create note",
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
