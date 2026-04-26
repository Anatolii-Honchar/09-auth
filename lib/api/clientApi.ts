import { nextServer } from "@/lib/api/api";
import type { Note, CreateNote } from "@/types/note";
import type { User } from "@/types/user";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

type UpdateMeRequest = {
  username: string;
};

// 🔹 NOTES
export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await nextServer.get("/notes", {
    params: { page, perPage, search, tag },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await nextServer.get(`/notes/${id}`);
  return data;
};

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const { data } = await nextServer.post("/notes", newNote);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await nextServer.delete(`/notes/${id}`);
  return data;
};

// 🔹 AUTH
export const register = async (data: AuthRequest): Promise<User> => {
  const response = await nextServer.post("/auth/register", data);
  return response.data;
};

export const login = async (data: AuthRequest): Promise<User> => {
  const response = await nextServer.post("/auth/login", data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  const response = await nextServer.get("/auth/session");
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get("/users/me");
  return data;
};

export const updateMe = async (data: UpdateMeRequest): Promise<User> => {
  const response = await nextServer.patch("/users/me", data);
  return response.data;
};
