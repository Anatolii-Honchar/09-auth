import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api/serverApi";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

interface NoteProps {
  params: { id: string }; // ✅ FIX
}

export async function generateMetadata({
  params,
}: NoteProps): Promise<Metadata> {
  const { id } = params; // ✅ без await

  const note = await fetchNoteById(id);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: note.title,
    description: note.content?.slice(0, 120) || "Note details",
    openGraph: {
      title: note.title,
      description: note.content,
      url: `${baseUrl}/notes/${id}`,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  };
}

async function NoteDetailsPage({ params }: NoteProps) {
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}

export default NoteDetailsPage;
