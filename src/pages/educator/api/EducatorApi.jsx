import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { educatorAPI } from "../../../api/educatorService";

const QUERY_KEY_EDUCATORS = "educators";

export function useEducatorApi() {
  const queryClient = useQueryClient();

  const {
    data: educators,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEY_EDUCATORS],
    queryFn: () => educatorAPI.getAll(),
  });

  const updateMutation = useMutation({
    mutationFn: ({ uuid, data }) => educatorAPI.update(uuid, data),
    onSuccess: () => queryClient.invalidateQueries([QUERY_KEY_EDUCATORS]),
  });

  const deleteMutation = useMutation({
    mutationFn: (uuid) => educatorAPI.delete(uuid),
    onSuccess: () => queryClient.invalidateQueries([QUERY_KEY_EDUCATORS]),
  });

  return {
    educators,
    isLoading,
    error,
    updateMutation,
    deleteMutation,
  };
}
