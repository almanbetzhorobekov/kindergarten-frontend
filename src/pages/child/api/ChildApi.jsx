import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { groupAPI } from "../../../api/groupService";
import { kindergartenAPI } from "../../../api/kindergartenService";
import { childAPI } from "../../../api/childService";

const QUERY_KEY_CHILDREN = "children";
const QUERY_KEY_GROUPS = "groups";
const QUERY_KEY_KINDERGARTENS = "kindergartens";
export const ITEMS_PER_PAGE = 5;

export function useChildApi({ reset, page }) {
  const queryClient = useQueryClient();

  const { data: kindergartens = [] } = useQuery({
    queryKey: [QUERY_KEY_KINDERGARTENS],
    queryFn: kindergartenAPI.getAll,
  });

  // --- Fetch Groups ---
  const { data: groups = [] } = useQuery({
    queryKey: [QUERY_KEY_GROUPS],
    queryFn: groupAPI.getAll,
  });

  //  TanStack Mutation for creating child
  const mutation = useMutation({
    mutationFn: childAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY_CHILDREN]); // обновляем список детей
      reset();
    },
  });

  const {
    data: children = { content: [], totalElements: 0 },
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY_CHILDREN, page],
    queryFn: () => childAPI.getAll(page - 1, ITEMS_PER_PAGE),
  });

  return {
    kindergartens,
    groups,
    mutation,
    children,
    error,
    isLoading,
  };
}
