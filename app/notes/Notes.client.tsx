"use client";
import css from "@/components/NotesPage/NotesPage.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNotes } from "@/lib/api";
import { useDebounce } from "use-debounce";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function NotesClientPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [isOpen, setIsOpen] = useState(false);

  const [debouncedQuery] = useDebounce(query, 1000);

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["notes", debouncedQuery, page, perPage],
    queryFn: () => fetchNotes(debouncedQuery, page, perPage),
    placeholderData: keepPreviousData,
  });
  const handleSearchChange = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox query={query} onChange={handleSearchChange} />
        {isSuccess && data?.totalPages > 1 ? (
          <Pagination
            page={page}
            totalPages={data?.totalPages}
            onPageChange={setPage}
          />
        ) : null}

        <button className={css.button} onClick={() => setIsOpen(true)}>
          Create note +
        </button>
        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <NoteForm onClose={() => setIsOpen(false)} />
          </Modal>
        )}
      </header>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Erroro</p>}

      {isSuccess && (
        <>{data.notes.length ? <NoteList notes={data.notes} /> : null}</>
      )}
    </div>
  );
}
