import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { Anilibria, AnilibriaList } from "../types";

export const API_URL = "https://api.anilibria.tv/v3";
export const WEB_URL = "https://www.anilibria.tv";

// export const useTitleSearch = (search: string) =>
//     useQuery({
//         queryKey: ["title-search", search],
//         queryFn: async () => {
//             const response = await fetch(
//                 `${API_URL}/title/${search ? "search" : "updates"}?${new URLSearchParams({ items_per_page: "12", ...(search ? { search } : {}) }).toString()}`,
//             );
//             return (await response.json()) as Anilibria;
//         },
//     });

export const useTitleSearch = (search: string) =>
  useInfiniteQuery({
    queryKey: ["title-search", search],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(
        `${API_URL}/title/${search ? "search" : "updates"}?${new URLSearchParams({ items_per_page: "12", page: pageParam as string, ...(search ? { search } : {}) }).toString()}`,
      );
      return (await response.json()) as Anilibria;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: Anilibria) => {
      if (lastPage.pagination.current_page === lastPage.pagination.pages) {
        return;
      }
      return lastPage.pagination.current_page + 1;
    },
  });

export const useTitle = (id: string) =>
  useQuery({
    queryKey: ["title", id],
    queryFn: async () => {
      const response = await fetch(
        `${API_URL}/title?${new URLSearchParams({ id }).toString()}`,
      );
      return (await response.json()) as AnilibriaList;
    },
  });

export const useTitleRandom = () =>
  useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/title/random`);
      return (await response.json()) as AnilibriaList;
    },
  });
