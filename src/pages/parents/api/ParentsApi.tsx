import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { parentsAPI } from "api/parentsService";
import { UpdateParentsDTO, ParentsDTO } from "api/parents.type";
import { PageDTO } from "api/page.type";

export const QUERY_KEY_PARENTS = "parents";

export function useParentsApi(page: number = 1) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<PageDTO<ParentsDTO>>({
    queryKey: [QUERY_KEY_PARENTS, page],
    queryFn: () => parentsAPI.getAll(page - 1, 5),
  });

  const createMutation = useMutation({
    mutationFn: parentsAPI.create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PARENTS] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ uuid, data }: { uuid: string; data: UpdateParentsDTO }) =>
      parentsAPI.update(uuid, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PARENTS] }),
  });

  const deleteMutation = useMutation({
    mutationFn: parentsAPI.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_PARENTS] }),
  });

  return {
    parents: data?.content ?? [],
    totalPages: data?.totalPages ?? 1,
    isLoading,
    error,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}
