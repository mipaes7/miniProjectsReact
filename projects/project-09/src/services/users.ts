import type { QueryFunctionContext } from "@tanstack/react-query";
import type { User } from "../types";

export const fetchUsers = async ({
  pageParam = 1,
}: QueryFunctionContext): Promise<{
  users: User[];
  nextCursor: number;
}> => {
  const res = await fetch(
    `https://randomuser.me/api/?results=5&seed=mipaes&page=${pageParam}`
  );
  if (!res.ok) throw new Error("Error en la petición");
  const { results, info } = await res.json();
  const nextCursor = info.page > 3 ? undefined : info.page + 1
  return {
    users: results,
    nextCursor
  };
};