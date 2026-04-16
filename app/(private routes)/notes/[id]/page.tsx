import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

interface NoteProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NoteProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const title = note.title;
  const description = note.content?.slice(0, 120) || "Note details";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/notes/${id}`,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

async function NoteDetailsPage({ params }: NoteProps) {
  const { id } = await params;

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
