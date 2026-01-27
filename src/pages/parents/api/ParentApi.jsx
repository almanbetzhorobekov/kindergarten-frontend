import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { parentsAPI } from "../../../api/parentsService";

const QUERY_KEY_PARENTS = "parents";
export const ITEMS_PER_PAGE = 5;

export function useParentApi({ page = 1 }) {
  const queryClient = useQueryClient();

  const {
    data: parents,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY_PARENTS, page],
    queryFn: () => parentsAPI.getAll(page - 1, ITEMS_PER_PAGE),
    keepPreviousData: true,
  });

  const updateMutation = useMutation({
    mutationFn: ({ uuid, data }) => parentsAPI.update(uuid, data),
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY_PARENTS),
  });

  const deleteMutation = useMutation({
    mutationFn: (uuid) => parentsAPI.delete(uuid),
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY_PARENTS),
  });

  return {
    parents,
    error,
    updateMutation,
    deleteMutation,
    isLoading,
  };
}
