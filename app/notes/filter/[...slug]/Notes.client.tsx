"use client";

import { useState } from "react";
import Link from "next/link";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import css from "@/components/NotesPage/NotesPage.module.css";

import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", page, searchQuery, tag],
    queryFn: () => fetchNotes({ page, perPage: 12, search: searchQuery, tag }),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />

        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <p>Is loading...</p>}

      {!isLoading && data?.notes && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}

      {!isLoading && data?.notes?.length === 0 && <p>Нотаток не знайдено</p>}
    </div>
  );
}
