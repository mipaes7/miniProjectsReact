import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/users";
import type { User } from "../types";

export const useUsers = () => {
    const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
        useInfiniteQuery<{ nextCursor: number; users: User[] }>({
          queryKey: ["users"],
          queryFn: fetchUsers,
          initialPageParam: 1,
          getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
        });

    return {
        isLoading,
        isError,
        users: data?.pages?.flatMap(page => page.users) ?? [],
        refetch,
        fetchNextPage,
        hasNextPage
    }
}