import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type NoteTag } from "@/types/note";

interface NoteDraft {
  title: string;
  content: string;
  tag: NoteTag;
}

interface NoteDraftStore {
  draft: NoteDraft;
  setDraft: (draft: NoteDraft) => void;
  clearDraft: () => void;
}

const initialDraft: NoteDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (draft) => set({ draft }),

      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft", // ключ у localStorage
    },
  ),
);
