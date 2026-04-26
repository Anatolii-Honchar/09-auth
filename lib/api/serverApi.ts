import { nextServer } from "@/lib/api/api";
import { cookies } from "next/headers";
import type { User } from "@/types/user";
import type { Note } from "@/types/note";
import type { FetchNotesParams, FetchNotesResponse } from "./clientApi";

// 🔹 USER
export const getMe = async (): Promise<User> => {
  const cookieStore = cookies();

  const response = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export const checkServerSession = async (): Promise<User | null> => {
  const cookieStore = cookies();

  const response = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

// 🔹 NOTES
export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const cookieStore = cookies();

  const response = await nextServer.get("/notes", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    params: { page, perPage, search, tag },
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = cookies();

  const response = await nextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};
