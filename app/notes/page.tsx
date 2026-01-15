import { fetchNotes } from "@/lib/api";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import NotesClientPage from "@/app/notes/Notes.client";
export default async function NotesPage() {
  const queryClient = new QueryClient();

  const query = "";
  const page = 1;
  const perPage = 12;

  await queryClient.prefetchQuery({
    queryKey: ["notes", query, page, perPage],
    queryFn: () => fetchNotes(query, page, perPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClientPage />
    </HydrationBoundary>
  );
}
